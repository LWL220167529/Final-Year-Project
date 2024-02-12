from flask import jsonify
from sqlalchemy import DECIMAL, DOUBLE, JSON, Boolean, Text, create_engine, Column, Integer, String, DateTime, ForeignKey, Float, or_, desc, and_
from sqlalchemy.dialects.mysql import TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from rapidfuzz import process, fuzz
from typing import Optional
import pandas as pd
import gpt
import json
import math
import requests
import random

# Remote database configuration
db_port = 3306  # Change the port to an integer
db_host = '159.223.94.246'
db_username = 'root'
db_password = 'fypproject'
db_name = 'FYP'

# Create SQLAlchemy engine
engine = create_engine(
    f'mysql+mysqlconnector://{db_username}:{db_password}@{db_host}:{int(db_port)}/{db_name}'
)

Base = declarative_base()

Session = sessionmaker(bind=engine)
session = Session()


class CitiesPlace(Base):
    __tablename__ = 'cities_place'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    state_id = Column(Integer, ForeignKey('states.id'), nullable=False)
    state_code = Column(
        String(255, collation='utf8mb4_unicode_ci'), nullable=False)
    country_id = Column(Integer, ForeignKey('countries.id'), nullable=False)
    country_code = Column(
        String(2, collation='utf8mb4_unicode_ci'), nullable=False)
    cities_id = Column(Integer, ForeignKey('cities.id'), nullable=False)
    type = Column(JSON)
    sub_type = Column(JSON)
    rating = Column(DOUBLE)
    price_level = Column(String(45))
    reviews = Column(Integer)
    description = Column(Text)
    address = Column(String(255))
    pictures = Column(String(255))
    websiteUri = Column(String(255))
    phone = Column(String(25))
    latitude = Column(DECIMAL(10, 8), nullable=False)
    longitude = Column(DECIMAL(11, 8), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, nullable=False,
                        default=datetime.utcnow, onupdate=datetime.utcnow)


