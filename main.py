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

    pattern = r"commit ([0-9a-fA-F]{40}).*?<([\w\.-]+@[\w\.-]+)>"
    match = re.search(pattern, result, re.DOTALL)

    commit_id = match.group(1) #commit ID from git log
    email = match.group(2) # user's email of commit
    db = fs.client()
    contributor_ref = db.collection('contributors').document(email)
    contributor_data = contributor_ref.get().to_dict() or {}

    contributor_data['email'] = email

    if contributor_data.get('commit_ids'):
        if commit_id != contributor_data['commit_ids'][-1]:
            contributor_data['commit_ids'].append(commit_id)
            contributor_data['contributions'] += 1
            mint(contributor_data['public_key'])

    else:
        contributor_data['commit_ids'] = [commit_id]
        contributor_data['contributions'] = 1
        mint(contributor_data['public_key'])

    contributor_ref.set(contributor_data)
    return #result
