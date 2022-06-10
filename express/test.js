var tress = require("tress");
var needle = require("needle");
var request = require("request");
var cheerio = require("cheerio");
var resolve = require("url").resolve;
var fs = require("fs");
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

var URL = "https://www.svoboda.org/news";

var q = tress(function (url, callback) {
  needle.get(url, function (err, res) {
    if (err) throw err;
    var $ = cheerio.load(res.body);
    $("#ordinaryItems li .media-block  a").each(function () {
      //  console.log("https://www.svoboda.org" + $(this).attr("href"));
      // q.push($(this).attr("href"));

      var URL1 = "https://www.svoboda.org" + $(this).attr("href");
      // console.log("URL1", URL1);

      request(
        {
          method: "GET",
          url: URL1,
        },
        (err, res, body) => {
          if (err) return console.error(err);

          let $ = cheerio.load(body);

          let title = $("title");
          let href1 = $(".img-wrap .thumb");
          let date = $(".date");
          let urlText = URL1.split("/");
          const textArray = [];
          //  console.log(urlText[urlText.length - 2]);
          //   console.log(title.text());
          $(".wsw p").each(function () {
            textArray.push(`<p>${$(this).text()}</p>`);
          });
          const newsDate = date.text();
          // console.log(date.text());
          const finalImage = href1
            .find("img")
            .attr("src")
            .replace("w250", "w600");
          // console.log(href1.find("img").attr("src").replace("w250", "w600"));
          //   console.log(textArray);
          //  console.log(newsDate.split(" ")[0]);
          pool.getConnection((err, connection) => {
            if (err) throw err;
            try {
              const dateArr = newsDate.split(" ");
              let finalDate = "";
              let day = dateArr[0].replace("\n\n", "");
              let year = dateArr[2].replace("\n\n", "");
              if (dateArr[1]?.search("Январь") >= 0) {
                finalDate = `${year}-01-${day}T20:00`;
              }
              if (dateArr[1]?.search("Февраль") >= 0) {
                finalDate = `${year}-02-${day}T20:00`;
              }
              if (dateArr[1]?.search("Март") >= 0) {
                finalDate = `${year}-03-${day}T20:00`;
              }
              if (dateArr[1]?.search("Апрель") >= 0) {
                finalDate = `${year}-04-${day}T20:00`;
              }
              if (dateArr[1]?.search("Май") >= 0) {
                finalDate = `${year}-05-${day}T20:00`;
              }
              if (dateArr[1]?.search("июня") >= 0) {
                finalDate = `${year}-06-${day}T20:00`;
              }
              if (dateArr[1]?.search("Июль") >= 0) {
                finalDate = `${year}-07-${day}T20:00`;
              }
              if (dateArr[1]?.search("Август") >= 0) {
                finalDate = `${year}-08-${day}T20:00`;
              }
              if (dateArr[1]?.search("Сентябрь") >= 0) {
                finalDate = `${year}-09-${day}T20:00`;
              }
              if (dateArr[1]?.search("Октябрь") >= 0) {
                finalDate = `${year}-10-${day}T20:00`;
              }
              if (dateArr[1]?.search("Ноябрь") >= 0) {
                finalDate = `${year}-11-${day}T20:00`;
              }
              if (dateArr[1]?.search("Декабрь") >= 0) {
                finalDate = `${year}-12-${day}T20:00`;
              }
              //   console.log("title", title.text());
              //   console.log("url", urlText.join(""));
              //   console.log("finalImage", finalImage);
              //   console.log("finalDate", finalDate);
              //   console.log("textArray", textArray.join(""));
              var sql = `INSERT INTO np_news (title, description,text,image,date,link) VALUES ('${title.text()}', 'none', '${textArray.join(
                ""
              )}', '${finalImage}', '${finalDate}','${
                urlText[urlText.length - 2]
              }')`;
              connection.query(sql, function (err, result) {
                if (err) console.log("err", err.sqlMessage);
                console.log("1 record inserted");
              });
            } catch (e) {
              // Выводит 1 или 2 (если не произошло никаких других ошибок)
              console.log(e);
            }
          });
        }
      );
    });
    callback();
  });
}, 1);

q.push(URL);
