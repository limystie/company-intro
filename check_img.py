from PIL import Image
import numpy as np

img = Image.open('public/vietnam_branch.jpg')
w, h = img.size

# check rows to see where the white background ends
arr = np.array(img)
for i in range(200):
    row_mean = arr[i].mean()
    if row_mean < 200: # if it gets darker, probably hit the real photo
        print("Real photo starts at row:", i)
        break
