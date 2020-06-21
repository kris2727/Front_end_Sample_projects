
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
