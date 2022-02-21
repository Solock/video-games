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
  let indexPage = req.query.page;

  if (indexPage === undefined) {
    indexPage = "1";
  }
  console.log("ligne 22:", indexPage);
  request(`http://videogame-api.fly.dev/games?page=${indexPage}`, (error, body) => {
    if (error) {
      throw error;
    } else {
      const games = JSON.parse(body).games;
      //console.log(games);
      //const gamePlatform = JSON.parse(body).games.platforms;
      //console.log(games);
      //console.log(gamePlatform);
      response.render("allgames", { games, indexPage });
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

app.get("/genres", (req, response) => {
  request("http://videogame-api.fly.dev/genres", (error, body) => {
    if (error) {
      throw error;
    } else {
      const resultGenre = JSON.parse(body).genres;
      console.log(resultGenre);
      response.render("genres", { resultGenre });
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
      console.log(slugGame);
      response.render("games", { slugGame });
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
