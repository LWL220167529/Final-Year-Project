from flask_wtf import FlaskForm
from wtforms.validators import ValidationError
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo, Length, Regexp

# Local modules
from controller.db.user import User


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()], render_kw={'placeholder': 'example@email.com'})
    password = PasswordField('Password', validators=[DataRequired()], render_kw={'placeholder': '********'})
    remember_me = BooleanField('Remember me', default=False)
    submit = SubmitField('Log In')
