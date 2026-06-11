import sys
from PIL import Image

def crop_no_padding(img_path):
    img = Image.open(img_path).convert("RGBA")
    
    datas = img.getdata()
    alpha_mask = []
    for item in datas:
        # treat nearly transparent or nearly white as empty
        if item[3] < 15 or (item[0] > 230 and item[1] > 230 and item[2] > 230):
            alpha_mask.append(0)
        else:
            alpha_mask.append(255)
            
    mask = Image.new('L', img.size)
    mask.putdata(alpha_mask)
    
    bbox = mask.getbbox()
    if bbox:
        # crop exactly to the bounding box
        cropped_img = img.crop(bbox)
        
        # We can optionally make it square by cropping to the max inner square or padding to the max outer square.
        # But if the user wants maximum size, they want it tightly bounded.
        # Most browsers handle non-square favicons by fitting them to square. 
        # Making it square by padding would reduce the visual size of one dimension.
        # Let's save the tightly cropped image exactly.
        
        # But wait, if they want it perfectly square, the browser scales it down. 
        # If it's a circle logo, the bounding box IS square. Let's just crop exactly to bbox.
        cropped_img.save(img_path, "PNG")
        print("Image cropped tightly without any padding.")
    else:
        print("Could not find a bounding box.")

if __name__ == "__main__":
    crop_no_padding("new_fevi.png")
