import os

print(os.path.basename(__file__))

views = [f for f in os.listdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'controller')) if f.endswith(".py")]

print(views)
# print(os.path.abspath(__file__))

# print(os.listdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'controller'))) # /home/runner/Flask-Blueprints/api