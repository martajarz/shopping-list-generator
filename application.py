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

@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in."""

    # # forget any user_id
    # session.clear()

    # # if user reached route via POST (as by submitting a form via POST)
    # if request.method == "POST":

    #     # query database for username
    #     rows = db.execute("SELECT * FROM users WHERE username = :username", username=request.form.get("username"))

    #     # ensure username exists and password is correct
    #     if len(rows) != 1 or not pwd_context.verify(request.form.get("password"), rows[0]["hash"]):
    #         return apology("invalid username and/or password")

    #     # remember which user has logged in
    #     session["user_id"] = rows[0]["id"]

    #     # redirect user to home page
    #     return redirect(url_for("index"))

    # # else if user reached route via GET (as by clicking a link or via redirect)
    # else:
    return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    return render_template("register.html")

if __name__=="__main__":
    app.run()