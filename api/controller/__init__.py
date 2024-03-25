from flask_caching import Cache
from .db import place

from flask import (
    Blueprint,
    current_app
)


bp = Blueprint('controller', __name__)

cache = Cache(config={'CACHE_TYPE': 'simple'})  # Update the CACHE_TYPE to a valid cache type, such as 'simple'

def init_cache(app):
    cache.init_app(app)

@bp.record
def register_cache(state):
    init_cache(state.app)

def get_cache():
    return current_app.extensions['cache']

def load_destinations():
    return place.get_all_cities_place().json

# Access destinations from cache


def get_destinations():
    destinations = cache.get('destinations')
    if destinations is None:
        destinations = load_destinations()
        cache.set('destinations', destinations, timeout=3600)
    return destinations


def load_destinations_filter_by_rating():
    return place.filter_cities_place("rating", 4).json

# Access destinations from cache


def get_destinations_filter_by_rating():
    destinations = cache.get('destinations_by_rating')
    if destinations is None:
        destinations = load_destinations_filter_by_rating()
        cache.set('destinations_by_rating', destinations, timeout=3600)
    return destinations

