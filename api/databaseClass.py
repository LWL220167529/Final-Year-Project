from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import bcrypt
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

#user class
class User(Base):
    __tablename__ = 'user'
    userID = Column(String(255), primary_key=True)
    userName = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(252), nullable=False)
    phoneNumber = Column(String(20), nullable=False)
    createTime = Column(DateTime, nullable=False, default=datetime.utcnow)
    #Base.metadata.create_all(engine)
    def __init__(self, userID, userName, email, password, phoneNumber):
        self.userID = userID
        self.userName = userName
        self.email = email
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.phoneNumber = phoneNumber

    def checkPassword(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

class Attraction(Base):
    __tablename__ = 'attraction'
    attractionID = Column(String(255), primary_key=True)
    attractionName = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    country = Column(String(255), nullable=False)
    region = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    image = Column(String(255), nullable=False)
    createTime = Column(DateTime, nullable=False, default=datetime.utcnow)
    editTime = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    #Base.metadata.create_all(engine)
    def __init__(self, attractionID, attractionName, location, country, region, description, image):
        self.attractionID = attractionID
        self.attractionName = attractionName
        self.location = location
        self.country = country
        self.region = region
        self.description = description
        self.image = image

session.close()
