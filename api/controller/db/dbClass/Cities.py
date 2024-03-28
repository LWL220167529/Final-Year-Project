from sqlalchemy import *
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