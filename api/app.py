from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    skills = [
        {"name": "Python", "icon": "devicon-python-plain colored"},
        {"name": "R", "icon": "devicon-r-plain colored"},
        {"name": "SQL", "icon": "devicon-mysql-plain colored"},
        {"name": "Java", "icon": "devicon-java-plain colored"},
        {"name": "C# .NET", "icon": "devicon-dotnetcore-plain colored"},
        {"name": "Swift", "icon": "devicon-swift-plain colored"},
        {"name": "HTML", "icon": "devicon-html5-plain colored"},
        {"name": "CSS", "icon": "devicon-css3-plain colored"},
        {"name": "JavaScript", "icon": "devicon-javascript-plain colored"},
        {"name": "TypeScript", "icon": "devicon-typescript-plain colored"},
        {"name": "Bash", "icon": "devicon-bash-plain colored"},
        {"name": "Git", "icon": "devicon-git-plain colored"},
        {"name": "NumPy", "icon": "devicon-numpy-original colored"},
        {"name": "Pandas", "icon": "devicon-pandas-original colored"},
        {"name": "Scikit-learn", "icon": "devicon-scikit-learn-plain colored"},
        {"name": "TensorFlow", "icon": "devicon-tensorflow-original colored"},
        {"name": "PyTorch", "icon": "devicon-pytorch-original colored"},
        {"name": "PySpark", "icon": "devicon-apache-plain colored"},
        {"name": "OpenCV", "icon": "devicon-opencv-plain colored"},
        {"name": "Tableau", "icon": "devicon-tableau-plain colored"},
        {"name": "REST API", "icon": "devicon-postman-plain colored"},
        {"name": "MongoDB", "icon": "devicon-mongodb-plain colored"},
        {"name": "Node.js", "icon": "devicon-nodejs-plain colored"},
        {"name": "React.js", "icon": "devicon-react-original colored"},
        {"name": "Docker", "icon": "devicon-docker-plain colored"},
    ]
    return render_template('index.html', skills=skills)

if __name__ == '__main__':
    app.run(debug=True)