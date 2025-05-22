import re

def detect_reentrancy_vulnerabilities(file_path):
    with open(file_path, 'r') as file:
        solidity_code = file.read()

    pattern = r'call\.value\((.*?)\)'

    vulnerable_lines = []
    for line_number, line in enumerate(solidity_code.split('\n'), start=1):
        if re.search(pattern, line):
            vulnerable_lines.append(line_number)

    return vulnerable_lines
