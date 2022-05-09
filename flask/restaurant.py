import sqlite3

class Restaurant:
    def __init__(self, name = None, food = None, vegetarian = None,
    price = None, distance = None, rate = None, streetNum = None, street = None,
    city = None, lon = None, lat = None, website = None, deal = None) -> None:
        self.name = name
        self.food = food
        self.vegetarian = vegetarian
        self.price = price
        self.distance = distance
        self.rate = rate
        self.streetNum = streetNum
        self.street = street
        self.city = city
        self.lon = lon
        self.lat = lat
        self.website = website
        self.deal = deal

    def __dict__(self) -> dict:
        return {
            'name': self.name,
            'food': self.food,
            'vegetarian': self.vegetarian,
            'price': self.price,
            'distance': self.distance,
            'rate': self.rate,
            'streetNum': self.streetNum,
            'street': self.street,
            'city': self.city,
            'lon': self.lon,
            'lat': self.lat,
            'website': self.website,
            'deal': self.deal
        }
