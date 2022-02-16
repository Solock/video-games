import express from "express";
import nunjucks from "nunjucks";
import request from "@fewlines-education/request";

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.render("home");
});

app.get("/allgames", (req, response) => {
  request("http://videogame-api.fly.dev/games", (error, body) => {
    if (error) {
      throw error;
    } else {
      const games = JSON.parse(body).games;
      console.log(games);
      response.render("allgames", { games });
    }
  });
});

app.get("/platforms", (req, response) => {
  request("http://videogame-api.fly.dev/platforms", (error, body) => {
    if (error) {
      throw error;
    } else {
      const platforms = JSON.parse(body).platforms;
      console.log(platforms);
      response.render("platforms", { platforms });
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
