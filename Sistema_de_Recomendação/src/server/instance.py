from flask import Flask
from src.server.conect_db import conect

class Server():
    def __init__(self, ):
        self.app = Flask(__name__)

    def run(self, ):
        self.app.run(
            debug=True
        )

server = Server()