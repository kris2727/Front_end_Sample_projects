var express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'ejs');
const sqlite3 = require('sqlite3').verbose();
app.use(express.static(__dirname));
app.listen(9000);
//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const axios = require('axios').default;

console.log("Server started - port number 9000");

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});



app.get('/post/:postID', (req, res) => {
    // open the database
    let db = new sqlite3.Database('./blog.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the BLOG database.');
    });

    db.get(`SELECT ENTRY_ID as id,
                ENTRY_NAME as post,
                ENTRY_TEXT as post_text
           FROM Posts where ENTRY_ID= ?`, [req.params.postID], (err, row) => {
        if (err) {
            console.error(err.message);
        }
        else {
            res.render('post', { postName: row.post, postText: row.post_text });
        }
        //console.log(row.id + "\t" + row.post + "\t" + row.post_text);
    });



    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });

});

app.post('/post', (req, res) => {

    console.log(" i am inside postpost of node js");
    console.log("params" + req.body.postHEAD + "----" + req.body.postSECTION);


    let db = new sqlite3.Database('./blog.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the BLOG database.');
    });

    db.run(`insert INTO Posts (ENTRY_NAME,ENTRY_TEXT) values ( ?, ?)`, [req.body.postHEAD, req.body.postSECTION], (err, row) => {
        if (err) {
            console.error(err.message);
        }
        else {
            console.log("insert happened buddy");
            res.send(err);
        }
        //console.log(row.id + "\t" + row.post + "\t" + row.post_text);
    });


    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});

app.get('/admin/posts', (req, res) => {

    console.log(" i am inside admin list posts");

    let db = new sqlite3.Database('./blog.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the BLOG database.');
    });

    db.all(`SELECT ENTRY_ID as id, ENTRY_NAME as post, ENTRY_TEXT as post_text FROM Posts`, (err, rs) => {

        if (err) {
            console.log(err);
        } else {
            res.render('list_posts', { data: rs });
        }
        //console.log(rs);
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});

app.get('/updatePost/:postID', (req, res) => {
    // open the database
    let db = new sqlite3.Database('./blog.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the BLOG database.');
    });

    db.get(`SELECT ENTRY_ID as id,
                ENTRY_NAME as post,
                ENTRY_TEXT as post_text
           FROM Posts where ENTRY_ID= ?`, [req.params.postID], (err, row) => {
        if (err) {
            console.error(err.message);
        }
        else {
            res.render('update_post', { postID: row.id, postName: row.post, postText: row.post_text });
        }
        //console.log(row.id + "\t" + row.post + "\t" + row.post_text);
    });



    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });

});

app.post('/updatePost', (req, res) => {

    console.log("update params" + req.body.postHEAD + "----" + req.body.postSECTION + "----" + req.body.id);
    // open the database
    let db = new sqlite3.Database('./blog.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the BLOG database.');
    });

    db.run(`update Posts set ENTRY_NAME = ?,ENTRY_TEXT = ? where ENTRY_ID = ? ;`, [req.body.postHEAD, req.body.postSECTION, req.body.id], (err, row) => {
        if (err) {
            console.error(err.message);
        }
        else {
            console.log("update happened buddy");
            res.send(err);
        }
        //console.log(row.id + "\t" + row.post + "\t" + row.post_text);
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });

});
app.post('/deletePost', (req, res) => {

    console.log("delete params" + req.body.id);
    // open the database
    let db = new sqlite3.Database('./blog.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the BLOG database.');
    });

    db.run(`delete from Posts where ENTRY_ID = ? ;`, [req.body.id], (err, row) => {
        if (err) {
            console.error(err.message);
        }
        else {
            console.log("delete happened buddy");
            res.send(err);
        }
        //console.log(row.id + "\t" + row.post + "\t" + row.post_text);
    });

    db.each(`SELECT ENTRY_ID as id,
        ENTRY_NAME as post,
        ENTRY_TEXT as post_text
        FROM Posts`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row.id + "\t" + row.post + "\t" + row.post_text);
    });


    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });

});

