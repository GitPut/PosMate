# import tkinter as tk


# def on_button_click():
#     label.config(text='Hello, Tkinter!')


# root = tk.Tk()
# root.title('Simple Tkinter GUI')

# label = tk.Label(root, text='Welcome to Tkinter')
# label.pack()

# button = tk.Button(root, text='Click me', command=on_button_click)
# button.pack()

# root.mainloop()

from flask import Flask, jsonify, request
from flask_cors import CORS
# import win32print

import sys
import configparser
import logging
from LoggerWriter import LoggerWriter
from pathlib import Path
from logging.handlers import TimedRotatingFileHandler
from threading import Timer
import shutil
import os

username = os.getlogin()

# Define the MSI package name
msi_name = 'C:\\Users\\' + username + '\\Desktop\\PosMate.lnk'

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


@app.route('/print', methods=['POST'])
def print():
    data = request.get_json()
    # name = data.get('name')
    printData = data.get('printData')

    # commands = printData

    # printer_name = win32print.GetDefaultPrinter()
    # hPrinter = win32print.OpenPrinter(printer_name)
    # try:
    #     hJob = win32print.StartDocPrinter(hPrinter, 1, ("test", None, "RAW"))
    #     win32print.StartPagePrinter(hPrinter)
    #     for command in commands:
    #         win32print.WritePrinter(hPrinter, command)
    #         win32print.EndPagePrinter(hPrinter)
    #         win32print.EndDocPrinter(hPrinter)
    # finally:
    #     win32print.ClosePrinter(hPrinter)

    response = jsonify({'message': 'Length of orders, ' + printData})
    return response


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
