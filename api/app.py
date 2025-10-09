import os
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    """
    Renders the home page (index.html).
    """
    return render_template('index.html')


@app.errorhandler(404)
def page_not_found(e):
    """
    Renders a custom 404 error page.
    """
    return "404 Error: Page Not Found", 404


if __name__ == '__main__':
    app.run(debug=True)
