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
