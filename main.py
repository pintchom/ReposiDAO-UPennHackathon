import subprocess
import re
import firebase_admin as fa 
from google.cloud import firestore

cred = fa.credentials.Certificate("reposadao-b831e-firebase-adminsdk-q252c-10034dc1e1.json")
fa.initialize_app(cred)

def git_log():
    command = "git log -1"
    cli_result = subprocess.run(command, shell=True, text=True, capture_output=True)
    result = ""

    if cli_result.returncode == 0:
        result = cli_result.stdout
        print(result)
    else:
        print("Error executing command:", cli_result.stderr)

    #splice commit id and email into firebase commit_count += 1
    pattern = r"commit ([0-9a-fA-F]{40}).*?<([\w\.-]+@[\w\.-]+)>"
    match = re.search(pattern, result, re.DOTALL)

    if match:
        commit_id = match.group(1)
        email = match.group(2)
        #print(f"Commit ID: {commit_id}")
        #print(f"Email: {email}")
        db = firestore.Client()
        contributor_ref = db.collection('contributors').document(email)

    return result

git_log()

