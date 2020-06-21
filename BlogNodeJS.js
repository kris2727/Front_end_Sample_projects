var express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'ejs');
const sqlite3 = require('sqlite3').verbose();
app.use(express.static(__dirname));
app.listen(9000);
//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const axios = require('axios').default;

console.log("hello2");

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