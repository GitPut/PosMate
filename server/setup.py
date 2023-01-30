import sys
from cx_Freeze import setup, Executable
import shutil

# USE THIS TO BUILD INSTALLER python setup.py bdist_msi

company_name = "Micton"
product_name = "DivinePos"

bdist_msi_options = {
"upgrade_code": "{48B079F4-B598-438D-A62A-8A233A3F8901}",
"add_to_path": False,
"initial_target_dir": r'[ProgramFilesFolder]\%s\%s' % (company_name, product_name)
}

build_exe_options = {
"includes": ["jinja2", "jinja2.ext"],
"excludes": ["Tkinker"]
}

# GUI applications require a different base on Windows
base = None
if sys.platform == "win32":
    base = "Win32GUI"

exe = Executable(script="main.py",
base=base,
shortcut_name="DivinePos",
shortcut_dir="DesktopFolder"
)

# # Define the MSI package name
# msi_name = 'C:\\Users\\%USERNAME%\\AppData\\Local\\Programs\\My Company Name\\DivinePos\\main.exe'

# # Define the startup folder path
# startup_folder = 'C:\\Users\\%USERNAME%\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup'

setup(name=product_name,
version="1.0.0",
description="DivinePos Service Worker",
executables=[exe],
options={"bdist_msi": bdist_msi_options,
"build_exe": build_exe_options})

# # Copy the MSI package to the startup folder shutil.copy(msi_name, startup_folder)
# shutil.copy(msi_name, startup_folder)