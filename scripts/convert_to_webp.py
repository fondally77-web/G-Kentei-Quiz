"""
JPG画像をWebP形式に変換するスクリプト
- 品質80%で圧縮
- 最大幅800pxにリサイズ
- 目標: 各画像50KB以下
"""
from PIL import Image
import os
from pathlib import Path

# 画像ディレクトリ
INPUT_DIR = Path(__file__).parent.parent / "src" / "assets" / "images" / "characters"
OUTPUT_DIR = INPUT_DIR  # 同じディレクトリに出力

# 設定
MAX_WIDTH = 800
QUALITY = 80

def convert_image(jpg_path: Path) -> tuple[str, int, int]:
    """JPG画像をWebPに変換"""
    webp_path = jpg_path.with_suffix('.webp')
    
    with Image.open(jpg_path) as img:
        # RGBに変換（RGBA対応）
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        # リサイズ（幅がMAX_WIDTHを超える場合）
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            new_height = int(img.height * ratio)
            img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
        
        # WebPで保存
        img.save(webp_path, 'WEBP', quality=QUALITY, method=6)
    
    original_size = jpg_path.stat().st_size
    new_size = webp_path.stat().st_size
    
    return jpg_path.name, original_size, new_size

def main():
    print(f"変換開始: {INPUT_DIR}")
    print("-" * 60)
    
    jpg_files = list(INPUT_DIR.glob("*.jpg"))
    total_original = 0
    total_new = 0
    
    for jpg_path in sorted(jpg_files):
        name, original, new = convert_image(jpg_path)
        total_original += original
        total_new += new
        
        reduction = (1 - new / original) * 100
        print(f"{name}: {original/1024:.1f}KB -> {new/1024:.1f}KB ({reduction:.1f}%削減)")
    
    print("-" * 60)
    print(f"合計: {total_original/1024:.1f}KB -> {total_new/1024:.1f}KB")
    print(f"削減率: {(1 - total_new/total_original)*100:.1f}%")
    print(f"\n変換完了: {len(jpg_files)}ファイル")

if __name__ == "__main__":
    main()
