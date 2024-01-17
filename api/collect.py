from flask import jsonify
from sqlalchemy import DECIMAL, DOUBLE, JSON, Boolean, Text, create_engine, Column, Integer, String, DateTime, ForeignKey, Float, or_, desc, and_
from sqlalchemy.dialects.mysql import TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
from typing import Optional, List, Union

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


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    userName = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(252), nullable=False)
    phoneNumber = Column(String(20), nullable=False)
    createTime = Column(DateTime, nullable=False, default=datetime.utcnow)


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


class UserCollection(Base):
    __tablename__ = 'user_collection'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_ID = Column(Integer, ForeignKey('user.id'), nullable=False)
    place_ID = Column(Integer, ForeignKey('cities_place.id'), nullable=False)
    rating = Column(Float, nullable=False)
    like = Column(Boolean, nullable=False, default=False)
    collection = Column(Boolean, nullable=False, default=False)

    user = relationship("User", backref="user_collections")
    place = relationship("CitiesPlace", backref="user_collections")


def addNewCollection(user_ID: int, place_ID: int, rating: Optional[float] = None, like: Optional[bool] = None, collection: Optional[bool] = None) -> dict:
    existing_collection = session.query(UserCollection).filter(and_(
        UserCollection.user_ID == user_ID, UserCollection.place_ID == place_ID)).first()
    if existing_collection:
        if rating is not None:
            existing_collection.rating = rating
        if like is not None:
            existing_collection.like = like
        if collection is not None:
            existing_collection.collection = collection
        session.commit()
        return {'message': 'Collection updated successfully', 'updateCollection': True}
    else:
        new_collection = UserCollection(
            user_ID=user_ID, place_ID=place_ID, rating=rating, like=like, collection=collection)
        session.add(new_collection)
        session.commit()
        return {'message': 'Collection added successfully', 'updateCollection': True}


def getCollectionByID(user_ID: int) -> Union[dict, List[dict]]:
    collection = session.query(UserCollection).get(user_ID)
    if collection:
        return jsonify([i.serialize for i in collection])
    else:
        return {'message': 'User does not have any collection.'}


session.close()