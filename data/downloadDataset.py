import os
import sys
from zipfile import ZipFile

absolute_path = os.path.abspath(__file__)

firstArg = sys.argv[1]
secondArg = sys.argv[2]


if(os.path.exists(secondArg)):
    os.remove(secondArg)

os.system(f"kaggle datasets download -d {firstArg}")

indexOfLastSlash = firstArg.rfind("/")

file_name = (f"{firstArg[indexOfLastSlash+1:]}.zip")

with ZipFile(file_name, 'r') as zip:
    zip.extractall()
    os.rename(zip.namelist()[0], secondArg)
    os.remove(file_name)