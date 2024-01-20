from flask import jsonify
from sqlalchemy import DECIMAL, DOUBLE, JSON, Boolean, Text, create_engine, Column, Integer, String, DateTime, ForeignKey, Float, or_, desc, and_
from sqlalchemy.dialects.mysql import TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
from typing import Optional, List
import json

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

Base = declarative_base()


class UserSchedule(Base):
    __tablename__ = 'user_schedule'

    id = Column(Integer, primary_key=True, autoincrement=True)
    directory_ID = Column(Integer, ForeignKey(
        'schedule_directory.id'), nullable=False)
    Itinerary = Column(Integer, nullable=False)
    place_ID = Column(Integer, ForeignKey('cities_place.id'), nullable=False)
    description = Column(String(255))
    startTime = Column(DateTime)
    createTime = Column(DateTime, nullable=True)
    editTime = Column(DateTime)


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


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    userName = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(252), nullable=False)
    phoneNumber = Column(String(20), nullable=False)
    createTime = Column(DateTime, nullable=False, default=datetime.utcnow)


class ScheduleDirectory(Base):
    __tablename__ = 'schedule_directory'
    id = Column(Integer, primary_key=True, autoincrement=True)
    userID = Column(Integer, ForeignKey('user.id'), nullable=False)
    description = Column(String(255), default=None)
    startTime = Column(DateTime, default=None)
    createTime = Column(DateTime, default=datetime.utcnow)
    editTime = Column(DateTime, default=None)


def add_schedule(userID: str, description: str, startTime: str, placesJson: dict):
    try:
        new_schedule = create_schedule(userID, description, startTime)
        session.add(new_schedule)
        session.commit()

        new_schedule_id = get_new_schedule_id(userID)
        places = json.loads(placesJson)
        for place in places:
            new_place = create_user_schedule(new_schedule_id, place)
            session.add(new_place)

        session.commit()
        return jsonify({'message': 'Schedule added successfully', 'addSchedule': True}), 201
    except Exception as e:
        return jsonify({'message': 'Error occurred during add schedule.', 'error': str(e)}), 500


def update_schedule(userID: str, scheduleID: int, description: str, startTime: str, placesJson: dict):
    try:
        directory = get_schedule_directory(userID, scheduleID)
        if not directory:
            return jsonify({'message': 'Schedule not found'}), 404

        directory.startTime = startTime
        directory.description = description

        schedules = get_user_schedules(directory.id)
        if not schedules:
            return jsonify({'message': 'Schedule not found'}), 404

        places = json.loads(placesJson)
        for schedule, place in zip(schedules, places):
            if not schedule:
                new_place = create_user_schedule(directory.id, place)
                session.add(new_place)
            else:
                update_user_schedule(schedule, place)

        session.commit()
        return jsonify({'message': 'Schedule updated successfully', 'updateSchedule': True}), 200
    except Exception as e:
        return jsonify({'message': 'Error occurred during update schedule.', 'error': str(e)}), 500


def create_schedule(userID: str, description: str, startTime: str) -> ScheduleDirectory:
    return ScheduleDirectory(userID=userID, description=description, startTime=startTime)


def get_new_schedule_id(userID: str) -> int:
    return session.query(max(ScheduleDirectory.id)).filter(
        ScheduleDirectory.userID == userID).order_by(desc(ScheduleDirectory.id)).first()


def create_user_schedule(directory_id: int, place: dict) -> UserSchedule:
    return UserSchedule(directory_ID=directory_id, Itinerary=place['itinerary'], place_ID=place['place_ID'],
                        description=place['description'], createTime=datetime.utcnow(), editTime=datetime.utcnow())


def get_schedule_directory(userID: str, scheduleID: int) -> Optional[ScheduleDirectory]:
    return session.query(ScheduleDirectory).filter(and_(
        ScheduleDirectory.id == scheduleID, ScheduleDirectory.userID == userID)).first()


def get_user_schedules(directory_id: int) -> List[UserSchedule]:
    return session.query(UserSchedule).filter(UserSchedule.directory_ID == directory_id).all()


def update_user_schedule(schedule: UserSchedule, place: dict):
    schedule.description = place['description']
    schedule.Itinerary = place['Itinerary']
    schedule.place_ID = place['place_ID']
    schedule.editTime = datetime.utcnow()

    
session.close()
