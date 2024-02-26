import subprocess
import time

command = "pm2 restart api"

def restartServer():
    # Restart the server
    subprocess.run(command, shell=True)
