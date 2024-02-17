import subprocess

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
    

    return result

git_log()

