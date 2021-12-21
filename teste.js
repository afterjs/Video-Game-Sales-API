const fs = require("fs");

const Games = require("./models/games");
const Genres = require("./models/genres");
const Plataform = require("./models/plataforms");
const Sales = require("./models/sales");

fs.readFile("./data/dataset.csv", "utf8", function (err, data) {
  if (err) throw err;

  const csvData = data.substring(data.indexOf("\n") + 1).split("\n");

  let genresArr = [];
  let gamesArr = [];
  let plataformsArr = [];


  for (let i = 0; i < csvData.length; i++) {
    const genreName = csvData[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[4];
    const gameName = csvData[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1];
    const plataformsName = csvData[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[2];

    if (genreName != undefined) {
      const schema = {
        id: i + 1,
        name: resolveString(genreName),
      };

      genresArr.push(schema);
    }

    if (gameName != undefined) {
      const schema = {
        id: i + 1,
        name: resolveString(gameName),
      };
      gamesArr.push(schema);
    }

    if (plataformsName != undefined) {
      const schema = {
        id: i + 1,
        name: resolveString(plataformsName),
      };
      plataformsArr.push(schema);
    }
  }
  insertData(genresArr, gamesArr, plataformsArr).then(() => {
    insertGameSales(csvData);
  });
});

let resolveString = (str) => {
  return str.trim().replace(/"/g, "").toLocaleLowerCase();
};

let insertData = async (genres, games, plataforms) => {
  const counter = 0;

  await Genres.bulkCreate(genres, {
    fields: ["name"],
    ignoreDuplicates: true,
  }).then(() => {
    console.log("Succesfully added genres");
  });

  await Games.bulkCreate(games, {
    fields: ["name"],
    ignoreDuplicates: true,
  }).then(() => {
    console.log("Succesfully added games");
  });

  await Plataform.bulkCreate(plataforms, {
    fields: ["name"],
    ignoreDuplicates: true,
  }).then(() => {
    console.log("Succesfully added plataforms");
  });

  return true;
};

let insertGameSales = async (allData) => {
  let sales = [];

  for (let i = 0; i < allData.length; i++) {
    const genreName = allData[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[4];
    const gameName = allData[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1];
    const plataformsName = allData[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[2];

    if (genreName != undefined && plataformsName != undefined && gameName != undefined) {
      await Promise.all([
        Genres.findAll({
          where: {
            name: resolveString(genreName),
          },
        }),
        Games.findAll({
          where: {
            name: resolveString(gameName),
          },
        }),
        Plataform.findAll({
          where: {
            name: resolveString(plataformsName),
          },
        }),
      ])
        .then((data) => {
          const genreid = data[0][0].id;
          const gameid = data[1][0].id;
          const plataformid = data[2][0].id;

          const schema = {
            genreid: genreid,
            plataformid: plataformid,
            gameid: gameid,
          };

          sales.push(schema);
        })
        .catch((error) => {
          // oops some error
        });
    }

    if (i == allData.length - 1) {
      await Sales.bulkCreate(sales).then(() => {
        console.log("Bulk created sales");
      });
    }
  }
};
