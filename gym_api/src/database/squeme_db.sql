CREATE DATABASE ironFitness;
USE ironFitness;

CREATE TABLE users (
    userId INT(5)  AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(10) NOT NULL,
    password VARCHAR(10) NOT NULL
);

CREATE TABLE customers (
    customerId INT(11) AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(11) NOT NULL,
    names VARCHAR(30) NOT NULL,
    lastnames VARCHAR(30) NOT NULL,
    fullname VARCHAR(90) NOT NULL,
    startDate VARCHAR(20) NOT NULL,
    endingDate VARCHAR(20) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    -- duration VARCHAR(4) NOT NULL, 
    amount INT(10) NOT NULL,
    photo VARCHAR(50)
) AUTO_INCREMENT = 1;


CREATE TABLE price (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    currentPrice INT(10) NOT NULL
)


