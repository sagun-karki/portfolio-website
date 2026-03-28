import os
import json
from flask import Flask, render_template, send_from_directory
from flask_caching import Cache

app = Flask(__name__)
app.config['CACHE_TYPE'] = 'simple'
app.config['CACHE_DEFAULT_TIMEOUT'] = 300

cache = Cache(app)

@app.after_request
def add_security_headers(response):
    """
    A less restrictive CSP that allows most common CDN and external resources
    while maintaining basic security headers.
    """
    # This policy allows:
    # 1. Scripts/Images/Styles from ANY encrypted (https) source.
    # 2. Inline scripts and styles (required for many libraries).
    # 3. Data URIs (for those SVG noise/grain filters).
    csp = (
        "default-src 'self' https:; "
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; "
        "style-src 'self' 'unsafe-inline' https:; "
        "img-src 'self' data: https:; "
        "font-src 'self' data: https:; "
        "connect-src 'self' https:; "
        "frame-src 'self' https://vercel.live https://*.vercel.app https:;"
    )

    response.headers['Content-Security-Policy'] = csp
    response.headers['X-Content-Type-Options'] = 'nosniff'
    
    # Allows Vercel and others to frame the site. 
    # Use '*' to be least restrictive, or just remove the header.
    response.headers['X-Frame-Options'] = 'ALLOWALL' 
    
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response

@cache.cached(key_prefix='site_data')
def load_site_data():
    data_path = os.path.join(app.root_path, 'static', 'json', 'data.json')
    try:
        with open(data_path, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

@app.route('/')
def index():
    try:
        site_data = load_site_data()
        return render_template('index.html', site_data=site_data)
    except Exception as e:
        app.logger.error(f'Error: {e}')
        return render_template('index.html', site_data={}), 500

@app.route('/static/<path:filename>')
def static_files(filename):
    response = send_from_directory('static', filename)
    response.headers['Cache-Control'] = 'public, max-age=31536000, immutable'
    return response

@app.errorhandler(404)
def not_found_error(error):
    return render_template('../404.html'), 404

if __name__ == '__main__':
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() in ('true', '1', 'yes')
    app.run(debug=debug_mode)
