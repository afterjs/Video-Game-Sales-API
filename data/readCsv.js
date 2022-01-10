const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const Games = require("../models/games");
const Genres = require("../models/genres");
const Plataform = require("../models/plataforms");
const Sales = require("../models/sales");


const genresMap = new Map();
const gamesMap = new Map();
const plataformsMap = new Map();

fs.readFile("./data/dataset.csv", "utf8", function (err, data) {
  if (err) throw err;

  const csvData = data.substring(data.indexOf("\n") + 1).split("\n");

  let genresArr = [];
  let gamesArr = [];
  let plataformsArr = [];


  for (let i = 0; i < csvData.length; i++) {
    const genreName = splitData(csvData[i])[4];
    const gameName = splitData(csvData[i])[1];
    const plataformsName = splitData(csvData[i])[2];

    if (genreName != undefined) {
      let nameResolved = resolveString(genreName)

      if (!genresMap.has(nameResolved)) {
        let uid = uuidv4();
        genresMap.set(nameResolved, uid);

        const schema = {
          id: uid,
          name: nameResolved,
        };
        genresArr.push(schema);

      }
    }

    if (gameName != undefined) {

      let nameResolved = resolveString(gameName)

      if (!gamesMap.has(nameResolved)) {
        let uid = uuidv4();
        gamesMap.set(nameResolved, uid);

        const schema = {
          id: uid,
          name: nameResolved,
        };
        gamesArr.push(schema);
      }
    }

    if (plataformsName != undefined) {

      let nameResolved = resolveString(plataformsName)

      if (!plataformsMap.has(nameResolved)) {

        let uid = uuidv4();
        plataformsMap.set(nameResolved, uid);

        const schema = {
          id: uid,
          name: nameResolved,
        };
        plataformsArr.push(schema);
      }

    }
  }
  insertData(genresArr, gamesArr, plataformsArr).then(() => {
    insertGameSales(csvData);
  });



});

let resolveString = (str) => {
  return str.trim().replace(/"/g, "").toLocaleLowerCase();
};

let splitData = (str) => {
  return str.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
};

let insertData = async (genres, games, plataforms) => {
  try {
    await Genres.bulkCreate(genres, {
      ignoreDuplicates: true,
    }).then(() => {
      console.log("Succesfully added genres");
    });

    await Games.bulkCreate(games, {
      ignoreDuplicates: true,
    }).then(() => {
      console.log("Succesfully added games");
    });

    await Plataform.bulkCreate(plataforms, {
      ignoreDuplicates: true,
    }).then(() => {
      console.log("Succesfully added plataforms");
    });
  } catch (e) {
    console.log(e);
  }

  return true;
};

let insertGameSales = (allData) => {
  let sales = [];

  for (let i = 0; i < allData.length; i++) {
    const rank = splitData(allData[i])[0];
    const genreName = splitData(allData[i])[4];
    const gameName = splitData(allData[i])[1];
    const plataformsName = splitData(allData[i])[2];

    if (genreName != undefined && plataformsName != undefined && gameName != undefined) {


      let genreId = genresMap.get(resolveString(genreName));
      let gameId = gamesMap.get(resolveString(gameName));
      let plataformId = plataformsMap.get(resolveString(plataformsName));

      const schema = {
        rank: rank,
        genreid: genreId,
        plataformid: plataformId,
        gameid: gameId,
      };


      sales.push(schema);

    }
  }


  Sales.bulkCreate(sales).then(() => {
    console.log("Succesfully added sales");
  });

};