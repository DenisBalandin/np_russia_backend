const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
const pool = mysql.createPool({
  host: "173.255.215.124",
  user: "nprussia_admin",
  password: "229582513q",
  database: "nprussia_main",
});

const PORT = process.env.PORT || 8000;

app.get("/backend/test", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js 555!</h1>");
  res.end();
});

app.get("/backend/news", (req, res) => {
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
app.get("/backend/blog", (req, res) => {
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
app.get("/backend/post/:link", (req, res) => {
  const { link } = req.params;
  console.log(link);
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT * FROM np_blog WHERE link="${link}"`,
      (err, response) => {
        connection.release(); // return the connection to pool
        if (err) throw err;
        res.send({ data: response[0] });
      }
    );
  });
});
app.get("/backend/news/:link", (req, res) => {
  const { link } = req.params;
  console.log(link);
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT * FROM np_news WHERE link="${link}"`,
      (err, response) => {
        connection.release(); // return the connection to pool
        if (err) throw err;
        res.send({ data: response[0] });
      }
    );
  });
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
