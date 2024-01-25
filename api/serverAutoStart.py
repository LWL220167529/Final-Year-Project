import subprocess
import time

while True:
    
    # Restart command
    command = "pm2 restart api"

    # Delay for 1 hour (3600 seconds)
    delay = 3600

    # Sleep for the specified delay
    time.sleep(delay)

    # Restart the server
    subprocess.run(command, shell=True)
