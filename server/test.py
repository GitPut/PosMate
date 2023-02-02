import serial

ser = serial.Serial('USB001')
ser.write(b'\x1B\x40Hello, World!\n')
ser.close()

# import usb.core
# import usb.util

# # find our device
# dev = usb.core.find(idVendor=4070, idProduct=33054)

# # was it found?
# if dev is None:
#     raise ValueError('Device not found')

# # set the active configuration. With no arguments, the first
# # configuration will be the active one
# dev.set_configuration()

# # get an endpoint instance
# cfg = dev.get_active_configuration()
# intf = cfg[(0,0)]

# ep = usb.util.find_descriptor(
#     intf,
#     # match the first OUT endpoint
#     custom_match = \
#     lambda e: \
#         usb.util.endpoint_direction(e.bEndpointAddress) == \
#         usb.util.ENDPOINT_OUT)

# assert ep is not None

# # write the data
# ep.write('test')

# # USB\VID_0FE6&PID_811E&REV_0010


# import usb.core
# import usb.util


# # Find the device
# dev = usb.core.find(idVendor=4070, idProduct=33054)

# if dev is None:
#     print("Printer not found")
# else:
#     # Set the printer as the active configuration
#     dev.set_configuration()

#     # Send data to the printer
#     endpoint = dev[0][(0,0)][0]
#     dev.write(endpoint.bEndpointAddress, b'Hello, USB Printer!\n')

#     # Read data from the printer
#     data = dev.read(endpoint.bEndpointAddress, endpoint.wMaxPacketSize)

#     print(data.decode())


# # Check if the device was found
# if dev is None:
#     raise ValueError('Device not found')
# print('found')
# # # Use the first endpoint to communicate with the device
# # if dev.is_kernel_driver_active(0):
# #     dev.detach_kernel_driver(0)

# # endpoint = dev[0][(0,0)][0]

# # Write data to the device
# dev.write(endpoint.bEndpointAddress, b'Hello USB!')

# # Read data from the device
# data = dev.read(endpoint.bEndpointAddress, endpoint.wMaxPacketSize)

# print(data.tobytes().decode())