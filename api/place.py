from flask import jsonify
import databaseClass

def getPlace():
    place = databaseClass.session.query(databaseClass.Attraction).all()
    results = []
    for attraction in place:
        result = {
            'id': attraction.attractionID,
            'name': attraction.attractionName,
            'location': attraction.location,
            'description': attraction.description,
            'image': attraction.image,
            'created_at': attraction.createTime,
            'updated_at': attraction.editTime
        }
        results.append(result)
    return jsonify(results), 200