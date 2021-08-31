from flask import Flask
from src.server.conect_db import conect
from src.server.instance import server
from src.system.recomendacao import *


server.run()