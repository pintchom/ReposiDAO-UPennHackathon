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

    commit_id, email = extract_email_and_commit_id(result)
    print(commit_id)
    print(email)
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
        return

    elif cont_no_login_data.get('commit_ids'):
        if commit_id != cont_no_login_data['commit_ids'][-1]:
            cont_no_login_data['commit_ids'].append(commit_id)
            cont_no_login_data['contributions'] += 1
            cont_no_login_ref.set(cont_no_login_data)
        return
    else:
        cont_no_login_data['commit_ids'] = [commit_id]
        cont_no_login_data['contributions'] = 1
        cont_no_login_ref.set(cont_no_login_data)
        return

def extract_email_and_commit_id(log_text):
    commit_id_pattern = r'\bcommit (\w+)'
    email_pattern = r'<(.+?)>'

    commit_id_match = re.search(commit_id_pattern, log_text)
    commit_id = commit_id_match.group(1) if commit_id_match else None

    email_match = re.search(email_pattern, log_text)
    email = email_match.group(1) if email_match else None

    return commit_id, email

def add_wallet(email, public_key):
    db = fs.client()
    cont_no_login_ref = db.collection('cont_no_login').document(email)
    cont_no_login_data = cont_no_login_ref.get().to_dict() or {}

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
        return "Email not found"

def check_email(email):
    db = fs.client()
    cont_no_login_ref = db.collection('cont_no_login').document(email)
    cont_no_login_data = cont_no_login_ref.get().to_dict() or {}
    cont_logged_in_ref = db.collection('cont_logged_in').document(email)
    cont_logged_in_data = cont_logged_in_ref.get().to_dict() or {}

    if cont_logged_in_data.get('commit_ids') or cont_no_login_data.get('commit_ids'):
        return True
    return False
