import os
import json
from functools import lru_cache
from flask import Flask, render_template, send_from_directory, make_response
from flask_caching import Cache

app = Flask(__name__)
app.config['CACHE_TYPE'] = 'simple'
app.config['CACHE_DEFAULT_TIMEOUT'] = 300  # 5 minutes cache

cache = Cache(app)

# Security headers middleware
@app.after_request
def add_security_headers(response):
    """Add security headers to all responses."""
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response


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
    try:
        site_data = load_site_data()
        return render_template('index.html', site_data=site_data)
    except Exception as e:
        app.logger.error(f'Error loading site data: {e}')
        return render_template('index.html', site_data={}), 500


@app.route('/static/<path:filename>')
def static_files(filename):
    """
    Serve static files with cache headers for better performance.
    """
    try:
        response = send_from_directory('static', filename)
        response.headers['Cache-Control'] = 'public, max-age=31536000, immutable'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        return response
    except Exception as e:
        app.logger.error(f'Error serving static file {filename}: {e}')
        raise


@app.errorhandler(404)
def page_not_found(e):
    """
    Renders a custom 404 error page.
    """
    return render_template('404.html'), 404


if __name__ == '__main__':
    # Disable debug mode in production
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() in ('true', '1', 'yes')
    app.run(debug=debug_mode)
