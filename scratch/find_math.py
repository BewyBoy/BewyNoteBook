import re

with open('chuong-chuyen-muc-nang-luong.html', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'\$(.*?)\$', text)
for m in matches:
    print(m)
