import subprocess

command = "git log"
result = subprocess.run(command, shell=True, text=True, capture_output=True)

if result.returncode == 0:
    with open("git_log_output.txt", "w") as file:
        file.write(result.stdout)
    print("Output saved to git_shortlog_output.txt")
else:
    print("Error executing command:", result.stderr)
