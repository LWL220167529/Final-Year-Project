from flask import jsonify
from pymysql import TIMESTAMP
from sqlalchemy import DECIMAL, DOUBLE, JSON, Boolean, Text, create_engine, Column, Integer, String, DateTime, ForeignKey, Float, or_
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

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
    address = Column(String(255))
    pictures = Column(String(255))
    websiteUri = Column(String(255))
    latitude = Column(DECIMAL(10, 8), nullable=False)
    longitude = Column(DECIMAL(11, 8), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

        
    def set_name(self, name):
        self.name = name

    def set_state_id(self, state_id):
        self.state_id = state_id
    
    def get_state_id(self):
        return self.state_id

    def set_state_code(self, state_code):
        self.state_code = state_code

    def set_country_id(self, country_id):
        self.country_id = country_id

    def get_country_id(self):
        return self.country_id

    def set_country_code(self, country_code):
        self.country_code = country_code

    def set_cities_id(self, cities_id):
        self.cities_id = cities_id
    
    def set_type(self, type):
        self.type = type

    def set_sub_type(self, sub_type):
        self.sub_type = sub_type

    def set_rating(self, rating):
        self.rating = rating

    def set_price_level(self, price_level):
        self.price_level = price_level

    def set_address(self, address):
        self.address = address

    def set_pictures(self, pictures):
        self.pictures = pictures

    def set_websiteUri(self, websiteUri):
        self.websiteUri = websiteUri

    def set_latitude(self, latitude):
        self.latitude = latitude

    def set_longitude(self, longitude):
        self.longitude = longitude

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



session.close()
