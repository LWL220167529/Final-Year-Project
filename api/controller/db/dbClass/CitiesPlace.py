from sqlalchemy import *
from sqlalchemy.dialects.mysql import TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
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