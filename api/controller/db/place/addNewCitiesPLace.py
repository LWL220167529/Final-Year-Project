from flask import jsonify
from sqlalchemy import *
from sqlalchemy.orm import Session
from . import *

def add_new_cities_place(data: dict):
    try:
        session = Session()
        # Create a new cities place instance
        new_cities_place = CitiesPlace(**data)

        # Add the new cities place to the database
        session.add(new_cities_place)
        session.commit()

        session.close()

        return jsonify({'message': 'New cities place created successfully.'}), 201
    except Exception as e:
        session.rollback()  # Rollback the database changes in case of an exception
        return jsonify({'message': str(e)}), 500