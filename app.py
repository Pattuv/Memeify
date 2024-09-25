from flask import Flask, render_template, send_from_directory, jsonify
import os
import random

app = Flask(__name__)

# Path to the memes folder
MEMES_FOLDER = os.path.join(os.getcwd(), 'memes')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_random_meme')
def get_random_meme():
    # Get a list of all meme image filenames
    meme_images = os.listdir(MEMES_FOLDER)
    
    # Pick a random image from the list
    random_meme = random.choice(meme_images)
    
    # Return the random meme filename as JSON
    return jsonify({'meme_image': random_meme})

@app.route('/memes/<filename>')
def meme_file(filename):
    return send_from_directory(MEMES_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True)
