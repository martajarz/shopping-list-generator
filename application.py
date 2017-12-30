import os
import sqlite3

from flask import Flask, render_template, g

app = Flask(__name__)

# ensure responses aren't cached
if app.config["DEBUG"]:
    @app.after_request
    def after_request(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Expires"] = 0
        response.headers["Pragma"] = "no-cache"
        return response


DATABASE = "ShoppingList.db"

def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)

# @app.teardown_appcontext
# def close_connection(exceprion):
#     db = getattr(g, "_database", None)
#     if db is None:
#         db.close()

@app.route("/")
def index():
    return render_template("layout.html")

if __name__=="__main__":
    app.run()