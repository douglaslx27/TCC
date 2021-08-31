export interface PerguntasProps {
    id: number;
    email_usuario: string;
    conteudo: string;
    datapost: string;
};

export interface UsuariosProps {
    nome: string;
    sexo: string;
    email: string;
}

export interface RespostasProps {
    id: number;
    email_usuario: string;
    id_pergunta: number;
    conteudo: string;
    datapost: string;
}