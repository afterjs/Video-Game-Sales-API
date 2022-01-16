const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const Games = require("../models/games");
const Genres = require("../models/genres");
const Platform = require("../models/platform");
const Sales = require("../models/sales");


const genresMap = new Map();
const gamesMap = new Map();
const platformsMap = new Map();

fs.readFile("./data/dataset.csv", "utf8", function (err, data) {
  if (err) throw err;

  const csvData = data.substring(data.indexOf("\n") + 1).split("\n");

  let genresArr = [];
  let gamesArr = [];
  let platformsArr = [];


  for (let i = 0; i < csvData.length; i++) {
    const genreName = splitData(csvData[i])[4];
    const gameName = splitData(csvData[i])[1];
    const platformsName = splitData(csvData[i])[2];

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

    if (platformsName != undefined) {

      let nameResolved = resolveString(platformsName)

      if (!platformsMap.has(nameResolved)) {

        let uid = uuidv4();
        platformsMap.set(nameResolved, uid);

        const schema = {
          id: uid,
          name: nameResolved,
        };
        platformsArr.push(schema);
      }

    }
  }
  insertData(genresArr, gamesArr, platformsArr).then(() => {
    insertGameSales(csvData);
  });



});

let resolveString = (str) => {
  return str.trim().replace(/"/g, "").toLocaleLowerCase();
};

let splitData = (str) => {
  return str.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
};

let insertData = async (genres, games, platforms) => {
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

    await Platform.bulkCreate(platforms, {
      ignoreDuplicates: true,
    }).then(() => {
      console.log("Succesfully added platforms");
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
    const platformsName = splitData(allData[i])[2];

    if (genreName != undefined && platformsName != undefined && gameName != undefined) {


      let genreId = genresMap.get(resolveString(genreName));
      let gameId = gamesMap.get(resolveString(gameName));
      let platformId = platformsMap.get(resolveString(platformsName));

      const schema = {
        rank: rank,
        genreid: genreId,
        platformid: platformId,
        gameid: gameId,
      };


      sales.push(schema);

    }
  }


  Sales.bulkCreate(sales).then(() => {
    console.log("Succesfully added sales");
  });

};