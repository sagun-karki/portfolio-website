import os
import json
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    """
    Render the home page
    """
    skills_file_path = os.path.join(app.static_folder, 'json', 'skills.json')

    # Load skills from the JSON file
    try:
        with open(skills_file_path, encoding='utf-8') as f:
            skills = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        skills = []
        print(f"Error loading skills.json: {e}")

    return render_template('index.html', skills=skills)


if __name__ == '__main__':
    app.run()
