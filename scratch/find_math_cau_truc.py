import re
with open('chuong-cau-truc-nguyen-tu.html', 'r', encoding='utf-8') as f:
    text = f.read()
matches = re.findall(r'\$(.*?)\$', text)
for m in matches:
    if '{' not in m and '}' not in m or '\\' in m:
        try:
            print(m)
        except:
            print('Found latex')
