create database project_management;

create table Users(user_id int,username varchar(30),password varchar(30));
create table Projects(id int, project_name varchar(50), reason varchar(50), type varchar(50), division varchar(50), category varchar(50),priority varchar(20), department varchar(50), start_date datetime, end_date datetime,location varchar(50),status varchar(50));

insert into users values(1,"ankitmeshram56","ankit@123");