from flask import Flask, jsonify, request
from flask_cors import CORS
from win32 import win32gui
import win32ui, win32con, win32api
import sys
import configparser
import logging
from LoggerWriter import LoggerWriter
from pathlib import Path
from logging.handlers import TimedRotatingFileHandler
from threading import Timer
import shutil
import os
import win32com.client
import serial
import sys
import shutil
import sysconfig
import winreg
from win32com.client import Dispatch

def get_reg(name,path):
    # Read variable from Windows Registry
    # From http://stackoverflow.com/a/35286642
    try:
        registry_key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, path, 0,
                                       winreg.KEY_READ)
        value, regtype = winreg.QueryValueEx(registry_key, name)
        winreg.CloseKey(registry_key)
        return value
    except WindowsError:
        return None


# Read location of Windows desktop folder from registry
regName = 'Desktop'
regPath = r'Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders'

desktopFolder = os.path.normpath(get_reg(regName,regPath))

username = os.getlogin()

currentLocation = os.getcwd()

path = os.path.join('C:\\Users\\'+ username +'\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup', 'PosMate.lnk')

if os.path.isfile(path) == False :
    # Define the MSI package name
    msi_name = desktopFolder + '\\PosMate.lnk'

    # Define the startup folder path
    startup_folder = 'C:\\Users\\'+ username +'\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup'

    # Copy the MSI package to the startup folder shutil.copy(msi_name, startup_folder)
    shutil.copy(msi_name, startup_folder)

Path("log").mkdir(parents=True, exist_ok=True)
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
handler = TimedRotatingFileHandler('log/error.log', when="midnight", 
interval=1, encoding='utf8')
handler.suffix = "%Y-%m-%d"
handler.setFormatter(formatter)
logger = logging.getLogger()
logger.setLevel(logging.ERROR)
logger.addHandler(handler)
sys.stdout = LoggerWriter(logging.debug)
sys.stderr = LoggerWriter(logging.warning)

app = Flask(__name__)
CORS(app)

# ser = serial.Serial('COM4')


@app.route('/print', methods=['POST'])
def print():
    data = request.get_json()
    ser = serial.Serial('COM4')
    for line in data:
        # ser.write(b'\x1B\x40Hello, World!\n')
        ser.write(str.encode(line))
    ser.close()

    response = jsonify({'message': 'Print Complete'})
    return response


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)