import numpy as np
import pandas as pd
import nltk
import math
from sklearn.model_selection import train_test_split

class Recomendacao():
    #FUNÇÃO DE DIDTANCIA
    def euclidiana(a, b):
        l = len(a)
        return np.sqrt(np.sum([(a[i] - b[i])**2 for i in range(l)]))

    def sim_cosseno(a,b):
        l = len(a)
        p = np.sum([a[i]*b[i] for i in range(l)])
        ca = np.sqrt(np.sum([a[i]**2+0.1 for i in range(l)])) 
        cb = np.sqrt(np.sum([b[i]**2+0.1 for i in range(l)]))
        
        return p/(ca*cb)

    #MAIS FREQUENTE
    def mais_frequente(y):
        return max(set(y), key=y.count)

    #CLASSIFICA PERGUNTA MAIS PARECIDA COM A NOVA PERGUNTA CADASTRADA E
    #PEGA O INDICE DESSA PERGUNTA Q É O INDICE DA RESPOSTA
    def knn_perguntas(alvo,k,X):
        distancias = [Recomendacao.sim_cosseno(alvo,x) for x in X]
        vizinhos = sorted(distancias, reverse=True)[:k]
        indices = [distancias.index(i) for i in vizinhos]
        return indices

    #CLASSIFICA RESPOSTAS MAIS PARECIDAS COM A REPOSTA DA PERGUNTA MAIS PARECIDA E
    #RETORNA O USUARIO QUE FOI CLASSIFICADO COMO MAIS APTO
    def knn_respostas(alvo,k,Xrespostas,Yusuarios):
        distancias = [Recomendacao.sim_cosseno(alvo,x) for x in Xrespostas]
        vizinhos = sorted(distancias, reverse=True)[:k]
        indices = [distancias.index(i) for i in vizinhos]
        return Recomendacao.mais_frequente([Yusuarios[i] for i in indices])

    def resultado_recomendacao(self,dfPerguntas,dfRespostas,saidasUsuarios,novaPergunta):
        perguntas = dfPerguntas.values
        respostas = dfRespostas.values
        usuarios = saidasUsuarios.values
        nova_pergunta = novaPergunta.values

        indiceResposta = Recomendacao.knn_perguntas(nova_pergunta,1,perguntas)
        res = respostas[indiceResposta]
        user = Recomendacao.knn_respostas(res,3,respostas,usuarios)

        return(user)

recomenda = Recomendacao()

    