 This is the initial README file for the course project.

 Steps needed to run this Node JS app

 1. Install nodejs in your system. Use Visual studio.

 2. once nodejs is installed, copy all the project files in to a folder.
 
 3. run initailizing nodejs commands such as a. npm install b. npm init etc.,

 4. Once you made sure nodejs is initialised, run the command "node BlogNodeJS"

 5. this will start the application with listening port as 9000

 6. the file database is already created - "blog.db". NBAD.sql file is used to create the tables and insert sample data.

 7. make sure blod.db is also copied into the same folder.

 8. hit the application in browser by the URL - http://localhost:9000


// Mile stone 6 update:

End points for user management APIs:

1. Add new user
    POST - http://localhost:9000/api/rest/v1/user?userName=cartoon225&userEmail=CN@gmail.com22255&password=funfun22
    
2. List all users
    GET - http://localhost:9000/api/rest/v1/user

3. Fetch individual user profile
    GET - http://localhost:9000/api/rest/v1/user/2

4. Delete user profile
    DELETE - http://localhost:9000/api/rest/v1/user/3    

5. Update user profile
    POST - http://localhost:9000/api/rest/v1/user/1?userName=Taylortt99&userEmail=markT@home.com99&password=donttell7779 