def add_new_cities_place(data: dict):
    try:
        # Create a new cities place instance
        new_cities_place = CitiesPlace(**data)

        # Add the new cities place to the database
        session.add(new_cities_place)
        session.commit()

        return jsonify({'message': 'New cities place created successfully.'}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500


def update_cities_place(place_id: int, data: dict):
    try:
        # Retrieve the cities place by ID
        cities_place = session.query(CitiesPlace).get(place_id)

        # Update the cities place attributes with the provided data
        for key, value in data.items():
            setattr(cities_place, key, value)

        # Commit the changes to the database
        session.commit()

        return jsonify({'message': 'Cities place updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500


def get_all_cities_place():
    try:
        cities_places = session.query(CitiesPlace).all()

        cities_places_data = []
        for city_place in cities_places:
            city_place_data = city_place.__dict__
            city_place_data.pop('_sa_instance_state', None)
            cities_places_data.append(city_place_data)

        return jsonify(cities_places_data), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error occurred while retrieving cities places.', 'error': str(e)}), 500


def get_by_input(input: str):
    try:
        search_query = f"%{input}%"
        cities_places = session.query(CitiesPlace).filter(
            or_(
                CitiesPlace.name.ilike(search_query),
                CitiesPlace.state_code.ilike(search_query),
                CitiesPlace.country_code.ilike(search_query),
                CitiesPlace.cities_id.ilike(search_query),
                CitiesPlace.type.ilike(search_query),
                CitiesPlace.sub_type.ilike(search_query),
                CitiesPlace.address.ilike(search_query),
            )
        ).all()

        if not cities_places:
            return jsonify({'message': "Can't find any matching cities places."}), 404

        cities_places_data = []
        for city_place in cities_places:
            city_place_data = {key: getattr(city_place, key)
                               for key in city_place.__table__.columns.keys()}
            city_place_data.pop('_sa_instance_state', None)
            cities_places_data.append(city_place_data)

        return cities_places_data, 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500


class Cities(Base):
    __tablename__ = 'cities'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    state_id = Column(Integer, ForeignKey('states.id'), nullable=False)
    state_code = Column(String(255), nullable=False)
    country_id = Column(Integer, ForeignKey('countries.id'), nullable=False)
    country_code = Column(String(2), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    created_at = Column(DateTime, nullable=False,
                        default=datetime(2014, 1, 1, 6, 31, 1))
    updated_at = Column(DateTime, nullable=False,
                        default=datetime.utcnow, onupdate=datetime.utcnow)
    flag = Column(Integer, nullable=False, default=1)
    wikiDataId = Column(String(255), nullable=True,
                        comment='Rapid API GeoDB Cities')


class States(Base):
    __tablename__ = 'states'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    country_id = Column(Integer, ForeignKey('countries.id'), nullable=False)
    country_code = Column(String(2), nullable=False)
    fips_code = Column(String(255))
    iso2 = Column(String(255))
    type = Column(String(191))
    latitude = Column(DECIMAL(10, 8))
    longitude = Column(DECIMAL(11, 8))
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP, nullable=False,
                        default=datetime.utcnow, onupdate=datetime.utcnow)
    flag = Column(Boolean, nullable=False, default=True)
    wikiDataId = Column(String(255), comment='Rapid API GeoDB Cities')


class Countries(Base):
    __tablename__ = 'countries'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    iso3 = Column(String(3))
    numeric_code = Column(String(3))
    iso2 = Column(String(2))
    phonecode = Column(String(255))
    capital = Column(String(255))
    currency = Column(String(255))
    currency_name = Column(String(255))
    currency_symbol = Column(String(255))
    tld = Column(String(255))
    native = Column(String(255))
    region = Column(String(255))
    region_id = Column(Integer)
    subregion = Column(String(255))
    subregion_id = Column(Integer)
    nationality = Column(String(255))
    timezones = Column(Text)
    translations = Column(Text)
    latitude = Column(DECIMAL(10, 8))
    longitude = Column(DECIMAL(11, 8))
    emoji = Column(String(191))
    emojiU = Column(String(191))
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP, nullable=False,
                        default=datetime.utcnow, onupdate=datetime.utcnow)
    flag = Column(Boolean, nullable=False, default=True)
    wikiDataId = Column(String(255), comment='Rapid API GeoDB Cities')

class SavePlan(Base):
    __tablename__ = 'save_plan'
    id = Column(Integer, primary_key=True)
    plan = Column(JSON)
    user_ID = Column(Integer)
    name = Column(String(255))
    price = Column(String(255))
    rating = Column(Float)
    category = Column(String(255))
    currency = Column(String(255))
    imageSrc = Column(String(255))
    latitude = Column(Float)
    longitude = Column(Float)
    reviewCount = Column(Integer)
    distanceFromDestination = Column(String(255))
    activity_info = Column(JSON)
    description = Column(String(255))

class UserSavePlan(Base):
    __tablename__ = 'user_save_plan'
    id = Column(Integer, primary_key=True)
    plan_ID = Column(Integer, ForeignKey('save_plan.id'))
    user_ID = Column(Integer)
    imageURL = Column(String(512))
    title = Column(String(255))

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    userName = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(252), nullable=False)
    phoneNumber = Column(String(20), nullable=False)
    createTime = Column(DateTime, nullable=False, default=datetime.utcnow)

if __name__ == "__main__":

    rows = session.query(CitiesPlace).filter(
        CitiesPlace.state_id == 852).order_by(CitiesPlace.cities_id.asc()).all()

    data = {
        'id': [row.id for row in rows],
        'name': [row.name for row in rows],
        'state_id': [row.state_id for row in rows],
        'state_code': [row.state_code for row in rows],
        'country_id': [row.country_id for row in rows],
        'country_code': [row.country_code for row in rows],
        'cities_id': [row.cities_id for row in rows],
        'type': [row.type for row in rows],
        'sub_type': [row.sub_type for row in rows],
        'rating': [row.rating for row in rows],
        'price_level': [row.price_level for row in rows],
        'reviews': [row.reviews for row in rows],
        'description': [row.description for row in rows],
        'address': [row.address for row in rows],
        'pictures': [row.pictures for row in rows],
        'websiteUri': [row.websiteUri for row in rows],
        'phone': [row.phone for row in rows],
        'latitude': [row.latitude for row in rows],
        'longitude': [row.longitude for row in rows],
        'created_at': [row.created_at for row in rows],
        'updated_at': [row.updated_at for row in rows]
    }

    df = pd.DataFrame(data)

    df2 = df.copy()

    C = df2['reviews'].mean()

    m = df2['rating'].quantile(0.4)

    q_attractions = df2.copy().loc[df2['rating'] >= m]


    def weighted_rating(x: pd.Series, m: float = m, C: float = C) -> float:
        v = x['rating']
        R = x['reviews']
        # Calculation based on the IMDB formula
        return (v / (v + m) * R) + (m / (m + v) * C)


    # Define a new feature 'score' and calculate its value with `weighted_rating()`
    q_attractions['score'] = q_attractions.apply(weighted_rating, axis=1)

    attractions = q_attractions.sort_values('score', ascending=False)


def getRandomPlan(data: dict):
    planData = json.loads(json.dumps(data))
    day = int(planData['numberOfDays'])

    urls = [
        "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary",
        "https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary"
    ]

    querystring = {
        "bl_latitude": data['destination']['bl_lat'],
        "tr_latitude": data['destination']['tr_lat'],
        "bl_longitude": data['destination']['bl_lng'],
        "tr_longitude": data['destination']['tr_lng'],
        "limit": "30",
        "currency": "USD",
        "lunit": "km",
        "lang": "en_US"
    }

    headers = {
        "X-RapidAPI-Key": "337de8d7c5msh99e0dfd0e714de4p182b66jsn0a5d798b1e0a",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com"
    }

    place = []  # save restaurants and attraction response

    for url in urls:
        response = requests.get(url, headers=headers, params=querystring)
        place.append(response.json())

    random_attractions = random.sample(place[1]["data"], (day + 1) * 3)
    random_restaurants = random.sample(place[0]["data"], (day + 1) * 3)

    response = []
    temp_list = []

    for index, (attraction, restaurant) in enumerate(zip(random_attractions, random_restaurants), start=1):
        try:
            if index == 1:
                    temp_list.append({"id": index, "sequence": index % 3,
                                    "name": data['HotelData']['Hotel'],
                                    "imageSrc": data['HotelData']['ImageSrc'],
                                    "category": data['HotelData']['category'],
                                    "latitude": data['HotelData']['coordinate']['latitude'],
                                    "longitude": data['HotelData']['coordinate']['longitude'],
                                    "distanceFromDestination": data['HotelData']['distanceFromDestination'],
                                    "price": data['HotelData']['price']['price'],
                                    "currency": data['HotelData']['price']['currency'],
                                    "rating": data['HotelData']['rating'],
                                    "reviewCount": data['HotelData']['reviewCount']})
            elif index % 2 == 0:
                if isinstance(restaurant, list) and len(restaurant) > 0 and 'name' in restaurant and 'address' in restaurant:
                    temp_list.append(
                        {"id": index, "sequence": index % 3, **restaurant[0]})
                else:
                    temp_list.append(
                        {"id": index, "sequence": index % 3, **random.sample(place[0]["data"], 1)[0]})
            else:
                if isinstance(attraction, list) and len(attraction) > 0 and 'name' in attraction and 'address' in attraction:
                    temp_list.append(
                        {"id": index, "sequence": index % 3, **attraction[0]})
                else:
                    temp_list.append(
                        {"id": index, "sequence": index % 3, **random.sample(place[1]["data"], 1)[0]})

            if index % 3 == 0:
                response.append(
                    {"day": day - (day - index // 3), "place": temp_list})
                temp_list = []

            if index // 3 == day:
                break

        except IndexError:
            print("Invalid index. Skipping...")
            break
    
    gpt_txt = gpt.gpt_plan_trip(response)

    for day_plan in gpt_txt['trip']['itinerary']:
        for activity in day_plan['activities']:
            activity_id = activity['id']
            new_activity_dict = {'activity_info': activity}
            for plan in response:
                if plan['day'] == day_plan['day']:
                    for place in plan['place']:
                        if place['id'] == activity_id:
                            place.update(new_activity_dict)
                            break

    newPlan = SavePlan(user_ID=data['userID'])

    session.add(newPlan)
    session.commit()

    final_response = {
        'accommodation': gpt_txt['trip']['accommodation'],
        'arrival_city': gpt_txt['trip']['arrival_city'],
        'duration': gpt_txt['trip']['duration'],
        "itinerary": response,
        "initial_input": planData,
        "planID": newPlan.id
    }

    newPlan.plan = final_response
    session.commit()

    return final_response


def savePlan(userID: int, planID: int, title: str, imageURL: str):
    try:
        newPlan = UserSavePlan(plan_ID=planID, user_ID=userID, title=title, imageURL=imageURL)

        session.add(newPlan)
        session.commit()

        return jsonify({'message': 'Plan saved successfully.'}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500

def getSavedPlanByUserID(userID: int):
    try:
        plans = session.query(UserSavePlan).filter(UserSavePlan.user_ID == userID).all()

        plan_list = [
            {
                'id': plan.id,
                'plan_ID': plan.plan_ID,
                'user_ID': plan.user_ID,
                'imageURL': plan.imageURL,
                'title': plan.title
            }
            for plan in plans
        ]

        return jsonify({'plans': plan_list}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error occurred while retrieving plans.', 'error': str(e)}), 500

def getSavedPlanByID(planID: int):
    try:
        plan = session.query(SavePlan).get(planID)

        if plan:
            plan_data = {
                'id': plan.id,
                'plan': plan.plan,
                'user_ID': plan.user_ID
            }
            return jsonify({'plan': plan_data}), 200
        else:
            return jsonify({'message': 'Plan not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': str(e)}), 500

    # for day in gpt_txt['trip']['itinerary']:
    #     for activity in day['activities']:
    #         activity_id = activity.get('id')
    #         corresponding_place = next((place for plan in response if plan['day'] == day['day'] for place in plan['place'] if place['id'] == activity_id), None)
    #         if corresponding_place:
    #             activity.update(corresponding_place)
    # return gpt_txt
    # return response
    # return gpt.gpt_plan_trip(response)


def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371  # Radius of the Earth in kilometers

    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    delta_lat = lat2_rad - lat1_rad
    delta_lon = lon2_rad - lon1_rad

    a = math.sin(delta_lat / 2) ** 2 + math.cos(lat1_rad) * \
        math.cos(lat2_rad) * math.sin(delta_lon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance = R * c
    return distance


def get_city_matches(city_input: str, city_list: list, limit: int = 5) -> list:
    results = process.extract(city_input, city_list,
                              scorer=fuzz.WRatio, limit=limit)
    matches = []
    for result in results:
        resultSplit = result[0].split(', ')
        cityID = session.query(Cities.id). \
            join(States, Cities.state_id == States.id). \
            filter(
            and_(Cities.name == resultSplit[0], States.name == resultSplit[1])).first()
        matches.append(
            {"message": result[0], "city": resultSplit[0], "state": resultSplit[1], "key": cityID.id})
    return matches


rows = session.query(Cities.id, Cities.name, States.name, States.id). \
    join(States, Cities.state_id == States.id). \
    filter(Cities.country_code == 'JP'). \
    order_by(States.id.asc()).all()

# Store the city names in a list
city_list = [f'{row[1]}, {row[2]}' for row in rows]


def estimate_place(city_input: int) -> list:
    try:
        if city_input == '':
            return []
        matches = get_city_matches(city_input, city_list)
        return matches
    except Exception as e:
        # Handle the exception here
        print(f"An error occurred: {e}")
        return []


session.close()
