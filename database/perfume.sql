drop database perfume;
create database perfume;
use perfume;
 create table `roles`(
 id_role int auto_increment primary key,
`name` varchar(255)
);
create table `account`(
id_account int auto_increment primary key,
`name` varchar(255),
encrypt_password varchar(255),
phone_number varchar(255),
email varchar(255),
address varchar(255),
username_account varchar(255)
);
create table account_role(
account_id int,
role_id int,
foreign key(account_id) references `account`(id_account),
  foreign key(role_id) references `roles`(id_role)
);
create table customer(
id_customer int auto_increment primary key,
address varchar(255),
email varchar(255),
`name` varchar(255),
phone_number varchar(255),
account_id_account int,
foreign key(account_id_account) references `account`(id_account)
);
create table `admin`(
id_customer int auto_increment primary key,
address varchar(255),
email varchar(255),
`name` varchar(255),
phone_number varchar(255),
account_id_account int,
foreign key(account_id_account) references `account`(id_account)
);
 create table category(
 id_category int auto_increment primary key,
`name` varchar(255)
);
 create table trademark(
 id_trademark int auto_increment primary key,
`name` varchar(255)
); 
create table concentration(
 id_concentration int auto_increment primary key,
`name` varchar(255)
);
create table fragrant(
 id_fragrant int auto_increment primary key,
`name` varchar(255)
);
create table orders(
id_order int auto_increment primary key,
amount int,
order_date date,
`status` bit(1),
customer_id int,
foreign key(customer_id) references customer(id_customer)
);
create table cart(
id_cart int auto_increment primary key,
quantity int,
`status` varchar(255),
customer_id int,
create_date date,
update_date date,
flag_payment bit(1),
foreign key(customer_id) references customer(id_customer)
);
create table perfume(
id_perfume int auto_increment primary key,
`name` varchar(255),
price double,
`description` text,
quantity int,
category_id int,
trademark_id int,
concentration_id int,
fragrant_id int,
order_id int,
`code` varchar(255),
foreign key(category_id) references category(id_category),
foreign key(trademark_id) references trademark(id_trademark),
foreign key(concentration_id) references concentration(id_concentration),
foreign key(fragrant_id) references fragrant(id_fragrant),
foreign key(order_id) references orders(id_order)
);
create table image(
id_image int auto_increment primary key,
url varchar(255),
perfume_id int,
foreign key(perfume_id) references perfume(id_perfume)
);
create table cart_perfume(
id_cart_perfume  int primary key,
id_perfume int,
id_cart int,
quantity int,
flag_payment bit(1),
flag_delete bit(1),
foreign key(id_cart) references cart(id_cart),
foreign key(id_perfume) references perfume(id_perfume)
);