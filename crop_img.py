from PIL import Image

img = Image.open('public/vietnam_branch.jpg')
w, h = img.size
cropped = img.crop((0, 190, w, h))
cropped.save('public/vietnam_branch.jpg')
print("Image cropped successfully")
