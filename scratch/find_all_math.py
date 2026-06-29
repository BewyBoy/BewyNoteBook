import os
import glob
import re

folder = r'c:\Users\eng137\Documents\Ben Personal\BewyNoteBook'
for filepath in glob.glob(os.path.join(folder, '**', '*.html'), recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    matches = re.findall(r'\$(.*?)\$', text)
    found_latex = False
    for m in matches:
        if '{' not in m and '}' not in m or '\\' in m:
            found_latex = True
            break
    if found_latex:
        print(f"File with latex: {os.path.basename(filepath)}")
