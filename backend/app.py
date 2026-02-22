from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect("portfolio.db")
    c = conn.cursor()
    c.execute("""
CREATE TABLE IF NOT EXISTS portfolios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    name TEXT,
    role TEXT,
    about TEXT,
    skills TEXT,
    projects TEXT,
    experience TEXT,
    education TEXT,
    achievements TEXT,
    email TEXT,
    location TEXT,
    image TEXT,
    linkedin TEXT,
    github TEXT
)
""")
    conn.commit()
    conn.close()

init_db()

@app.route("/")
def home():
    return jsonify({"message": "Backend running successfully"})

@app.route("/create", methods=["POST"])
def create_portfolio():
    data = request.json

    conn = sqlite3.connect("portfolio.db")
    c = conn.cursor()

    try:
        projects_json = json.dumps(data["projects"])
        experience_json = json.dumps(data["experience"])
        c.execute("""
INSERT INTO portfolios
(username, name, role, about, skills, projects, experience, education, achievements, email, location, image, linkedin, github)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", (
    data["username"],
    data["name"],
    data["role"],
    data["about"],
    data["skills"],
    projects_json,
    experience_json,
    data["education"],
    data["achievements"],
    data["email"],
    data["location"],
    data["image"],
    data["linkedin"],
    data["github"]
))
        conn.commit()
    except:
        return jsonify({"error": "Username already exists"}), 400

    conn.close()

    return jsonify({"message": "Portfolio created successfully"})

@app.route("/portfolio/<username>", methods=["GET"])
def get_portfolio(username):
    conn = sqlite3.connect("portfolio.db")
    c = conn.cursor()
    c.execute("SELECT * FROM portfolios WHERE username=?", (username,))
    data = c.fetchone()
    conn.close()

    if not data:
        return jsonify({"error": "Not found"}), 404

    return jsonify({
    "username": data[1],
    "name": data[2],
    "role": data[3],
    "about": data[4],
    "skills": data[5],
    "projects": data[6],
    "experience": data[7],
    "education": data[8],
    "achievements": data[9],
    "email": data[10],
    "location": data[11],
    "image": data[12],
    "linkedin": data[13],
    "github": data[14]
})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)