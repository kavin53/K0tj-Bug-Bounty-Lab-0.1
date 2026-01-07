create database bugbounty_lab;
use bugbounty_lab;

create table users(
    id int auto_increment primary key,
    username varchar(50),
    password varchar(50)
);

create table labs(
    id int auto_increment primary key,
    title varchar(100),
    level varchar(20),
    description text        
);

Alter table users(
    add reset_token varchar(255),
    add reset_expires Bigint;
);

INSERT INTO users (username, password)
VALUES ('admin', 'admin123');

INSERT INTO labs (title, level, description)
VALUES
('SQL Injection', 'Beginner', 'Basic login SQLi'),
('Stored XSS', 'Pro', 'Stored cross-site scripting'),
('IDOR', 'Elite', 'Insecure direct object reference');