app.get('/api/rest/v1/user', (req, res) => {

    console.log(" i am inside users GET");

    let db = new sqlite3.Database('./blog.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the BLOG database.');
    });

    db.all(`SELECT USER_ID as id, USER_NAME as userName, USER_EMAIL as email, USER_PASSWORD as passkey FROM Users`, (err, rs) => {

        if (err) {
            console.log(err);
        } else {
            // res.render('list_posts', { data: rs });
            //console.log(rs);
            res.send(rs);
        }

    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});

app.get('/api/rest/v1/user/:userID', (req, res) => {

    console.log(" i am inside users GET for ID" + req.params.userID);

    let db = new sqlite3.Database('./blog.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the BLOG database.');
    });


    db.all(`SELECT USER_ID as id, USER_NAME as userName, USER_EMAIL as email, USER_PASSWORD as passkey FROM Users where USER_ID = ?`, [req.params.userID], (err, rs) => {

        if (err) {
            console.log(err);
            res.send(err);
        } else {
            // res.render('list_posts', { data: rs });
            //console.log(rs);
            if(rs[0])
            {
            res.send(rs);
            }
            else{
                res.send("User ID not found in DB");
            }
        }

    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});

app.post('/api/rest/v1/user', (req, res) => {

    console.log(" i am inside USER POST of node js");
    console.log("query params" + req.query.userName + "----" + req.query.userEmail + "----" + req.query.password);



    let db = new sqlite3.Database('./blog.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the BLOG database.');
    });

    db.run(`insert INTO Users (USER_NAME,USER_EMAIL,USER_PASSWORD) values (?, ?, ?)`, [req.query.userName, req.query.userEmail, req.query.password], (err, row) => {
        if (err) {
            console.error(err.message);
            res.send(err);
        }
        else {
            console.log("insert USER happened");
            res.send("User data was inserted into Database");
        }
        //console.log(row.id + "\t" + row.post + "\t" + row.post_text);
    });


    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});

app.delete('/api/rest/v1/user/:userID', (req, res) => {

    console.log(" i am inside users DELETE for ID" + req.params.userID);

    let db = new sqlite3.Database('./blog.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the BLOG database.');
    });


    db.all(`delete from Users where USER_ID = ? ;`, [req.params.userID], (err, rs) => {

        if (err) {
            console.log(err);
            res.send(err);
        } else {
            // res.render('list_posts', { data: rs });
            //console.log(rs);
            //res.send("User got deleted successfully");
        }
        db.all(`select changes() as chgnum;`, (err, rows) => {
            console.log(rows);
            if (rows[0].chgnum == 0) {
                console.log("NO DELETE");
                res.send("User not found in DB");
            } else {
                console.log("YES DELETE");
                res.send("User got deleted successfully");
            }
        });

    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});

app.patch('/api/rest/v1/user/:userID', (req, res) => {

    console.log(" i am inside users UPDATE for ID---" + req.params.userID);
    console.log("query params" + req.query.userName + "----" + req.query.userEmail + "----" + req.query.password);
    let db = new sqlite3.Database('./blog.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the BLOG database.');
    });

    db.run(`update Users set USER_NAME = coalesce(?,USER_NAME) , USER_EMAIL = coalesce(?,USER_EMAIL),  USER_PASSWORD = coalesce(?,USER_PASSWORD) where  USER_ID = ? ;`, [req.query.userName, req.query.userEmail, req.query.password, req.params.userID], (err, rs) => {

        resultObject = {'error':"",'data':""};
        if (err) {
            console.log(err);
            resultObject.error = err;
            resultObject.data = "";
            res.json(resultObject);
        } else {
            console.log("update on DB happended");

            db.all(`select changes() as chgnum;`, (err, rows) => {
                console.log(rows);
                if (rows[0].chgnum == 0) {
                    console.log("NO UPDATE");
                   // resultObject.error = err;
                    resultObject.data = 'NO UPDATE happenned. User not found in DB.';
                    console.log(resultObject);
                    res.json(resultObject);
                } else {
                    console.log("YES UPDATE");
                    resultObject.data = 'User data got UPDATEd.';
                    console.log(resultObject);
                    res.json(resultObject);
                }
            });
        }
        
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});