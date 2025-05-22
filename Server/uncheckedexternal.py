import re

def detect_unchecked_external(file_path):
    with open(file_path, 'r') as solidity_file:
        contract_code = solidity_file.read()

    pattern = re.compile(r'^.*\.send\(.*\).*')
    lines = contract_code.split('\n')
    matching_lines = [line for line in lines if pattern.match(line)]
    return matching_lines


