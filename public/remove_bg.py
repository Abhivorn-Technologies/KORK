import sys
from PIL import Image

def make_transparent(img_path, out_path):
    img = Image.open(img_path)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    
    newData = []
    # We will assume a white background. Tolerance for white (e.g. 200-255)
    for item in datas:
        # Check if pixel is close to white
        if item[0] > 220 and item[1] > 220 and item[2] > 220:
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(out_path, "PNG")

if __name__ == "__main__":
    make_transparent("fevi_icon.jpg", "fevi_icon.png")
