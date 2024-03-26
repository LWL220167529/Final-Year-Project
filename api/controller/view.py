from flask import (
    Blueprint, request, render_template, redirect, url_for, jsonify
)
from .cookies import exists_cookie, get_cookie
from .__init__ import get_destinations_filter_by_rating, get_destinations
from .db import place
import random
import os

bp = Blueprint(f"{os.path.basename(__file__)[:-3]}", __name__,
               template_folder='templates', static_folder='static')


@bp.route('/travel/view', methods=["GET"])
def index():
    response = None
    isLoggedIn = False
    if exists_cookie(request, 'userID'):
        response = get_cookie(request, 'userID')
        isLoggedIn = True
    total_pages = len(get_destinations()) // 24 + 1
    attractions = get_destinations()[:24]
    filtered_destinations = get_destinations_filter_by_rating()
    top_destinations = random.sample(
        filtered_destinations, k=10) if filtered_destinations else []
    maxPage = min(total_pages, 1 + 5)
    minPage = 2
    return render_template('view.html', isLoggedIn=isLoggedIn, userID=response,
                           top_destinations=top_destinations, attractions=attractions,
                           count=int(total_pages), max=maxPage, min=minPage)


@bp.route('/travel/<int:current_page>', methods=["GET"])
def indexPage(current_page):
    if current_page < 1:
        return redirect(url_for('index'))
    # Check if current_page is out of bounds
    total_pages = len(get_destinations()) // 24 + 1
    if current_page > total_pages:
        return jsonify({'message': 'Page not found'}), 404

    # Calculate the start and end indices for attractions
    start_index = 24 * (current_page - 1)
    end_index = min(24 * current_page, len(get_destinations()))

    maxPage = min(total_pages, current_page + 5)
    minPage = max(1, current_page - 5)

    attractions = get_destinations()[start_index:end_index]

    response = {
        'attractions': attractions,
        'count': total_pages,
        'current_page': current_page,
        'max': maxPage,
        'min': minPage
    }

    return jsonify(response)

@bp.route('/addNewCitiesPlace', methods=["GET", "POST"])
def addNewCitiesPlace():
    try:
        if request.method == "GET":  # get request from url
            data = request.args.to_dict()  # Get the GET request data as a dictionary
            # Call the add_new_cities_place function with the data
            return place.add_new_cities_place(data)
        else:  # post request from body
            data = request.get_json()
            return place.add_new_cities_place(data)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@bp.route('/updateCitiesPlace/<int:place_id>', methods=["GET", "POST"])
def updateCitiesPlace(place_id):
    try:
        if request.method == "GET":  # get request from url
            data = request.args.to_dict()  # Get the GET request data as a dictionary
        else:  # post request from body
            data = request.get_json()
        return place.update_cities_place(place_id, data)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@bp.route('/getAllPlace')
def getAllPlace():
    try:
        return place.get_all_cities_place()
    except Exception as e:
        print(e)
        return jsonify({'message': e}), 500


@bp.route('/searchPlace', methods=["GET", "POST"])
def getPlaceByID():
    try:
        if request.method == "GET":  # get request from url
            searchPlace = request.args.get('searchPlace')
        else:  # post request from body
            data = request.get_json()
            searchPlace = data.get('searchPlace')
        return place.get_by_input(searchPlace)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500
