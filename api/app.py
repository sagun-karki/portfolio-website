import os
import json
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    """
    Renders the home page (index.html) with dynamic content from JSON.
    """
    data_path = os.path.join(app.root_path, 'static', 'json', 'data.json')
    try:
        with open(data_path, 'r') as f:
            site_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        site_data = {}
    
    return render_template('index.html', site_data=site_data)


@app.errorhandler(404)
def page_not_found(e):
    """
    Renders a custom 404 error page.
    """
    return "404 Error: Page Not Found", 404


if __name__ == '__main__':
    app.run(debug=True)
