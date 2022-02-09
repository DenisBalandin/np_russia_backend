'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const pool = mysql.createPool({
  host     : '173.255.215.124',
  user     : 'nprussia_admin',
  password : '229582513q',
  database : 'nprussia_main'
});


const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

app.get('/user-list', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.jsffff!</h1>');
  res.end();
});

app.get("/example",(req,res) => {
  pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * from np_news', (err, rows) => {
          connection.release(); // return the connection to pool
          if(err) throw err;
          res.send({ data: rows });
          console.log('The data from users table are: \n', rows);
      });
  });
});




app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);