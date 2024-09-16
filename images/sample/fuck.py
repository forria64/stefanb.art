import os
from PIL import Image

# Define the directory to work in
directory = os.getcwd()

# Loop through all files in the directory
for filename in os.listdir(directory):
    # Check if the file is a PNG
    if filename.lower().endswith('.png'):
        # Construct the full file path
        file_path = os.path.join(directory, filename)
        
        # Open the image using PIL
        with Image.open(file_path) as img:
            # Remove the .png extension and replace with .webp
            webp_filename = os.path.splitext(file_path)[0] + '.webp'
            
            # Save the image in WebP format
            img.save(webp_filename, 'webp')
            
        print(f"Converted {filename} to {webp_filename}")

print("Conversion completed.")

