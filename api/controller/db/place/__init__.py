from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import *
from sqlalchemy.dialects.mysql import TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

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
    id = Column(Integer, primary_key=True, autoincrement=True)
    plan = Column(JSON)
    user_ID = Column(Integer, ForeignKey('user.id'))
    name = Column(String(255))
    price = Column(String(255))
    rating = Column(DOUBLE)
    category = Column(String(255))
    currency = Column(String(255))
    imageSrc = Column(String(255))
    latitude = Column(DOUBLE)
    longitude = Column(DOUBLE)
    reviewCount = Column(Integer)
    distanceFromDestination = Column(String(255))
    activity_info = Column(JSON)
    description = Column(Text)
    title = Column(String(255))


class AIPlanItinerary(Base):
    __tablename__ = 'AI_plan_itinerary'
    id = Column(Integer, primary_key=True, autoincrement=True)
    place_ID = Column(Integer, ForeignKey('cities_place.id'))
    activity_info = Column(JSON)
    description = Column(Text)
    plan_ID = Column(Integer, ForeignKey('save_plan.id'))
    sequence = Column(Integer)
    day = Column(Integer)


class UserSavePlan(Base):
    __tablename__ = 'user_save_plan'
    id = Column(Integer, primary_key=True)
    plan_ID = Column(Integer, ForeignKey('save_plan.id'))
    user_ID = Column(Integer)
    imageURL = Column(String(512))
    title = Column(String(255))
    description = Column(Text)


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    userName = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(252), nullable=False)
    phoneNumber = Column(String(20), nullable=False)
    createTime = Column(DateTime, nullable=False, default=datetime.utcnow)
