const express = require('express')
const mysql = require('mysql');
const app = express()
const port = process.env.PORT
var cors = require("cors");

var localConnStr = {
    host: "localhost",
    user: "root",
    port: "8889",
    password: "root",
    database: "faceafeka"
};

var realConnStr = {
    host: "us-cdbr-east-02.cleardb.com",
    user: "b1bee8946f0524",
    password: "bdd81574",
    database: "heroku_01d7bd2902d3fbf"
};

app.use(cors());

app.get('/ended/:id', (req, res) => {
    let id = req.params.id;

    var con = mysql.createConnection(realConnStr);
    con.connect(function(err) {
        if (err) {
            return res.status(400).json({
                status: 'error',
                error: err.message,
                });
        }
        con.query("UPDATE game_requests SET ended = 1 WHERE Id = " + id, function (err, result, fields) {
            if (err) {
            return res.status(400).json({
                status: 'error',
                error: err.message,
                });
            }
            result = JSON.stringify(result);
            console.log(result);
            res.status(200).send({
                status: 'success',
                message: result
                });
            con.end();
        });
    });
});

app.get('/:username', (req, res) => {
    let username = req.params.username;

    var con = mysql.createConnection(realConnStr);
    con.connect(function(err) {
        if (err) {
            return res.status(400).json({
                status: 'error',
                error: err.message,
              });
        }
        con.query("SELECT * FROM game_requests WHERE player1_username = '" + username + "' AND ended = 0 LIMIT 1", function (err, result, fields) {
          if (err) {
            return res.status(400).json({
                status: 'error',
                error: err.message,
              });
          }
          result = JSON.stringify(result);
          console.log(result);
          res.status(200).send(result);
          con.end();
        });
      });
});

app.get('/', (req, res) => res.send("Hello Memory Game Server!"));

app.listen(port, () => console.log(`Memory Game Server listening on port ${port}!`));