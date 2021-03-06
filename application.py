# import os
import sqlite3

from cs50 import SQL
from tempfile import mkdtemp
from flask import Flask, flash, jsonify, redirect, render_template, request, session, url_for
from flask_session import Session 
from passlib.apps import custom_app_context as pwd_context
from tempfile import mkdtemp
from passlib.context import CryptContext
import flask_login

from helpers import *

app = Flask(__name__)
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = False

# ensure responses aren't cached
if app.config["DEBUG"]:
    @app.after_request
    def after_request(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Expires"] = 0
        response.headers["Pragma"] = "no-cache"
        return response

# configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


db = SQL("sqlite:////home/martajarz/mysite/ShoppingList.db")

@app.route("/")
def index():
    return render_template("layout.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in."""

    # forget any user_id
    session.clear()

    # if user reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # query database for username
        rows = db.execute("SELECT * FROM users WHERE username = :username", username=request.form.get("username"))

        # ensure username exists and password is correct
        if len(rows) != 1 or not pwd_context.verify(request.form.get("password"), rows[0]["hash"]):
            return render_template("login.html")

        # remember which user has logged in
        session["user_id"] = rows[0]["ID"]

        # redirect user to home page
        return redirect(url_for("lists"))

    # else if user reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user."""
    # forget any user_id
    session.clear()

    # if user reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        myctx = CryptContext(schemes=["sha256_crypt", "md5_crypt", "des_crypt"])
        hash = myctx.hash(request.form.get("password"))

        # query database for username
        result = db.execute("INSERT INTO users (username, hash) VALUES(:username, :hash)", username=request.form.get("username"), hash=hash)

        # ensure username do not exist already
        if not result:
            return render_template("register.html")
        
        # log in registered user
        rows = db.execute("SELECT * FROM users WHERE username = :username", username=request.form.get("username"))
        session["user_id"] = rows[0]["ID"]

        # create default list
        db.execute("INSERT INTO list_name (listName, userId) VALUES (:listName, :id)", listName="default", id=session["user_id"])

        # redirect user to home page
        return redirect(url_for("lists"))

    # else if user reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("register.html")

@app.route("/logout")
@login_required
def logout():
    """Log user out."""

    # forget any user_id
    session.clear()

    # redirect user to login form
    return redirect(url_for("login"))

@app.route("/check_username")
def check_username():
    """Check if email exist in database."""
    username = request.args.get("q")
    row = db.execute("SELECT username FROM users WHERE username = :q", q=username)
    return jsonify(row)

@app.route("/check_listname")
def check_listname():
    """Check if listname exist in database."""
    listname = request.args.get("q")
    row = db.execute("SELECT listName FROM list_name WHERE listName = :l AND userId = :id", l=listname, id=session["user_id"])
    return jsonify(row)

@app.route("/check_recipe_name")
def check_recipe_name():
    """Check if recipe exist in database."""
    recipe_name = request.args.get("q")
    row1 = db.execute("SELECT recipeName FROM recipe_name WHERE recipeName = :r AND userId = :id", r=recipe_name, id=session["user_id"])
    row2 = db.execute("SELECT recipeName FROM recipe_name WHERE recipeName = :r AND userId IS NULL", r=recipe_name)
    return jsonify(row1, row2)

@app.route("/get_list")
def get_list():
    """Get list from db."""
    listname = request.args.get("q")
    check_list_id = db.execute("SELECT listId FROM list_name WHERE listName = :l AND userId = :id", l=listname, id=session["user_id"])
    rows = db.execute("SELECT lists.measure, lists.unit, ingredients.ingredient FROM lists INNER JOIN ingredients ON lists.ingredientId=ingredients.ingredientId WHERE lists.listId = :l AND lists.userId = :id", l=check_list_id[0]["listId"], id=session["user_id"])
    return jsonify(rows)

@app.route("/delete_list", methods=["POST"])
@login_required
def delete_list():
    """Delete list from db."""
    if request.method == "POST":

        if not request.form.get("selectedList"):
            return redirect(url_for("lists"))
        elif request.form.get("selectedList") == 'Choose one of the lists':
            return redirect(url_for("lists"))
        else:
            listname = request.form.get("selectedList")
            check_list_id = db.execute("SELECT listId FROM list_name WHERE listName = :l AND userId = :id", l=listname, id=session["user_id"])
            db.execute("DELETE FROM list_name WHERE listName=:l AND userId=:id", l=listname, id=session["user_id"])
            db.execute("DELETE FROM lists WHERE listId=:l AND userId=:id", l=check_list_id[0]["listId"], id=session["user_id"])
            return redirect(url_for("lists"))
    else:
        return redirect(url_for("lists"))

@app.route("/search_ingredient")
@login_required
def search_ingredient():   
    """Search for ingredients that match query."""
    ingredient = request.args.get("q").replace("+", "* ") + "*"
    rows = db.execute("SELECT * FROM ingredients_search WHERE ingredients_search MATCH :q", q=ingredient)
    return jsonify(rows)

@app.route("/search_recipe")
@login_required
def search_recipe():   
    """Search for recipes that match query."""
    recipe = request.args.get("q").replace("+", "* ") + "*"
    rows = db.execute("SELECT * FROM recipe_search WHERE recipe_search MATCH :q", q=recipe)
    return jsonify(rows)

@app.route("/lists", methods=["GET", "POST"])
@login_required
def lists():
    """Manage lists."""
        # get list
    names = []
    rows = db.execute("SELECT listName FROM list_name WHERE userId = :id", id=session["user_id"])

    for row in rows:
        if not row["listName"] in names:
            names.append(row["listName"])

    render_template("lists.html", names=names)

    if request.method == "POST":

        if not request.form.get("listName"):
            return render_template("lists.html", names=names)
        else:
            input_list_name = request.form.get("listName")
            db.execute("INSERT INTO list_name (listName, userId) VALUES (:l, :id)", l=input_list_name, id=session["user_id"])
            return redirect(url_for("lists"))
    else:
        return render_template("lists.html", names=names)

@app.route("/get_recipe")
@login_required
def get_recipe():   
    """Get recipe."""
    if request.method == "GET":
    # ensure stock was submitted
        if not request.args.get("q"):
            return
        else:
            name = request.args.get("q")
            data = db.execute("SELECT recipeId, category, url, image FROM recipe_name WHERE recipeName = :n AND (userId = :id OR userId IS NULL)", n=name, id=session["user_id"])
            recipe_id = data[0]["recipeId"]
            rows = db.execute("SELECT recipes.measure, recipes.unit, ingredients.ingredient FROM recipes INNER JOIN ingredients ON ingredients.ingredientId=recipes.ingredientId WHERE recipes.recipeId = :r", r=recipe_id)
            return jsonify(data, rows)

@app.route("/recipes", methods=["GET", "POST"])
@login_required
def recipes():
    """Manage recipes."""
    lists = []
    rows = db.execute("SELECT listName FROM list_name WHERE userId = :id", id=session["user_id"])

    for row in rows:
        if not row["listName"] in lists:
            lists.append(row["listName"])

    render_template("recipes.html", lists=lists)

    if request.method == "POST":
        if not request.form.get("recipeName") or request.form.get("recipeList") == 'Choose one of the lists':
            return render_template("recipes.html", lists=lists)

        else:
            recipeName = request.form.get("recipeName")
            listName = request.form.get("recipeList")
            check_recipe_id = db.execute("SELECT recipeId FROM recipe_name WHERE recipeName = :n and (userId = :id OR userId IS NULL)", n=recipeName, id=session["user_id"])
            recipe_id = check_recipe_id[0]["recipeId"]
            check_list_id = db.execute("SELECT listId FROM list_name WHERE listName = :l AND userId = :id", l=listName, id=session["user_id"])
            list_id=check_list_id[0]["listId"]
            items = db.execute("SELECT recipes.measure, recipes.unit, ingredients.ingredient, ingredients.ingredientId FROM recipes INNER JOIN ingredients ON ingredients.ingredientId=recipes.ingredientId WHERE recipes.recipeId = :r", r=recipe_id)

            for item in items:
                check = db.execute("SELECT * FROM lists WHERE ingredientId = :i AND userId = :id AND listId = :l", i=item["ingredientId"], id=session["user_id"], l=list_id)
                if check:
                    if item["unit"] == check[0]["unit"]:
                        db.execute("UPDATE lists SET measure = measure + :m WHERE ingredientId = :i AND userId = :id AND listId = :l ", m=item["measure"], i=item["ingredientId"], id=session["user_id"], l=list_id)
                    else:
                        db.execute("INSERT INTO lists (ingredientId, measure, unit, userId, listId) VALUES(:ingredientId, :measure, :unit, :id, :listId)", ingredientId=item["ingredientId"], measure=item["measure"], unit=item["unit"], id=session["user_id"], listId=list_id)
                else:
                    db.execute("INSERT INTO lists (ingredientId, measure, unit, userId, listId) VALUES(:ingredientId, :measure, :unit, :id, :listId)", ingredientId=item["ingredientId"], measure=item["measure"], unit=item["unit"], id=session["user_id"], listId=list_id)
                
            return render_template("recipes.html", lists=lists)
    else:
        return render_template("recipes.html", lists=lists)

@app.route("/new_recipe", methods=["GET", "POST"])
@login_required
def new_recipe():
    """Manage recipes."""

    if request.method == "POST":

        # ensure stock was submitted
        if not request.form.get("recipeName") or not \
               request.form.get("recipeCategory") or not \
               request.form.get("recipeUrl") or not \
               request.form.get("recipeImg"):
            return render_template("new_recipe.html")
        else:
            name = request.form.get("recipeName")
            category = request.form.get("recipeCategory")
            url = request.form.get("recipeUrl")
            img = request.form.get("recipeImg")
            if request.form.get("recipeRadio"):
                db.execute("INSERT INTO recipe_name (recipeName, category, url, image) VALUES (:r, :c, :u, :i)", r=name, c=category, u=url, i=img)
            else:
                db.execute("INSERT INTO recipe_name (userId, recipeName, category, url, image) VALUES (:id, :r, :c, :u, :i)", id=session["user_id"], r=name, c=category, u=url, i=img)
            db.execute("INSERT INTO recipe_search (name, category) VALUES (:r, :c)", r=name, c=category)
            return render_template("new_recipe.html", name=name) 
        
    # else if user reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("new_recipe.html")


@app.route("/add_to_recipe", methods=["GET", "POST"])
@login_required
def add_to_recipe():
    """Manage recipes."""

    if request.method == "POST":

        # ensure stock was submitted
        if not request.form.get("recipeSubmitName") or not \
               request.form.get("recipeSubmitIngredient") or not \
               request.form.get("recipeSubmitMeasure") or \
               float(request.form.get("recipeSubmitMeasure")) <= 0 or \
               request.form.get("recipeSubmitUnit") == 'Choose unit':
            return render_template("add_to_recipe.html")
        else:
            name = request.form.get("recipeSubmitName")
            ingredient = request.form.get("recipeSubmitIngredient")
            measure = float(request.form.get("recipeSubmitMeasure"))
            unit = request.form.get("recipeSubmitUnit")

            # add ingredient to list if it's not 
            add = db.execute("INSERT INTO ingredients (ingredient) VALUES(:ingredient)", ingredient=ingredient)
            if add:
                db.execute("INSERT INTO ingredients_search (ingredient) VALUES(:ingredient)", ingredient=ingredient)

            check_recipe_id = db.execute("SELECT recipeId FROM recipe_name WHERE recipeName = :n and (userId = :id OR userId IS NULL)", n=name, id=session["user_id"])
            recipe_id = check_recipe_id[0]["recipeId"]
            check_ingredient_id = db.execute("SELECT ingredientId FROM ingredients WHERE ingredient = :i", i=ingredient)
            ingredient_id = check_ingredient_id[0]["ingredientId"]

            check = db.execute("SELECT * FROM recipes WHERE ingredientId = :i AND recipeId = :r", i=ingredient_id, r=recipe_id)
            if check:
                if check[0]["unit"] == unit:
                    db.execute("UPDATE recipes SET measure = measure + :m WHERE ingredientId = :i AND recipeId = :r ", m=measure, i=ingredient_id, r=recipe_id)
                else:
                    db.execute("INSERT INTO recipes (recipeId, ingredientId, measure, unit) VALUES (:r, :i, :m, :u)", r=recipe_id, i=ingredient_id, m=measure, u=unit)
            else:
                db.execute("INSERT INTO recipes (recipeId, ingredientId, measure, unit) VALUES (:r, :i, :m, :u)", r=recipe_id, i=ingredient_id, m=measure, u=unit)
                
            return render_template("add_to_recipe.html", name=name) 
        
    # else if user reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("add_to_recipe.html")

@app.route("/ingredients", methods=["GET", "POST"])
@login_required
def ingredients():
    """Manage ingredients."""
    # get list
    names = []
    rows = db.execute("SELECT listName FROM list_name WHERE userId = :id", id=session["user_id"])

    for row in rows:
        if not row["listName"] in names:
            names.append(row["listName"])

    render_template("ingredients.html", names=names)

    if request.method == "POST":

        if not request.form.get("listSubmitIngredient") or not \
               request.form.get("listSubmitMeasure") or \
               float(request.form.get("listSubmitMeasure")) <= 0 or \
               request.form.get("listSubmitUnit") == 'Choose unit' or \
               request.form.get("listSubmitListname") == 'Choose one of the lists':
            return render_template("ingredients.html", names=names)

        else:
            ingredient = request.form.get("listSubmitIngredient")
            measure = float(request.form.get("listSubmitMeasure"))
            unit = request.form.get("listSubmitUnit")
            list_name = request.form.get("listSubmitListname")

            # add ingredient to list if it's not 
            add = db.execute("INSERT INTO ingredients (ingredient) VALUES(:ingredient)", ingredient=ingredient)
            if add:
                db.execute("INSERT INTO ingredients_search (ingredient) VALUES(:ingredient)", ingredient=ingredient)
            
            # read ingredient and list id's from databases
            check_id = db.execute("SELECT ingredientId FROM ingredients WHERE ingredient = :i", i=ingredient)
            check_list_id = db.execute("SELECT listId FROM list_name WHERE listName = :l AND userId = :id", l=list_name, id=session["user_id"])
            
            # insert to list
            check = db.execute("SELECT * FROM lists WHERE ingredientId = :i AND userId = :id AND listId = :l", i=check_id[0]["ingredientId"], id=session["user_id"], l=check_list_id[0]["listId"])
            if check:
                if check[0]["unit"] == unit:
                    db.execute("UPDATE lists SET measure = measure + :m WHERE ingredientId = :i AND userId = :id AND listId = :l ", m=measure, i=check_id[0]["ingredientId"], id=session["user_id"], l=check_list_id[0]["listId"])
                else:
                    db.execute("INSERT INTO lists (ingredientId, measure, unit, userId, listId) VALUES(:ingredientId, :measure, :unit, :id, :listId)", ingredientId=check_id[0]["ingredientId"], measure=measure, unit=unit, id=session["user_id"], listId=check_list_id[0]["listId"])
            else:
                db.execute("INSERT INTO lists (ingredientId, measure, unit, userId, listId) VALUES(:ingredientId, :measure, :unit, :id, :listId)", ingredientId=check_id[0]["ingredientId"], measure=measure, unit=unit, id=session["user_id"], listId=check_list_id[0]["listId"])

            return render_template("ingredients.html", names=names)

    else:
        return render_template("ingredients.html", names=names)


if __name__=="__main__":
    app.run()