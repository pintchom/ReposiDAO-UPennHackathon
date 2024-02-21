import subprocess
import re
import firebase_admin as fa
from firebase_admin import firestore as fs
from minting import mint

cred = fa.credentials.Certificate("reposadao-b831e-firebase-adminsdk-q252c-10034dc1e1.json")
fa.initialize_app(cred)

def git_log():
    command = "git pull"
    cli_result = subprocess.run(command, shell=True, text=True, capture_output=True)
    command = "git log -1"
    cli_result = subprocess.run(command, shell=True, text=True, capture_output=True)
    result = ""

    if cli_result.returncode == 0:
        result = cli_result.stdout
    else:
        print("Error executing command:", cli_result.stderr)

    commit_id, email, date = extract_email_and_commit_id(result)
    print(commit_id)
    print(email)
    print(date)
    add_to_history(email, commit_id, date)

    db = fs.client()

    cont_no_login_ref = db.collection('cont_no_login').document(email)
    cont_no_login_data = cont_no_login_ref.get().to_dict() or {}
    cont_logged_in_ref = db.collection('cont_logged_in').document(email)
    cont_logged_in_data = cont_logged_in_ref.get().to_dict() or {}

    if cont_logged_in_data.get('commit_ids'):
        if commit_id != cont_logged_in_data['commit_ids'][-1]:
            cont_logged_in_data['commit_ids'].append(commit_id)
            cont_logged_in_data['contributions'] += 1
            mint(cont_logged_in_data['public_key'], 100)
            cont_logged_in_ref.set(cont_logged_in_data)
        return 1

    elif cont_no_login_data.get('commit_ids'):
        if commit_id != cont_no_login_data['commit_ids'][-1]:
            cont_no_login_data['commit_ids'].append(commit_id)
            cont_no_login_data['contributions'] += 1
            cont_no_login_ref.set(cont_no_login_data)
        return 2
    else:
        cont_no_login_data['commit_ids'] = [commit_id]
        cont_no_login_data['contributions'] = 1
        cont_no_login_ref.set(cont_no_login_data)
        return 3

def extract_email_and_commit_id(log_text):
    commit_id_pattern = r'\bcommit (\w+)'
    email_pattern = r'<(.+?)>'
    date_pattern = r'Date:\s+(.+)'

    commit_id_match = re.search(commit_id_pattern, log_text)
    commit_id = commit_id_match.group(1) if commit_id_match else None

    email_match = re.search(email_pattern, log_text)
    email = email_match.group(1) if email_match else None

    date_match = re.search(date_pattern, log_text)
    date = date_match.group(1) if date_match else None

    return commit_id, email, date

def add_wallet(email, public_key):
    db = fs.client()
    cont_no_login_ref = db.collection('cont_no_login').document(email)
    cont_no_login_data = cont_no_login_ref.get().to_dict() or {}
    cont_logged_in_ref = db.collection('cont_logged_in').document(email)
    cont_logged_in_data = cont_logged_in_ref.get().to_dict() or {}

    if cont_logged_in_data.get('commit_ids'):
        print("this wallet is already connected")
        return

    if cont_no_login_data.get('commit_ids'):
        cont_logged_in_ref = db.collection('cont_logged_in').document(email)
        cont_logged_in_data = cont_logged_in_ref.get().to_dict() or {}

        cont_logged_in_data['commit_ids'] = cont_no_login_data['commit_ids']
        cont_logged_in_data['contributions'] = cont_no_login_data['contributions']
        cont_logged_in_data['public_key'] = public_key
        cont_logged_in_data['email'] = email
        mint(public_key, cont_logged_in_data['contributions']*100)
        cont_logged_in_ref.set(cont_logged_in_data)
        return
    else:
        print("Email not found")
        return 0

def check_email(email):
    db = fs.client()
    cont_no_login_ref = db.collection('cont_no_login').document(email)
    cont_no_login_data = cont_no_login_ref.get().to_dict() or {}
    cont_logged_in_ref = db.collection('cont_logged_in').document(email)
    cont_logged_in_data = cont_logged_in_ref.get().to_dict() or {}

    if cont_logged_in_data.get('commit_ids') or cont_no_login_data.get('commit_ids'):
        return True
    return False

def add_to_history(email, commit_id, date):
    db = fs.client()
    cont_logged_in_ref = db.collection('cont_logged_in').document(email)
    cont_logged_in_data = cont_logged_in_ref.get().to_dict() or {}
    public_key = None
    if cont_logged_in_data.get('public_key'):
        public_key = cont_logged_in_data['public_key']

    if public_key:
        history_ref = db.collection('history').document(date)
        history_data = history_ref.get().to_dict() or {}
        history_data['email'] = email
        history_data['public_key'] = public_key
        history_data['commit_id'] = commit_id
        history_data['mint_amount'] = 100
        history_ref.set(history_data)
    else:
        history_ref = db.collection('history').document(date)
        history_data = history_ref.get().to_dict() or {}
        history_data['email'] = email
        history_data['commit_id'] = commit_id
        history_data['mint_amount'] = 0
        history_ref.set(history_data)

def get_history():
    db = fs.client()
    history_ref = db.collection('history')
    history_data = history_ref.get()
    history = []
    for date in history_data:
        history.append(date.to_dict())
    return history
