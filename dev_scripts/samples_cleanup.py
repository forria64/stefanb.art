import os
import re
import pandas as pd
from PIL import Image

# Define directory paths
image_directory = "../images/samples"  # Path to the image folder
metadata_file_path = "../metadata/metadata.csv"  # Path to the metadata file
output_directory = image_directory  # Save WebP files in the same directory

# Define the color to replace transparency (hex: 0e0e0e)
transparency_replacement = (14, 14, 14)  # RGB format

# Load metadata CSV
metadata_df = pd.read_csv(metadata_file_path)

# Add a new 'file_name' column if it does not exist
if 'file_name' not in metadata_df.columns:
    metadata_df['file_name'] = ""

# Define a function to standardize filenames
def standardize_filename(filename):
    # Replace spaces with underscores
    filename = filename.replace(" ", "_")
    # Remove all characters except alphanumeric and underscores
    standardized_name = re.sub(r'[^a-zA-Z0-9_]', '', filename)
    return standardized_name.lower()  # Convert to lowercase for uniformity

# Dictionary to keep track of which artwork names have been updated with filenames
updated_rows = {}

# Process PNG files in the directory
for filename in os.listdir(image_directory):
    if filename.lower().endswith(".png"):
        # Open the image
        image_path = os.path.join(image_directory, filename)
        img = Image.open(image_path).convert("RGBA")

        # Replace transparency with the specified color
        background = Image.new("RGBA", img.size, transparency_replacement + (255,))
        img = Image.alpha_composite(background, img).convert("RGB")

        # Create a standardized filename for the WebP version
        base_filename = os.path.splitext(filename)[0]
        standardized_filename = standardize_filename(base_filename) + ".webp"

        # Save the WebP image in the output directory
        webp_path = os.path.join(output_directory, standardized_filename)
        img.save(webp_path, "webp")

        # Remove the original PNG file after successful conversion
        os.remove(image_path)

        # Match filename to artwork name and update 'file_name' column in the metadata
        artwork_name = standardize_filename(base_filename)
        match_found = False

        for index, row in metadata_df.iterrows():
            # Standardize the 'name' field in the CSV for comparison
            standardized_artwork_name = standardize_filename(row['name'].strip())
            
            # Debugging information
            print(f"Processing: Filename = '{artwork_name}' | Artwork Name in CSV = '{standardized_artwork_name}'")

            # If the standardized artwork name matches, update the filename
            if artwork_name == standardized_artwork_name:
                metadata_df.at[index, 'file_name'] = standardized_filename
                updated_rows[artwork_name] = True
                match_found = True
                break

        # Debug message if no match was found for a filename
        if not match_found:
            print(f"No match found in CSV for: '{artwork_name}'")

# Save the updated metadata
metadata_df.to_csv(metadata_file_path, index=False)
print("Metadata updated successfully with new file names.")

