import subprocess

def git_log():
    command = "git log"
    cli_result = subprocess.run(command, shell=True, text=True, capture_output=True)
    result = ""

    if cli_result.returncode == 0:
        result = cli_result.stdout
        print("Output saved to git_shortlog_output.txt")
    else:
        print("Error executing command:", cli_result.stderr)
    return result


