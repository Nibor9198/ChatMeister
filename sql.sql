create database ChatMeister;
use ChatMeister;
create table User(
	ID integer not null auto_increment primary key,
	Username varchar(50),
	Password varchar(255),
	DisplayName varchar(50)
);
create table FriendList(
	UID1 integer not null,
	UID2 integer not null,
    FOREIGN KEY (UID1) REFERENCES User(ID),
    FOREIGN KEY (UID2) REFERENCES User(ID)
);
create table Chat(
	ID integer not null auto_increment primary key,
    Name varchar(50),
    isPublic boolean,
    Ownerid integer not null,
    Number integer default 0,
    FOREIGN KEY (Ownerid) REFERENCES User(ID)
);

create table MemberOf(
	UID1 integer not null,
	Chatid integer not null,
    FOREIGN KEY (UID1) REFERENCES User(ID),
    FOREIGN KEY (Chatid) REFERENCES Chat(ID)
);
create table Invited(
	UID1 integer not null,
	UID2 integer not null,
    Chatid integer not null,
    CDate timestamp not null default now(),
    ExDate timestamp not null default now(),
    FOREIGN KEY (UID1) REFERENCES User(ID),
    FOREIGN KEY (UID2) REFERENCES User(ID),
    FOREIGN KEY (Chatid) REFERENCES Chat(ID)
);
create table Message(
    MID integer not null auto_increment primary key,
    text varchar(255),
    CDate timestamp not null default now(),
    UID integer not null,
    Chatid integer not null,
    FOREIGN KEY (UID) REFERENCES User(ID),
    FOREIGN KEY (Chatid) REFERENCES Chat(ID)
);
-- Funkar inte
create trigger message_count
ON chatmeister.message
AFTER INSERT AS
BEGIN
UPDATE chat set number = (number + 1) where ID = (Select Chatid from message order by mid desc limit 1 )
END;
