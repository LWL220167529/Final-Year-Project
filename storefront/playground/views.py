from django.shortcuts import render
from django.http import HttpResponse
import sys
import os
sys.path.append(os.path.abspath(__file__).replace('\\storefront\\playground\\'+os.path.basename(os.path.abspath(__file__)), ''))  # Add the directory containing the 'api' module
from api import *

# Create your views here.
def index(request):
    return render(request, 'index.html')