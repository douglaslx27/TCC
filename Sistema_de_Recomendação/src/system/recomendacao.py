from flask import Flask
from flask import jsonify
from src.server.conect_db import conect
from src.server.instance import server
from src.controllers.pre_processamento import pre_processamento
from src.controllers.tf_idf import tf_idf
from src.controllers.aprendizado import recomenda
import pandas as pd

app = server.app
pre_processamento = pre_processamento
tf_idf = tf_idf
recomenda = recomenda

corpPerguntas,bowPerguntas,corpRespostas,bowRespostas,saidasUsuarios = pre_processamento.resultado_pre_processamento()
dfPerguntas = tf_idf.resultado_tf_idf(corpPerguntas,bowPerguntas)
dfRespostas = tf_idf.resultado_tf_idf(corpRespostas,bowRespostas)

#print(len(dfPerguntas))
t = len(dfPerguntas)
novaPergunta = dfPerguntas.iloc[t-1]
#print(novaPergunta)

dfPerguntas = dfPerguntas.drop(t-1)
#print(len(dfPerguntas))
#print(len(dfRespostas))
emailUsuario = recomenda.resultado_recomendacao(dfPerguntas, dfRespostas, saidasUsuarios, novaPergunta)
recomendacao = {'email':emailUsuario}

class Recomendacao():
    @app.route('/recomendacao',methods=['GET'])
    def recomenda():        
        return(jsonify(recomendacao))
