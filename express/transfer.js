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

app.get("/backend/blog", (req, res) => {
  const { page } = req.params;
  const limit = 20;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      `SELECT * FROM news ORDER BY date DESC LIMIT 10 OFFSET 1800`,
      (err, response) => {
        connection.release(); // return the connection to pool
        if (err) throw err;
        response.map((item) => {
          try {
            const dateArr = item?.date.split(" ");
            let finalDate = "";
            //  console.log("item", dateArr);
            // let position = dateArr[1]?.search("Июнь");
            // console.log(position);
            //https://nprussia.org/admin/public/images/No_Image_Available.jpeg
            if (dateArr[1]?.search("Январь") >= 0) {
              finalDate = `2021-01-${dateArr[0]}T20:00`;
            }
            if (dateArr[1]?.search("Февраль") >= 0) {
              finalDate = `2021-02-${dateArr[0]}T20:00`;
            }
            if (dateArr[1]?.search("Март") >= 0) {
              finalDate = `2021-03-${dateArr[0]}T20:00`;
            }
            if (dateArr[1]?.search("Апрель") >= 0) {
              finalDate = `2021-04-${dateArr[0]}T20:00`;
            }
            if (dateArr[1]?.search("Май") >= 0) {
              finalDate = `2021-05-${dateArr[0]}T20:00`;
            }
            if (dateArr[1]?.search("Июнь") >= 0) {
              finalDate = `2021-06-${dateArr[0]}T20:00`;
            }
            if (dateArr[1]?.search("Июль") >= 0) {
              finalDate = `2021-07-${dateArr[0]}T20:00`;
            }
            if (dateArr[1]?.search("Август") >= 0) {
              finalDate = `2021-08-${dateArr[0]}T20:00`;
            }
            if (dateArr[1]?.search("Сентябрь") >= 0) {
              finalDate = `2021-09-${dateArr[0]}T20:00`;
            }
            if (dateArr[1]?.search("Октябрь") >= 0) {
              finalDate = `2021-10-${dateArr[0]}T20:00`;
            }
            if (dateArr[1]?.search("Ноябрь") >= 0) {
              finalDate = `2021-11-${dateArr[0]}T20:00`;
            }
            if (dateArr[1]?.search("Декабрь") >= 0) {
              finalDate = `2021-12-${dateArr[0]}T20:00`;
            }
            var sql = `INSERT INTO np_news (title, description,text,image,date,link) VALUES ('${
              item?.title
            }', 'none', '${item?.text}', '${item?.img
              .replace("w100", "w600")
              .replace("w250", "w600")}', '${finalDate}','${item?.link}')`;
            connection.query(sql, function (err, result) {
              if (err) console.log("err", err.sqlMessage);
              console.log("1 record inserted");
            });
          } catch (e) {
            // Выводит 1 или 2 (если не произошло никаких других ошибок)
            console.log(e);
          }
          // console.log(item.title_head);
        });
        //  console.log("response", response[0]?.title_head);
        // var sql = `INSERT INTO np_blog (title, description,image,text,date,category,views,imageDesc,imageRights,authors,link) VALUES ('${response[0]?.title_head}', '${response[0]?.description}', '${response[0]?.img}', '${response[0]?.text}', '${response[0]?.date}', '${response[0]?.tegs}', '100','${response[0]?.title_head}','${response[0]?.title_head}','author','${response[0]?.cpulink}')`;
        // connection.query(sql, function (err, result) {
        //   if (err) throw err;
        //   console.log("1 record inserted");
        // });
        res.send(JSON.stringify(response, null, "  "));
      }
    );
  });
});
// app.get("/backend/count", (req, res) => {
//   const limit = 20;
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(
//       `SELECT COUNT( *) as "countRows" FROM np_blog; `,
//       (err, response) => {
//         connection.release(); // return the connection to pool
//         if (err) throw err;
//         res.send({ data: Math.round(response[0]?.countRows / limit) });
//       }
//     );
//   });
// });
// app.get("/backend/search/:link", (req, res) => {
//   const { link } = req.params;
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(
//       `SELECT * FROM np_blog where title LIKE '${link}%' ORDER BY date DESC LIMIT 100`,
//       (err, response) => {
//         connection.release(); // return the connection to pool
//         if (err) throw err;
//         res.send(response);
//       }
//     );
//   });
// });
// app.get("/backend/category/:link", (req, res) => {
//   const { link } = req.params;
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(
//       `SELECT * FROM np_blog where category LIKE '${link}%' ORDER BY date DESC`,
//       (err, response) => {
//         connection.release(); // return the connection to pool
//         if (err) throw err;
//         res.send(response);
//       }
//     );
//   });
// });

// app.get("/backend/cncount/:link", (req, res) => {
//   const { link } = req.params;
//   const limit = 10;
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(
//       `SELECT COUNT( *) as "countRows" FROM np_blog where category LIKE '${link}%'`,
//       (err, response) => {
//         connection.release(); // return the connection to pool
//         if (err) throw err;
//         res.send({ data: response });
//       }
//     );
//   });
// });

// app.get("/backend/ncount", (req, res) => {
//   const limit = 20;
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(
//       `SELECT COUNT( *) as "countRows" FROM np_news; `,
//       (err, response) => {
//         connection.release(); // return the connection to pool
//         if (err) throw err;
//         res.send({ data: Math.round(response[0]?.countRows / limit) });
//       }
//     );
//   });
// });
// app.get("/backend/post/:link", (req, res) => {
//   const { link } = req.params;
//   console.log(link);
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(
//       `SELECT * FROM np_blog WHERE link="${link}"`,
//       (err, response) => {
//         connection.release(); // return the connection to pool
//         if (err) throw err;
//         res.send({ data: response[0] });
//       }
//     );
//   });
// });
// app.get("/backend/news/:page", (req, res) => {
//   const { page } = req.params;
//   const limit = 20;
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(
//       `SELECT * FROM np_news ORDER BY date DESC LIMIT ${limit} OFFSET ${
//         page * limit
//       } `,
//       (err, response) => {
//         connection.release(); // return the connection to pool
//         if (err) throw err;
//         res.send(response);
//       }
//     );
//   });
// });
// app.get("/backend/newspage/:link", (req, res) => {
//   const { link } = req.params;
//   console.log(link);
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(
//       `SELECT * FROM np_news WHERE link="${link}"`,
//       (err, response) => {
//         connection.release(); // return the connection to pool
//         if (err) throw err;
//         res.send({ data: response[0] });
//       }
//     );
//   });
// });

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
