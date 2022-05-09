from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json

from restaurant import Restaurant

app = Flask(__name__)
cors = CORS(app)

# SQL datatypes : NULL, INTEGER, REAL, TEXT, BLOB

class dbAccess:
    def __init__(self) -> None:
        self.conn = None
        try:
            self.conn = sqlite3.connect('restaurants.sqlite')
            self.cursor = self.conn.cursor()
        except:
            print("error during db instantiation")
    
    def commit(self) -> None:
        self.conn.commit()

    def close(self) -> None:
        self.conn.close()

    def saveAndClose(self) -> None:
        self.commit()
        self.close()

    def createTable(self) -> None:
        self.cursor.execute("""CREATE TABLE restaurants (
            name text,
            food text,
            vegetarian text,
            price integer,
            distance integer,
            rate integer,
            streetNum text,
            street text,
            city text,
            longitude text,
            latitude text,
            website text,
            deal text
        ) """)

    def createRestaurant(self, spot: Restaurant) -> bool:
        try:
            sql = "INSERT INTO restaurants VALUES (:name, :food, :vegetarian, :price, :distance, :rate, :streetNum, :street, :city, :longitude, :latitude, :website, :deal)"
            self.cursor = self.conn.execute(sql, {
                'name': spot.name, 'food': spot.food, 'vegetarian': spot.vegetarian,
                'price': spot.price, 'distance': spot.distance, 'rate': spot.rate,
                'streetNum': spot.streetNum, 'street': spot.street, 'city': spot.city,
                'longitude': spot.lon, 'latitude': spot.lat, 'website': spot.website, 'deal': spot.deal
            })
            self.saveAndClose()
            return "True"
        except ValueError as e:
            print(e)
            return "False"

    def getAllEntries(self) -> list:
        try:
            sql = "select * from restaurants"
            self.conn.row_factory = sqlite3.Row
            self.cursor = self.conn.cursor()
            self.cursor.execute(sql)
            response = self.cursor.fetchall()
            entriesList = []
            for entry in response:
                tempDict = {}
                keys = entry.keys()
                for key, field in zip(keys, entry):
                    tempDict[key] = field
                entriesList.append(tempDict)
            print(entriesList)
            self.saveAndClose()
            return jsonify(entriesList)
        except ValueError as e:
            print(e)
            return []
    
    def editRestaurant(self, id, spot: Restaurant) -> bool:
        try:
            sql = "UPDATE restaurants SET (:name, :food, :vegetarian, :price, :distance, :rate, :streetNum, :street, :city, :longitude, :latitude, :website, :deal) WHERE (:id)"
            self.cursor = self.conn.execute(sql, {
                'name': spot.name, 'food': spot.food, 'vegetarian': spot.vegetarian,
                'price': spot.price, 'distance': spot.distance, 'rate': spot.rate,
                'streetNum': spot.streetNum, 'street': spot.street, 'city': spot.city,
                'longitude': spot.lon, 'latitude': spot.lat, 'website': spot.website, 'deal': spot.deal
            })
            self.saveAndClose()
            return "True"
        except ValueError as e:
            print(e)
            return "False"

# db = dbAccess()
# db.createTable()

@app.route("/")
def hello_world():
    return "hello world"

@app.route("/create",  methods=["GET"])
def create_entry():
    """Takes one restaurant dict and make new entry in db
    """
    print("\nCREATING ENTRY")
    id = json.loads(request.args.get("id"))
    spot = json.loads(request.args.get("spot"))
    print(spot)

    newSpot = Restaurant(
        name=spot["name"], food=spot["food"], vegetarian=spot["isVege"], price=spot["price"],
        distance=spot["distance"], rate=spot["rate"], streetNum=spot["address"]["streetNum"],
        street=spot["address"]["street"], city=spot["address"]["city"],
        lon=spot["coordinates"]["lon"], lat=spot["coordinates"]["lat"], website="www.foodles.com", deal='None'
    )
    db = dbAccess()
    return db.createRestaurant(id, newSpot)

@app.route("/list", methods=["GET"])
def list_entries():
    """Returns all entries of database
    """
    print("\nLISTING ENTRIES")
    db = dbAccess()
    return db.getAllEntries()

@app.route("/edit")
def edit_entry():
    """Takes one restaurant id, a new restaurant dict version
    and update entry in db
    """
    print("\nEDITTING ENTRY")
    spot = json.loads(request.args.get("spot"))
    print(spot)

    edittedSpot = Restaurant(
        name=spot["name"], food=spot["food"], vegetarian=spot["isVege"], price=spot["price"],
        distance=spot["distance"], rate=spot["rate"], streetNum=spot["address"]["streetNum"],
        street=spot["address"]["street"], city=spot["address"]["city"],
        lon=spot["coordinates"]["lon"], lat=spot["coordinates"]["lat"], website="www.foodles.com", deal='None'
    )
    db = dbAccess()
    return db.editRestaurant(edittedSpot)


@app.route("/fetch")
def fetch_entry():
    """Takes one restaurant id and returns a restaurant dict

    Returns:
        _type_: _description_
    """
    print("\nFETCHING ENTRY")
    return "fetch"


@app.route("/find")
def find_matches():
    """Takes fields (either none = empty, up to n) and returns
    all matching restaurants
    """
    print("\nFINDING MATCHING ENTRIES")
    return "find"