import re
import random

# Read the contents of the .mtl file
mtl_file_path = 'bookshelf.obj'
with open(mtl_file_path, 'r') as mtl_file:
    mtl_contents = mtl_file.read()

randomized_mtl_contents = mtl_contents
# Generate a random number between 1 and 10
random_material_number = random.randint(1, 10)

occurrences = re.findall(r'usemtl ArcLite_Book_Pages', mtl_contents)
for occurrence in occurrences:
    print(occurrence)
    random_material_number = random.randint(1, 10)
    randomized_mtl_contents = randomized_mtl_contents.replace(occurrence, f'usemtl Material.00{random_material_number}', 1)

# Write the modified contents back to the .mtl file
output_mtl_file_path = 'bookshelf_random.obj'
with open(output_mtl_file_path, 'w') as output_mtl_file:
    output_mtl_file.write(randomized_mtl_contents)

print(f'Material replacement written to {output_mtl_file_path}')