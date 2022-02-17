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

app.get("/games/:slug", (req, response) => {
  const gameSlug = req.params.slug;
  console.log(gameSlug);
  request(`http://videogame-api.fly.dev/games/slug/${gameSlug}`, (error, body) => {
    //console.log("Body", body);
    if (error) {
      throw error;
    } else {
      const slugGame = JSON.parse(body);
      console.log(slugGame.games_genres[0].genre.name);
      response.render("games", { slugGame });
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
