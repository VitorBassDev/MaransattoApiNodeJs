create database if not exists ecommerce
default character set utf8
default collate utf8_general_ci;
use ecommerce;

create table if not exists produtos (
	id_produto int (2) primary key auto_increment,
	nome varchar (255) not null,
	preco float not null
    );

create table if not exists pedidos (
	id_pedido int (2) primary key auto_increment,
    produto_id_produto int (2),
    quantidade smallint not null
);

alter table pedidos
	add constraint pk_pedido_produto
    foreign key (produto_id_produto)
    references produtos(id_produto);

insert into produtos (nome, preco)
	values
		('Teste', 20.00);
        
select * from produtos where id_produto = 1;
    