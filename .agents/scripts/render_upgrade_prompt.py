from pathlib import Path
import fitz

src = Path('attached_assets/Tanu_Developer_Final_Premium_Upgrade_Prompt_1790707889193.pdf')
out = Path('.agents/outputs/tanu-upgrade-pages')
out.mkdir(parents=True, exist_ok=True)
doc = fitz.open(src)
for idx, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
    pix.save(out / f'page-{idx+1}.png')
print(f'rendered {len(doc)} pages to {out}')
