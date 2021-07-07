DROP DATABASE IF EXISTS P5;
CREATE DATABASE P5;

USE P5;

CREATE TABLE sports (
sport_id INT AUTO_INCREMENT NOT NULL,
type VARCHAR(255),
description VARCHAR(255),
photo VARCHAR(255),
video VARCHAR(255),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (sport_id)
);





CREATE TABLE roles (
role_id INT AUTO_INCREMENT NOT NULL,
role VARCHAR(255) NOT NULL,
PRIMARY KEY (role_id)
);

CREATE TABLE users (
user_id INT AUTO_INCREMENT NOT NULL,
firstName VARCHAR(255),
lastName VARCHAR(255),
image VARCHAR(255),
phone VARCHAR(255),
age INT(3),
rate INT(3),
email VARCHAR(255),
password VARCHAR(255),
sport_id INT,
FOREIGN KEY (sport_id) REFERENCES sports(sport_id),
role_id INT,
FOREIGN KEY (role_id) REFERENCES roles(role_id),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (user_id)
);

CREATE TABLE posts(
post_id INT AUTO_INCREMENT NOT NULL,
post VARCHAR(255),
photo VARCHAR(255),
video VARCHAR(255),
sport_id INT,
FOREIGN KEY (sport_id) REFERENCES sports(sport_id),
poster_id INT,
FOREIGN KEY (poster_id) REFERENCES users(user_id),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (post_id)
);

CREATE TABLE users_sports (
user_id INT NOT NULL,
sport_id INT NOT NULL,
is_deleted TINYINT DEFAULT 0,
FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (sport_id) REFERENCES sports (sport_id) ON DELETE RESTRICT ON UPDATE CASCADE,
PRIMARY KEY (user_id, sport_id)
);


CREATE TABLE users_posts (
user_id INT NOT NULL,
post_id INT NOT NULL,
is_deleted TINYINT DEFAULT 0,
FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (post_id) REFERENCES posts (post_id) ON DELETE RESTRICT ON UPDATE CASCADE,
PRIMARY KEY (user_id, post_id)
);

CREATE TABLE comments(
comment_id INT AUTO_INCREMENT NOT NULL,
comment VARCHAR(255),
post_id INT,
FOREIGN KEY (post_id) REFERENCES posts(post_id),
commenter_id INT,
FOREIGN KEY (commenter_id) REFERENCES users(user_id),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (comment_id)
);

CREATE TABLE images(
image_id INT AUTO_INCREMENT NOT NULL,
image VARCHAR(255),
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(user_id),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (image_id)
);



