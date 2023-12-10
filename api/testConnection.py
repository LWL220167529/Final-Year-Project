from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text

db_port = 3306  # Change the port to an integer
db_host = '159.223.94.246'
db_username = 'CHLuser'
db_password = '!Fyp@1Project'
db_name = 'FYP'
# Create SQLAlchemy engine
engine = create_engine(
    f'mysql+mysqlconnector://{db_username}:{db_password}@{db_host}:{int(db_port)}/{db_name}', pool_recycle=3600, echo=True
)

with engine.connect() as conn:
    result = conn.execute(text("SELECT userID FROM user"))
    for row in result:
        print(f"userID: {row.userID}")