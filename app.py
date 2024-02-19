from flask import Flask, request, jsonify
import main
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/update-git-log', methods=['GET'])
def update_git_log():
    main.git_log()
    return jsonify({'message': "Git log updated"})
#commit test
