from flask import jsonify
from sqlalchemy import create_engine, Column, Integer, String, DateTime, or_
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
#database connection

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

class Place(Base):
    __tablename__ = 'place'
    placeID = Column(String(255), primary_key=True)
    prefecture = Column(String(255), nullable=False)
    municipalityName = Column(String(255), nullable=False)
    municipalities = Column(String(255), nullable=False)
    region = Column(String(255), nullable=False)
    majorIsland = Column(String(255), nullable=False)
    district = Column(String(255), nullable=False)
    createTime = Column(DateTime, nullable=False, default=datetime.utcnow)
    editTime = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, placeID, prefecture, municipalityName, municipalities, region, majorIsland, district):
        self.placeID = placeID
        self.prefecture = prefecture
        self.municipalityName = municipalityName
        self.municipalities = municipalities
        self.region = region
        self.majorIsland = majorIsland
        self.district = district
        
    def get_all_place():
        try:
            places = session.query(Place).all()
            # Convert the places data to a list of dictionaries
            places_data = [place.__dict__ for place in places]
            # Remove the unnecessary attributes from each dictionary
            for place_data in places_data:
                del place_data['_sa_instance_state']
            return places_data, 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500

    @staticmethod
    def get_by_input(input):
        try:
            places = session.query(Place).filter(
                or_(
                    Place.placeID.like("%" + input + "%"),
                    Place.prefecture.like("%" + input + "%"),
                    Place.municipalityName.like("%" + input + "%"),
                    Place.municipalities.like("%" + input + "%"),
                    Place.region.like("%" + input + "%"),
                    Place.majorIsland.like("%" + input + "%"),
                    Place.district.like("%" + input + "%")
                )
            ).all()
            
            places_data = [place.__dict__ for place in places]
            for place_data in places_data:
                print(place_data[0])
                del place_data['_sa_instance_state']
            
            return places_data, 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500

session.close()
