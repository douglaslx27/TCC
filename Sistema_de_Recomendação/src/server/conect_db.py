import mysql.connector

class Conect():
    def __init__(self, ):
        self.con = mysql.connector.connect(
            host='localhost',
            database='care_child',
            user='root',
            password= '123456'
        )
        if self.con.is_connected():
            db_info = self.con.get_server_info()
            print('Conectado ao servidor MySQL',db_info)
            cursor = self.con.cursor()
            cursor.execute('select database();')
            info = cursor.fetchone()
            print('Conectado ao Banco de dados ',info)

conect = Conect()