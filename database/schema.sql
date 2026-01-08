create database bugbounty_lab;
use bugbounty_lab;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),

  reset_token VARCHAR(100),
  reset_expires BIGINT,

  session_token VARCHAR(100)
);


create table labs(
    id int auto_increment primary key,
    title varchar(100),
    level varchar(20),
    description text        
);




INSERT INTO users ( email, password) VALUES ('kavindu@mail.com','admin123');

INSERT INTO labs (title, level, description)
VALUES
('SQL Injection', 'Beginner', 'Basic login SQLi'),
('Stored XSS', 'Pro', 'Stored cross-site scripting'),
('IDOR', 'Elite', 'Insecure direct object reference');