import numpy as np
import pandas as pd
import nltk
import math
from sklearn.model_selection import train_test_split

class Tf_idf():
    #CALCULANDO TF
    def calcula_tf(doc,bow):
        tf = dict.fromkeys(bow, 0)
        n = len(doc)
        
        for termo in doc:
            tf[termo] += 1
            
        for termo, qtd in tf.items():
            tf[termo] = qtd/float(n)
            
        return tf
    #CALCULANDO IDF
    def calcula_idf(tfs,bow):
        n = len(tfs)
        idf = dict.fromkeys(bow, 0)
        
        for doc in tfs:
            for termo, qtd in doc.items():
                if qtd > 0:
                    idf[termo] += 1
                    
        for termo, qtd in idf.items():
            idf[termo] = np.log(float(n)/qtd)
            
        return idf

        #CALCULANDO TF-IDF
    def calcula_tf_idf(tfs,idfs):
        tfidf = dict.fromkeys(tfs, 0)
        
        for termo, qtd in tfs.items():
            tfidf[termo] = qtd*idfs[termo]
                
        return tfidf

         #DESENVOLVENDO CALCULO TF-IDF
    def resultado_tf_idf(self,corpDados,dados):
       

        tfDados = []

        #TF
        for doc in corpDados:
            if(not doc):
                dadosList = [dados]
                doc = dadosList[0]
                
            tfDados.append(Tf_idf.calcula_tf(doc,dados))
            
        #IDF    
        idfDados = Tf_idf.calcula_idf(tfDados,dados)


        #TF_IDF
        tf_idfDados = []
        for doc in tfDados:
            tf_idfDados.append(Tf_idf.calcula_tf_idf(doc, idfDados))

        dados_df = pd.DataFrame(tf_idfDados)
        return(dados_df)

tf_idf = Tf_idf()
    