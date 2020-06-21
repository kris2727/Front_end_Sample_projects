
drop table Posts;

CREATE TABLE Posts (
   ENTRY_ID INTEGER PRIMARY KEY,
   ENTRY_NAME TEXT NOT NULL,
   ENTRY_TEXT TEXT NOT NULL
);

insert into Posts values(1,"Atlanta Post", "I Went to Atlanta to have fun.");
insert into Posts values(2,"Raleigh Post", "I Went to Raleigh to have fun.");
insert into Posts values(3,"Asheville", "I Went to Asheville to have fun.");
insert INTO Posts (ENTRY_NAME,ENTRY_TEXT) values ("Savannah Trip","We went to Savannah.");

drop table if exists Users;

CREATE TABLE Users(
   USER_ID INTEGER PRIMARY KEY,
   USER_NAME TEXT NOT NULL,
   USER_EMAIL TEXT NOT NULL,
   USER_PASSWORD TEXT NOT NULL
);


insert INTO Users(USER_NAME,USER_EMAIL,USER_PASSWORD) values ("John123","John@gmail.com","abcxyz");
insert INTO Users(USER_NAME,USER_EMAIL,USER_PASSWORD) values ("Joanie2","apple@Amail.com","pass");
insert INTO Users(USER_NAME,USER_EMAIL,USER_PASSWORD) values ("jumanji","Mango@yahoo.com","helpworld");
insert INTO Users(USER_NAME,USER_EMAIL,USER_PASSWORD) values ("Puppylove","dogcat@tamil.com","123456");