from flask import jsonify
from sqlalchemy import DECIMAL, DOUBLE, JSON, Boolean, Text, create_engine, Column, Integer, String, DateTime, ForeignKey, Float, or_, desc, and_
from sqlalchemy.dialects.mysql import TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from rapidfuzz import process, fuzz
from typing import Optional
import pandas as pd
import math
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

    def get_all_cities_place():
        try:
            cities_places = session.query(CitiesPlace).all()
            cities_places_data = [
                city_place.__dict__ for city_place in cities_places]
            for city_place_data in cities_places_data:
                del city_place_data['_sa_instance_state']
            return cities_places_data, 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500

    @staticmethod
    def get_by_input(input: int):
        try:
            cities_places = session.query(CitiesPlace).filter(
                or_(
                    CitiesPlace.name.like("%" + input + "%"),
                    CitiesPlace.state_code.like("%" + input + "%"),
                    CitiesPlace.country_code.like("%" + input + "%"),
                    CitiesPlace.cities_id.like("%" + input + "%"),
                    CitiesPlace.type.like("%" + input + "%"),
                    CitiesPlace.sub_type.like("%" + input + "%"),
                    CitiesPlace.address.like("%" + input + "%"),
                )
            ).all()

            cities_places_data = [
                city_place.__dict__ for city_place in cities_places]
            for city_place_data in cities_places_data:
                del city_place_data['_sa_instance_state']

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


rows = session.query(CitiesPlace).filter(
    CitiesPlace.state_id == 852).order_by(CitiesPlace.cities_id.asc()).all()

data = {
    'id': [],
    'name': [],
    'state_id': [],
    'state_code': [],
    'country_id': [],
    'country_code': [],
    'cities_id': [],
    'type': [],
    'sub_type': [],
    'rating': [],
    'price_level': [],
    'reviews': [],
    'description': [],
    'address': [],
    'pictures': [],
    'websiteUri': [],
    'phone': [],
    'latitude': [],
    'longitude': [],
    'created_at': [],
    'updated_at': []
}

for row in rows:
    data['id'].append(row.id)
    data['name'].append(row.name)
    data['state_id'].append(row.state_id)
    data['state_code'].append(row.state_code)
    data['country_id'].append(row.country_id)
    data['country_code'].append(row.country_code)
    data['cities_id'].append(row.cities_id)
    data['type'].append(row.type)
    data['sub_type'].append(row.sub_type)
    data['rating'].append(row.rating)
    data['price_level'].append(row.price_level)
    data['reviews'].append(row.reviews)
    data['description'].append(row.description)
    data['address'].append(row.address)
    data['pictures'].append(row.pictures)
    data['websiteUri'].append(row.websiteUri)
    data['phone'].append(row.phone)
    data['latitude'].append(row.latitude)
    data['longitude'].append(row.longitude)
    data['created_at'].append(row.created_at)
    data['updated_at'].append(row.updated_at)

df = pd.DataFrame(data)

df2 = df.copy()

C = df2['reviews'].mean()

m = df2['rating'].quantile(0.4)

q_attractions = df2.copy().loc[df2['rating'] >= m]


def weighted_rating(x, m=m, C=C):
    v = x['rating']
    R = x['reviews']
    # Calculation based on the IMDB formula
    return (v/(v+m) * R) + (m/(m+v) * C)


# Define a new feature 'score' and calculate its value with `weighted_rating()`
q_attractions['score'] = q_attractions.apply(weighted_rating, axis=1)

attractions = q_attractions.sort_values('score', ascending=False)


def getRandomPlan(state_id, day, budget, num_of_people, start_date, activities):
    citiesPlace = attractions.copy()

    if len(citiesPlace) < (int(day)+1) * 3:
        print("Insufficient data. Stopping...")
        return

    random_cities = citiesPlace.sample(n=(int(day)+1) * 3)
    random_cities = random_cities[random_cities['id'].isin(
        random_cities['id'])]

    # Add errors='ignore' to handle missing labels
    citiesPlace = citiesPlace.drop(random_cities.index, errors='ignore')
    response = []
    temp_list = []

    for index, (row_index, row) in enumerate(random_cities.iterrows(), start=1):
        try:
            if index < len(random_cities):
                    next_row = random_cities.iloc[index]
                    while True:
                        distance = calculate_distance(
                            row['latitude'], row['longitude'], next_row['latitude'], next_row['longitude'])
                        if 10 < distance < 100 and int(row['score']) > 5:
                            temp_list.append(row.to_dict())
                            if index % 3 == 0:
                                response.append(temp_list)
                                temp_list = []
                            break
                        else:
                            if len(citiesPlace) > 0:
                                random_cities.iloc[index - 1] = citiesPlace.iloc[0]
                                # Add errors='ignore' to handle missing labels
                                citiesPlace = citiesPlace.drop(citiesPlace.index[0], errors='ignore')
                                next_row = citiesPlace.iloc[0]
                            else:
                                print("No more cities to try. Stopping...")
                                return
            # Rest of your code...
        except IndexError:
            print("Invalid index. Skipping...")
            break
    return response


def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Radius of the Earth in kilometers

    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    delta_lat = lat2_rad - lat1_rad
    delta_lon = lon2_rad - lon1_rad

    a = math.sin(delta_lat/2) ** 2 + math.cos(lat1_rad) * \
        math.cos(lat2_rad) * math.sin(delta_lon/2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance = R * c
    return distance


def get_city_matches(city_input, city_list, limit=5):
    results = process.extract(city_input, city_list,
                              scorer=fuzz.WRatio, limit=limit)
    matches = []
    for result in results:
        resultSplit = result[0].split(', ')
        cityID = session.query(Cities.id).\
            join(States, Cities.state_id == States.id).\
            filter(
                and_(Cities.name == resultSplit[0], States.name == resultSplit[1])).first()
        matches.append(
            {"message": result[0], "city": resultSplit[0], "state": resultSplit[1], "key": cityID.id})
    return matches


rows = session.query(Cities.id, Cities.name, States.name, States.id).\
    join(States, Cities.state_id == States.id).\
    filter(Cities.country_code == 'JP').\
    order_by(States.id.asc()).all()

# Store the city names in a list
city_list = [f'{row[1]}, {row[2]}' for row in rows]


def estimate_place(city_input: int):
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
