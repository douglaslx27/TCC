create database care_child;

use care_child;

create table usuarios(
	nome varchar(45) not null,
    sexo char(1) not null,
    email varchar(45),
    primary key (email)
)default charset = utf8;

create table perguntas(
	id int auto_increment,
	email_usuario varchar(45) not null,
	conteudo text,
	datapost datetime,
	primary key (id),
	foreign key (email_usuario) references usuarios(email)
)default charset = utf8;

create table respostas(
	id int auto_increment,
	email_usuario varchar(45) not null,
    id_pergunta int,
	conteudo text,
	datapost datetime,
	primary key (id),
	foreign key (email_usuario) references usuarios(email),
    foreign key (id_pergunta) references perguntas(id)
)default charset = utf8;