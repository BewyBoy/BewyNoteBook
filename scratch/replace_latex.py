import os

filepath = r'c:\Users\eng137\Documents\Ben Personal\BewyNoteBook\chuong-chuyen-muc-nang-luong.html'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

replacements = {
    r'$n = 1, 2, 3, 4...$': r'<i>n</i> = 1, 2, 3, 4...',
    r'$r_n = n^2 \cdot r_0 \quad (r_0 = 0.053\text{ nm})$': r'<i>r<sub>n</sub></i> = <i>n</i><sup>2</sup> &middot; <i>r</i><sub>0</sub> (<i>r</i><sub>0</sub> = 0.053 nm)',
    r'$E_n = -\frac{13.6}{n^2} \text{ eV}$': r'<i>E<sub>n</sub></i> = -13.6 / <i>n</i><sup>2</sup> eV',
    r'$n=1$': r'<i>n</i>=1',
    r'$K$': r'<i>K</i>',
    r'$n > 1$': r'<i>n</i> &gt; 1',
    r'$L, M, N...$': r'<i>L, M, N...</i>',
    r'$\epsilon = E_{cao} - E_{thap} = h\cdot\nu = \frac{h\cdot c}{\lambda}$': r'<i>&epsilon;</i> = <i>E<sub>cao</sub></i> - <i>E<sub>thấp</sub></i> = <i>h</i>&middot;<i>&nu;</i> = <i>h</i>&middot;<i>c</i> / <i>&lambda;</i>',
    r'$\epsilon = E_{cao} - E_{thap}$': r'<i>&epsilon;</i> = <i>E<sub>cao</sub></i> - <i>E<sub>thấp</sub></i>',
    r'$\epsilon$': r'<i>&epsilon;</i>',
    r'$\nu$': r'<i>&nu;</i>',
    r'$\lambda$': r'<i>&lambda;</i>',
    r'**$n = 2$**': r'**<i>n</i> = 2**',
    r'$H_\alpha$': r'<i>H<sub>&alpha;</sub></i>',
    r'$\lambda = 656.3\text{ nm}$': r'<i>&lambda;</i> = 656.3 nm',
    r'$n=3 \to 2$': r'<i>n</i>=3 &rarr; 2',
    r'$H_\beta$': r'<i>H<sub>&beta;</sub></i>',
    r'$\lambda = 486.1\text{ nm}$': r'<i>&lambda;</i> = 486.1 nm',
    r'$n=4 \to 2$': r'<i>n</i>=4 &rarr; 2',
    r'$H_\gamma$': r'<i>H<sub>&gamma;</sub></i>',
    r'$\lambda = 434.0\text{ nm}$': r'<i>&lambda;</i> = 434.0 nm',
    r'$n=5 \to 2$': r'<i>n</i>=5 &rarr; 2',
    r'$H_\delta$': r'<i>H<sub>&delta;</sub></i>',
    r'$\lambda = 410.2\text{ nm}$': r'<i>&lambda;</i> = 410.2 nm',
    r'$n=6 \to 2$': r'<i>n</i>=6 &rarr; 2',
    r'$n=3$': r'<i>n</i>=3',
    r'$E_1 = -13.6\text{ eV}$': r'<i>E</i><sub>1</sub> = -13.6 eV',
    r'$n=2$': r'<i>n</i>=2',
    r'$E_2 = -3.40\text{ eV}$': r'<i>E</i><sub>2</sub> = -3.40 eV',
    r'$E_3 = -1.51\text{ eV}$': r'<i>E</i><sub>3</sub> = -1.51 eV',
    r'$n=\infty$': r'<i>n</i>=&infin;',
    r'$E_\infty = 0\text{ eV}$': r'<i>E</i><sub>&infin;</sub> = 0 eV',
    r'$\ge 13.6\text{ eV}$': r'&ge; 13.6 eV',
    r'$H^+$': r'H<sup>+</sup>',
    r'$n_f > n_i$': r'<i>n<sub>f</sub></i> &gt; <i>n<sub>i</sub></i>',
    r'$n \ge 3$': r'<i>n</i> &ge; 3',
    r'$n \ge 3$': r'<i>n</i> &ge; 3',
}

new_text = text
for old, new in replacements.items():
    new_text = new_text.replace(old, new)

if new_text != text:
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Replacements successful.")
else:
    print("No changes made.")
