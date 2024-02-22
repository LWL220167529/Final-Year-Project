from django.urls import path, include
from django.contrib import admin
from . import views

# URLConf for the web app
urlpatterns = [
    path('', views.index, name='index'),
]