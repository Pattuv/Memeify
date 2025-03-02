import json
import os


MEMES_FOLDER = os.path.join(os.getcwd(), 'memes')

memes = os.listdir(MEMES_FOLDER)

filename = 'memes.json'

with open(filename, 'w') as json_file:
    json.dump(memes, json_file, indent=4) 