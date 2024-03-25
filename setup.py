# coding: utf-8
from setuptools import setup, find_packages

requirements = [
    'flask_login',
    'flask',
    'flask_wtf',
    'flask-cors',
    'flask-bcrypt',
    'Flask-Caching',
    'flask-limiter',
    'flask-debugtoolbar',
    'redis',
    'mysql-connector-python',
    'Flask-SQLAlchemy',
    'pymysql',
]

requirements_extra = {
    'dev': [
        'flake8',
        'codecov',
        'coverage',
        'pytest>=3.8.2',
        'pytest-cov>=2.5.1',
        'pytest-flask>=0.13.0',
    ]
}

setup(
    name='talkshow',
    version='0.1.0',
    description="Call for papers system",
    packages=find_packages(include=['talkshow', 'talkshow.*']),
    include_package_data=True,
    install_requires=requirements,
    extras_require=requirements_extra
)
