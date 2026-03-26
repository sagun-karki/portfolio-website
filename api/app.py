import os
import json
from functools import lru_cache
from flask import Flask, render_template, send_from_directory
from flask_caching import Cache

app = Flask(__name__)
app.config['CACHE_TYPE'] = 'simple'
app.config['CACHE_DEFAULT_TIMEOUT'] = 300  # 5 minutes cache

cache = Cache(app)


@cache.cached(key_prefix='site_data')
def load_site_data():
    """
    Load and cache site data from JSON file.
    Uses LRU cache as fallback for additional performance.
    """
    data_path = os.path.join(app.root_path, 'static', 'json', 'data.json')
    try:
        with open(data_path, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


@app.route('/')
def index():
    """
    Renders the home page (index.html) with dynamic content from JSON.
    """
    site_data = load_site_data()
    return render_template('index.html', site_data=site_data)


@app.route('/static/<path:filename>')
def static_files(filename):
    """
    Serve static files with cache headers for better performance.
    """
    response = send_from_directory('static', filename)
    response.headers['Cache-Control'] = 'public, max-age=31536000'
    return response


@app.errorhandler(404)
def page_not_found(e):
    """
    Renders a custom 404 error page.
    """
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True)
