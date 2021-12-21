const fs = require("fs");

const Games = require("./models/games");
const Genres = require("./models/genres");
const Plataform = require("./models/plataforms");
const Sales = require("./models/sales");

fs.readFile("./data/dataset.csv", "utf8",  (err, data) => {
  if (err) throw err;

  const csvData = data.substring(data.indexOf("\n") + 1).split("\n");

  console.log(csvData[2].split(",")[3]);





 // let genresArr = [];
 // let gamesArr = [];
  // let plataformsArr = [];


 // for (let i = 0; i < csvData.length; i++) {
   // const genreName = csvData[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[4];
  //  const gameName = csvData[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1];
    //const plataformsName = csvData[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[2];

  
 // }

});

