"use strict";

const express = require("express");
const config = require("../config.json");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
const pool = mysql.createPool(config);
const router = express.Router();

router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js!</h1>");
  res.end();
});

app.get("/user-list", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.jsffff!</h1>");
  res.end();
});
app.get("/news", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT * FROM np_news ORDER BY date DESC",
      (err, response) => {
        connection.release(); // return the connection to pool
        if (err) throw err;
        res.send(response);
      }
    );
  });
});
app.get("/blog", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT * FROM np_blog ORDER BY date DESC",
      (err, response) => {
        connection.release(); // return the connection to pool
        if (err) throw err;
        res.send(response);
      }
    );
  });
});

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
