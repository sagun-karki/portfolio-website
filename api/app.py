import os
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    """
    Renders the home page (index.html).
    """
    return render_template('index.html')


@app.route('/experience')
def experience():
    """
    Renders the work experience page.
    """
    return render_template('experience.html')


@app.route('/projects')
def projects():
    """
    Renders the projects page.
    """
    return render_template('projects.html')


@app.route('/skills')
def skills():
    """
    Renders the skills page.
    """
    return render_template('skills.html')


if __name__ == '__main__':
    app.run(debug=True)
