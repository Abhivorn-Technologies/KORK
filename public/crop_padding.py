import sys
from PIL import Image, ImageChops

def crop_and_square(img_path):
    img = Image.open(img_path).convert("RGBA")
    
    datas = img.getdata()
    alpha_mask = []
    for item in datas:
        # if transparent or almost white, treat as empty (0)
        if item[3] < 10 or (item[0] > 240 and item[1] > 240 and item[2] > 240):
            alpha_mask.append(0)
        else:
            alpha_mask.append(255)
            
    mask = Image.new('L', img.size)
    mask.putdata(alpha_mask)
    
    bbox = mask.getbbox()
    if bbox:
        cropped_img = img.crop(bbox)
        
        # Favicons should ideally be square so they don't get stretched or squeezed.
        max_dim = max(cropped_img.width, cropped_img.height)
        
        # We also might want a tiny bit of padding so it doesn't touch the edge
        padding = int(max_dim * 0.05)
        new_dim = max_dim + (padding * 2)
        
        square_img = Image.new("RGBA", (new_dim, new_dim), (255, 255, 255, 0))
        
        offset = (padding + (max_dim - cropped_img.width) // 2, padding + (max_dim - cropped_img.height) // 2)
        square_img.paste(cropped_img, offset)
        
        square_img.save(img_path, "PNG")
        print("Image cropped successfully")
    else:
        print("Could not find a bounding box")

if __name__ == "__main__":
    crop_and_square("new_fevi.png")
