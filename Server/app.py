from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from reenreancy import detect_reentrancy_vulnerabilities
from delegatecall import detect_delegate_call_vulnerabilities
from uncheckedexternal import detect_unchecked_external
from selfdesctruct import detect_self_destruct

app = Flask(__name__, static_folder='upload')
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'sol'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploads/<filename>')
def serve_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/process', methods=['POST'])
def process_solidity_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        re_entrancy_vulnerabilities = detect_reentrancy_vulnerabilities(file_path)
        delegate_vulnerabilities = detect_delegate_call_vulnerabilities(file_path)
        unchecked_ext_vulnerabilities = detect_unchecked_external(file_path)
        self_destruct_vul = detect_self_destruct(file_path)
        
        return jsonify({
            "success": "Completed!",
            "file_path": file_path,
            "message": "Success",
            "reentrancy_amount": len(re_entrancy_vulnerabilities),
            "reenteancy_lines": re_entrancy_vulnerabilities,
            "delegate_amount": len(delegate_vulnerabilities),
            "delegate_lines": delegate_vulnerabilities,
            "unchecked_amt": len(unchecked_ext_vulnerabilities),
            "unchecked_lines": unchecked_ext_vulnerabilities,
            "self_des_lines": self_destruct_vul,
            "self_des_amt": len(self_destruct_vul),
        })
    else:
        return jsonify({'error': 'Invalid file format'})

if __name__ == '__main__':
    app.run(debug=True)
