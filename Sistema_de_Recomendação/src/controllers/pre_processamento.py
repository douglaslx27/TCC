import numpy as np
import pandas as pd
import nltk
import math
from sklearn.model_selection import train_test_split
import mysql.connector
from src.server.conect_db import conect
con = conect.con

class Pre_processamento_textos():
    def prepara_corpus():

        #----BUSCANDO PERGUNTAS E RESPOSTAS E GERNDO DATA FRAME-----
        consulta1 = """select pe.conteudo,res.conteudo,res.email_usuario 
                    from perguntas as pe join respostas as res 
                    where res.id_pergunta = pe.id"""

        cursor = con.cursor()
        cursor.execute(consulta1)
        corpus = cursor.fetchall()
        corpus_df = pd.DataFrame(corpus,columns=['Perguntas','Respostas','Usuarios'])
        corpus_df.info()

        #----BUSCANDO ULTIMA PERGUNTA CADASTRADA--------
        consulta2 = "select conteudo from perguntas order by id desc limit 1;"
        cursor.execute(consulta2)
        ultimaPergunta = cursor.fetchone()
        ultimaPergunta=pd.DataFrame(ultimaPergunta,columns=['conteudo'])

        #GERANDO OS CORPUS PARA O PRE-PROCESSAMENTO

        corpusPerguntas = corpus_df['Perguntas']

        corpusRespostas = corpus_df['Respostas']

        saidasUsuarios = corpus_df['Usuarios']

        corpusPerguntas = corpusPerguntas.append(ultimaPergunta['conteudo'], ignore_index=True)

        return(corpusPerguntas,corpusRespostas,saidasUsuarios)

    ##REMOVENDO CARACTERES ESPECIAIS
    def remove_especiais(doc,especiais):
        newDoc = str()
        
        doc = doc.replace("\n", "")
        doc = doc.replace("\t", "")
        doc = doc.replace("\xa0", "")
        doc = doc.strip()
                
        for termo in doc:
            if termo not in especiais:
                newDoc = newDoc + termo
                
        return newDoc

    #REMOVENDO STOP WORDS
    def remove_termos(docs,termos):
        newDocs = []
        
        for doc in docs:
            newTermos = []
            for item in doc:
                if item not in termos:
                    newTermos.append(item)
            
            newDocs.append(newTermos)
            
        return newDocs
    
    #TRANSFORMANDO TUDAS AS PALAVRAS EM MINUSCULAS
    def tranforma_minusculas(docs):
        newDocs = []
        for doc in docs:
            newDocs.append(np.char.lower(doc))
            
        return newDocs

    #CRIANDO BAG OF WORDS
    def cria_bagOfWords(docs):
        bowTextos = []
        cont = 0
        for doc in docs:
            bowTextos.append(doc.split(' '))
            cont+=len(doc)
            
        return bowTextos,cont

    def cria_bagOfWords_geral(docs):
        bowCorpus = docs[0]
        for i in range(len(docs)-1):
            bowCorpus = set(bowCorpus).union(set(docs[i+1]))
            
        return bowCorpus

    #PRE-PROCESSAMENTO
    def pre_processamento(docs):
        stopWords = nltk.corpus.stopwords.words('portuguese')
        especiais = ['!','@','#','$','%','&','*','(',')','_','-','--','+','=',',','.','´','`',
                    ':',':','?','^','~','...','/','\\','"','>','<','\t','..','']
        newDocs = []
        
        for doc in docs:
            newDocs.append(Pre_processamento_textos.remove_especiais(doc,especiais))
            
        bow,cont = Pre_processamento_textos.cria_bagOfWords(newDocs)
        cor = Pre_processamento_textos.tranforma_minusculas(bow)
        corpu = Pre_processamento_textos.remove_termos(cor, stopWords)
        bowCorpus = Pre_processamento_textos.cria_bagOfWords_geral(corpu)
        
        
        return bowCorpus, cont, corpu

    #REALIZANDO PŔE-PROCESSAMENTO
    def resultado_pre_processamento(self):
        nltk.download('stopwords')
        corpusPerguntas, corpusRespostas, saidasUsuarios = Pre_processamento_textos.prepara_corpus()
        bowPerguntas, contPerguntas, corpPerguntas = Pre_processamento_textos.pre_processamento(corpusPerguntas)
        bowRespostas, contRespostas, corpRespostas = Pre_processamento_textos.pre_processamento(corpusRespostas)
        return(corpPerguntas,bowPerguntas,corpRespostas,bowRespostas,saidasUsuarios)

pre_processamento = Pre_processamento_textos()

