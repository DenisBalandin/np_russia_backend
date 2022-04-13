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
      // "SELECT wf02_page.id, wf02_page.slug, wf02_page.title, wf02_page.created_on, wf02_page_part.content, wf02_page_part.name from wf02_page INNER JOIN wf02_page_part ON wf02_page.id = wf02_page_part.page_id WHERE wf02_page.parent_id = 11 ",
      "SELECT * FROM np_news ORDER BY date DESC",
      (err, response) => {
        connection.release(); // return the connection to pool
        if (err) throw err;
        // let ceshMap = {};
        // let description = "";
        // let text = "";
        // const newsBlog = [];
        // console.log(response)
        // for (let val of response) {
        //   const { id, title, slug, name, content, created_on: createdAt } = val;
        //   if (name === "body") {
        //     text = content;
        //   }
        //   if (name === "description") {
        //     description = content;
        //   }
        //   ceshMap[id] = { id, title, slug, text, description, createdAt };
        // }
        // for (let news in ceshMap) {
        //   newsBlog.push(ceshMap[news]);
        // }
        res.send(response);
      }
    );
  });
});
app.get("/blog", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      'SELECT * FROM np_blog ORDER BY date DESC', (err, response) => {
      connection.release(); // return the connection to pool
      if (err) throw err;
      // let ceshMap = {};
      // let description = "";
      // let text = "";
      // let image = "";
      // let category = "";
      // let views = "";
      // const newsBlog = [];
      // for (let val of response) {
      //   const { id, title, slug, name, content, created_on: createdAt } = val;
      //   if (name === "body") {
      //     text = content;
      //   }
      //   if (name === "description") {
      //     description = content;
      //   }
      //   if (name === "image") {
      //     image = content;
      //   }
      //   if (name === "category") {
      //     category = content;
      //   }
      //   if (name === "views") {
      //     views = content;
      //   }
      //   ceshMap[id] = {
      //     id,
      //     title,
      //     slug,
      //     text,
      //     description,
      //     createdAt,
      //     image,
      //     category,
      //     views,
      //   };
      // }
      // for (let news in ceshMap) {
      //   newsBlog.push(ceshMap[news]);
      // }
      res.send(response);
    });
  })
})
// app.get("/blog", (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(
//       "SELECT wf02_page.id, wf02_page.slug, wf02_page.title, wf02_page.created_on, wf02_page_part.content, wf02_page_part.name from wf02_page INNER JOIN wf02_page_part ON wf02_page.id = wf02_page_part.page_id WHERE wf02_page.parent_id = 24 ",
//       (err, response) => {
//         connection.release(); // return the connection to pool
//         if (err) throw err;
//         let ceshMap = {};
//         let description = "";
//         let text = "";
//         let image = "";
//         let category = "";
//         let views = "";
//         const newsBlog = [];
//         for (let val of response) {
//           const { id, title, slug, name, content, created_on: createdAt } = val;
//           if (name === "body") {
//             text = content;
//           }
//           if (name === "description") {
//             description = content;
//           }
//           if (name === "image") {
//             image = content;
//           }
//           if (name === "category") {
//             category = content;
//           }
//           if (name === "views") {
//             views = content;
//           }
//           ceshMap[id] = {
//             id,
//             title,
//             slug,
//             text,
//             description,
//             createdAt,
//             image,
//             category,
//             views,
//           };
//         }
//         for (let news in ceshMap) {
//           newsBlog.push(ceshMap[news]);
//         }
//         res.send({ data: newsBlog });
//       }
//     );
//   });
// });

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
