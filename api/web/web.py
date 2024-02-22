from django.shortcuts import render
from django.http import *
from . import views

def index(request):
    return render(request, 'views/index.html')