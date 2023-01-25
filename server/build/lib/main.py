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

username = os.getlogin()

currentLocation = os.getcwd()

path = os.path.join('C:\\Users\\'+ username +'\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup', 'PosMate.lnk')
target = currentLocation + "\\main.exe"
icon = currentLocation + "\\main.exe"
shell = win32com.client.Dispatch("WScript.Shell")
shortcut = shell.CreateShortCut(path)
shortcut.Targetpath = target
shortcut.IconLocation = icon
shortcut.save()

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