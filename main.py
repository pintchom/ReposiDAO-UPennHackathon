import subprocess
import re


def git_log():
    command = "git log -1"
    cli_result = subprocess.run(command, shell=True, text=True, capture_output=True)
    result = ""

    if cli_result.returncode == 0:
        result = cli_result.stdout
        print(result)
        print("Output saved to git_shortlog_output.txt")
    else:
        print("Error executing command:", cli_result.stderr)

    #splice commit id and email into firebase commit_count += 1
    pattern = r"commit ([0-9a-fA-F]{40}).*?<([\w\.-]+@[\w\.-]+)>"
    match = re.search(pattern, result, re.DOTALL)

    if match:
        commit_id = match.group(1)
        email = match.group(2)
        print(f"Commit ID: {commit_id}")
        print(f"Email: {email}")
    else:
        print("No match found")

    return result

git_log()

