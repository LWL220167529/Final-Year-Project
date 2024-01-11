from flask import jsonify
from sqlalchemy import DECIMAL, DOUBLE, JSON, Boolean, Text, create_engine, Column, Integer, String, DateTime, ForeignKey, Float, or_, desc
from sqlalchemy.dialects.mysql import TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import math, random

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
    state_code = Column(String(255, collation='utf8mb4_unicode_ci'), nullable=False)
    country_id = Column(Integer, ForeignKey('countries.id'), nullable=False)
    country_code = Column(String(2, collation='utf8mb4_unicode_ci'), nullable=False)
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
    updated_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)


    def get_all_cities_place():
        try:
            cities_places = session.query(CitiesPlace).all()
            cities_places_data = [city_place.__dict__ for city_place in cities_places]
            for city_place_data in cities_places_data:
                del city_place_data['_sa_instance_state']
            return cities_places_data, 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500

    @staticmethod
    def get_by_input(input):
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

            cities_places_data = [city_place.__dict__ for city_place in cities_places]
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
    created_at = Column(DateTime, nullable=False, default=datetime(2014, 1, 1, 6, 31, 1))
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    flag = Column(Integer, nullable=False, default=1)
    wikiDataId = Column(String(255), nullable=True, comment='Rapid API GeoDB Cities')

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
    updated_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
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
    updated_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    flag = Column(Boolean, nullable=False, default=True)
    wikiDataId = Column(String(255), comment='Rapid API GeoDB Cities')



def getRandomPlan(state_id, day, budget, num_of_people, start_date, activities):
    citiesPlace = session.query(CitiesPlace).filter(CitiesPlace.state_id == state_id).order_by(desc(CitiesPlace.reviews)).all()

    if not citiesPlace:
        print("No data found. Stopping...")
        return

    random_cities = random.sample(citiesPlace, (int(day)*3))

    for i in random_cities:
        citiesPlace.remove(i)

    response = []

    for index, city in enumerate(random_cities, start=1):
        while True:
            try:
                distance = calculate_distance(random_cities[index-1].latitude, random_cities[index-1].longitude, city.latitude, city.longitude)
                if 10 < distance < 100:
                    city_data = {
                        'id': city.id,
                        'name': city.name,
                        'state_id': city.state_id,
                        'state_code': city.state_code,
                        'country_id': city.country_id,
                        'country_code': city.country_code,
                        'cities_id': city.cities_id,
                        'type': city.type,
                        'sub_type': city.sub_type,
                        'rating': city.rating,
                        'price_level': city.price_level,
                        'reviews': city.reviews,
                        'description': city.description,
                        'address': city.address,
                        'pictures': city.pictures,
                        'websiteUri': city.websiteUri,
                        'phone': city.phone,
                        'latitude': city.latitude,
                        'longitude': city.longitude,
                        'created_at': city.created_at,
                        'updated_at': city.updated_at
                    }
                    response.append(city_data)
                    break
                else:
                    if len(citiesPlace) > 0:
                        random_cities[index-1] = random.choice(citiesPlace)
                        citiesPlace.remove(random_cities[index-1])
                    else:
                        break
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

    a = math.sin(delta_lat/2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon/2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance = R * c
    return distance

session.close()
