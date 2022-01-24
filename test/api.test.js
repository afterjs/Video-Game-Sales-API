let chai = require("chai");
let chaiHttp = require("chai-http");
let server = "http://localhost:3000/api/v1";
chai.should();
chai.use(chaiHttp);

const adminToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjMWYxNzM1LTRkMmUtNDM5OS1hOGJlLTUzYmYzM2QzM2QzMSIsImlhdCI6MTY0Mjk4MTExOSwiZXhwIjoxNjQzNTg1OTE5fQ.HFXC5LBAV7nocLxF4U5bHVQciHb0NQueTwANAFv8i1k`;
const viewToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNiNDkyMmZmLWFhNzMtNGEzYi1iOTg0LTFmMmY1MGI0OTY4MCIsImlhdCI6MTY0Mjk4MTA5NSwiZXhwIjoxNjQzNTg1ODk1fQ.NmxMaaoB2CYaa87pUY4-JGfD4KhLyMRkk8nuyqasGyY`;
const editToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2MzlkMGQ1LTU5YTgtNDEyZC1hNTgyLWM4YmY1YzgzYjIzZiIsImlhdCI6MTY0Mjk4MTEzNSwiZXhwIjoxNjQzNTg1OTM1fQ.8lhEgiqoNJdum0_VJkjwEPL_CNAlmd-Hi226fMKrF9Q`;

const Games = require("../models/games");
const Genres = require("../models/genres");
const Platforms = require("../models/platforms");
const Sales = require("../models/sales");
const Logs = require("../models/logs");
const Roles = require("../models/roles");
const User = require("../models/users");

const gameData = [
  {
    id: "26225afa-8e43-4503-a342-7879fcf99c0d",
    name: "minecraft",
  },
  {
    id: "38f496ab-85ab-4eea-80b9-b042d9f59031",
    name: "csgo",
  },
  {
    id: "b9c973af-dba7-4250-bb03-b2c6a4b17bd6",
    name: "pokemon",
  },
  {
    id: "9689cedf-9437-4ca7-9cd2-d07c96febc13",
    name: "crab game",
  },
  {
    id: "918e72dc-2999-48b8-887b-5f9703892fe4",
    name: "Brawlhalla",
  },
];
const genreData = [
  {
    id: "57259c0a-3ade-4d24-8a5d-b482062a4740",
    name: "action",
  },
  {
    id: "c9b8f8e2-c9b1-4b3e-b8f0-b8b9b8f8e2c9",
    name: "adventure",
  },
  {
    id: "521ddb57-a4e5-41cf-b573-5c3e2e7f6383",
    name: "strategy",
  },
  {
    id: "23350f77-84d9-485a-a80f-0abd64774a8c",
    name: "sport",
  },
  {
    id: "bf6c860c-344c-4ead-811e-d9755dcf320a",
    name: "rpg",
  },
];
const platformData = [
  {
    id: "b767db3e-7b71-4d3e-a23a-7b574fcd5f8b",
    name: "pc",
  },
  {
    id: "b8e486bc-adaa-4370-bbd5-79f3f00b1554",
    name: "ps4",
  },
  {
    id: "18d713a4-e203-439d-99da-a499cccf0824",
    name: "xbox",
  },
  {
    id: "da7ead22-0c6a-48aa-bf77-933ae9d8345f",
    name: "switch",
  },
  {
    id: "dc8451fa-b43d-4861-ae34-eae56af7038a",
    name: "mobile",
  },
];
const logData = [
  {
    id: "2397751c-5598-4917-87ca-93001fe1421b",
    remoteaddress: "127.0.0.1",
    method: "GET",
    path: "http://localhost:3000/api/v1/games/",
    usernameid: "f8f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8",
  },
  {
    id: "e428ecb7-9c6b-43b6-910d-d2eaba9f3a91",
    remoteaddress: "127.0.0.1",
    method: "GET",
    path: "http://localhost:3000/api/v1/games/",
    usernameid: "f8f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8",
  },
  {
    id: "225e3a4d-2270-4d4f-a30a-41af351af683",
    remoteaddress: "127.0.0.1",
    method: "PUT",
    path: "http://localhost:3000/api/v1/games/225e3a4d-2270-4d4f-a30a-41af351af683",
    usernameid: "f8f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8",
  },
  {
    id: "c81d4f2e-3a4f-495a-9465-3e8d28ff35a2",
    remoteaddress: "127.0.0.1",
    method: "POST",
    path: "http://localhost:3000/api/v1/games/",
    usernameid: "f8f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8",
  },
];
const saleData = [
  {
    id: "f3581cf1-568c-44c0-8285-440909219459",
    rank: 1,
    genreid: "57259c0a-3ade-4d24-8a5d-b482062a4740",
    platformid: "b767db3e-7b71-4d3e-a23a-7b574fcd5f8b",
    gameid: "26225afa-8e43-4503-a342-7879fcf99c0d",
  },
  {
    id: "8258b8c0-a737-4271-a1eb-089d2bc978b0",
    rank: 2,
    genreid: "c9b8f8e2-c9b1-4b3e-b8f0-b8b9b8f8e2c9",
    platformid: "b8e486bc-adaa-4370-bbd5-79f3f00b1554",
    gameid: "38f496ab-85ab-4eea-80b9-b042d9f59031",
  },
  {
    id: "6cf542fb-08ee-47bb-bbda-efce0dcaed89",
    rank: 3,
    genreid: "521ddb57-a4e5-41cf-b573-5c3e2e7f6383",
    platformid: "18d713a4-e203-439d-99da-a499cccf0824",
    gameid: "b9c973af-dba7-4250-bb03-b2c6a4b17bd6",
  },
  {
    id: "fa374627-144e-49a5-ba39-321a7e4616f8",
    rank: 4,
    genreid: "23350f77-84d9-485a-a80f-0abd64774a8c",
    platformid: "da7ead22-0c6a-48aa-bf77-933ae9d8345f",
    gameid: "9689cedf-9437-4ca7-9cd2-d07c96febc13",
  },
];
const usersData = {
  id: "d5aa3acb-3de2-490e-b59c-67fcf9409af7",
  email: "ric123@gmail.com",
  name: "Ric",
  password: "123456",
  createdAt: "2020-05-06T16:00:00.000Z",
  updatedAt: "2020-05-06T16:00:00.000Z",
  roleid: "c6f86c31-ab68-4cdf-9ee3-e2dfd04d15d8",
};
const roles = [
  {
    id: "5e319552-7977-43fa-81a7-dae2ffc5aeff",
    name: "utilizador",
  },
  {
    id: "b2d3fb52-7dcb-4b63-8367-d3ac79a2eb43",
    name: "jogador",
  },
];

let insertForeingKeys = async () => {
  await Games.bulkCreate(gameData);
  await Genres.bulkCreate(genreData);
  await Platforms.bulkCreate(platformData);
  await Logs.bulkCreate(logData);
  await Roles.bulkCreate(roles);
  await Sales.bulkCreate(saleData);
  await User.create(usersData);

  return true;
};

try {
  before(async () => {
    try {
      await insertForeingKeys().then((val) => {
        //Sales.bulkCreate(saleData);
        console.log("data loaded on")
      });
    } catch (err) {
      console.log(err);
    }
  });
} catch (error) {}

describe("Infos route Unit Testing", () => {
  it("GET /infos/ - It should return message and api version", (done) => {
    chai
      .request(server)
      .get("/infos/version")
      .set("authorization", viewToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("version").eq("1.0.0");
        res.body.should.have.property("message").eq("Welcome to the Game Store API");
        done();
      });
  });

  it("GET /infos/ - It should return error because it hasn't token", (done) => {
    chai
      .request(server)
      .get("/infos/version")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("You need a token to access this resource.");
        done();
      });
  });
  
});

describe("Logs route Unit Testing", () => {
  it("GET /logs/ - It should return error because it hasn't token", (done) => {
    chai
      .request(server)
      .get("/logs/")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("You need a token to access this resource.");
        done();
      });
  });

  it("GET /logs/ - It should return error because it hasn't permissions to acess this route", (done) => {
    chai
      .request(server)
      .get("/logs/")
      .set("authorization", viewToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eq("Unauthorized Error");
        res.body.should.have.property("message").eq("You don't have permission to access this resource.");
        done();
      });
  });

  it("GET /logs/ - It should return a array of logs", (done) => {
    chai
      .request(server)
      .get("/logs/")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Array");
        res.body[0].should.have.property("id");
        res.body[0].should.have.property("remoteaddress");
        res.body[0].should.have.property("method");
        res.body[0].should.have.property("path");
        res.body[0].should.have.property("usernameid");
        res.body[0].should.have.property("createdAt");
        res.body[0].should.have.property("updatedAt");
        done();
      });
  });

  it("GET /logs/:id - It should return a log object", (done) => {
    chai
      .request(server)
      .get("/logs/2397751c-5598-4917-87ca-93001fe1421b")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Log found successfully");
        res.body.should.have.property("result");
        res.body.should.have.property("result").property("id");
        res.body.should.have.property("result").property("remoteaddress");
        res.body.should.have.property("result").property("method");
        res.body.should.have.property("result").property("path");
        res.body.should.have.property("result").property("usernameid");
        res.body.should.have.property("result").property("createdAt");
        res.body.should.have.property("result").property("updatedAt");
        done();
      });
  });

  it("GET /logs/:id (wrong param) - It should return a validation error", (done) => {
    chai
      .request(server)
      .get("/logs/123456")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Validation error");
        res.body.should.have.property("errors");
        done();
      });
  });
});

describe("Game route Unit Testing", () => {
  it("GET /games/ - It should return error because it hasn't token", (done) => {
    chai
      .request(server)
      .get("/games/")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("You need a token to access this resource.");
        done();
      });
  });

  it("GET /games/ - It should return a array of games", (done) => {
    chai
      .request(server)
      .get("/games/")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Array");
        res.body[0].should.have.property("id");
        res.body[0].should.have.property("name");
        res.body[0].should.have.property("createdAt");
        res.body[0].should.have.property("updatedAt");
        done();
      });
  });

  it("GET /games/:id - It should return a games object", (done) => {
    chai
      .request(server)
      .get("/games/26225afa-8e43-4503-a342-7879fcf99c0d")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Game found successfully");
        res.body.should.have.property("result");
        res.body.should.have.property("result").property("id");
        res.body.should.have.property("result").property("name");
        res.body.should.have.property("result").property("createdAt");
        res.body.should.have.property("result").property("updatedAt");
        done();
      });
  });

  it("GET /games/:id (wrong param) - It should return a validation error", (done) => {
    chai
      .request(server)
      .get("/games/123456")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Validation error");
        res.body.should.have.property("errors");
        done();
      });
  });

  it("POST /games/ - It should insert and return a result data", (done) => {
    chai
      .request(server)
      .post("/games/")
      .send({ name: "minecraftNotOriginal" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Game created successfully");
        res.body.should.have.property("result");
        res.body.should.have.property("result").property("id");
        res.body.should.have.property("result").property("name");
        res.body.should.have.property("result").property("createdAt");
        res.body.should.have.property("result").property("updatedAt");
        done();
      });
  });

  it("POST /games/ - It must return error when I try to insert a game that already exists", (done) => {
    chai
      .request(server)
      .post("/games/")
      .send({ name: "minecraft" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("This game already exists");
        done();
      });
  });

  it("DELETE /games/:id - It must delete a game and return a successfully message", (done) => {
    chai
      .request(server)
      .delete("/games/918e72dc-2999-48b8-887b-5f9703892fe4")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Game deleted successfully");
        done();
      });
  });

  it("PUT /games/:id  - It must update game name and return successfully message", (done) => {
    chai
      .request(server)
      .put("/games/38f496ab-85ab-4eea-80b9-b042d9f59031")
      .send({ name: "minecraftOriginal" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Game updated successfully");
        done();
      });
  });
});

describe("Platform route Unit Testing", () => {
  it("GET /platforms/ - It should return error because it hasn't token", (done) => {
    chai
      .request(server)
      .get("/platforms/")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("You need a token to access this resource.");
        done();
      });
  });

  it("GET /platforms/ - It should return a array of games", (done) => {
    chai
      .request(server)
      .get("/platforms/")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Array");
        res.body[0].should.have.property("id");
        res.body[0].should.have.property("name");
        res.body[0].should.have.property("createdAt");
        res.body[0].should.have.property("updatedAt");
        done();
      });
  });

  it("GET /platforms/:id - It should return a platforms object", (done) => {
    chai
      .request(server)
      .get("/platforms/b767db3e-7b71-4d3e-a23a-7b574fcd5f8b")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Platform found successfully");
        res.body.should.have.property("result");
        res.body.should.have.property("result").property("id");
        res.body.should.have.property("result").property("name");
        res.body.should.have.property("result").property("createdAt");
        res.body.should.have.property("result").property("updatedAt");
        done();
      });
  });

  it("GET /platforms/:id (wrong param) - It should return a validation error", (done) => {
    chai
      .request(server)
      .get("/platforms/123456")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Validation error");
        res.body.should.have.property("errors");
        done();
      });
  });

  it("POST /platforms/ - It should insert and return a result data", (done) => {
    chai
      .request(server)
      .post("/platforms/")
      .send({ name: "newplat" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Platform created successfully");
        res.body.should.have.property("result");
        res.body.should.have.property("result").property("id");
        res.body.should.have.property("result").property("name");
        res.body.should.have.property("result").property("createdAt");
        res.body.should.have.property("result").property("updatedAt");
        done();
      });
  });

  it("POST /platforms/ - It must return error when I try to insert a platform that already exists", (done) => {
    chai
      .request(server)
      .post("/platforms/")
      .send({ name: "pc" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("This platform already exists");
        done();
      });
  });

  it("DELETE /platforms/:id - It must delete a platform and return a successfully message", (done) => {
    chai
      .request(server)
      .delete("/platforms/dc8451fa-b43d-4861-ae34-eae56af7038a")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Platform deleted successfully");
        done();
      });
  });

  it("PUT /platforms/:id  - It must update plataform name and return successfully message", (done) => {
    chai
      .request(server)
      .put("/platforms/b767db3e-7b71-4d3e-a23a-7b574fcd5f8b")
      .send({ name: "pc123" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Platform updated successfully");
        done();
      });
  });
});

describe("Genres route Unit Testing", () => {
  it("GET /genres/ - It should return error because it hasn't token", (done) => {
    chai
      .request(server)
      .get("/genres/")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("You need a token to access this resource.");
        done();
      });
  });

  it("GET /genres/ - It should return a array of genres", (done) => {
    chai
      .request(server)
      .get("/genres/")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Array");
        res.body[0].should.have.property("id");
        res.body[0].should.have.property("name");
        res.body[0].should.have.property("createdAt");
        res.body[0].should.have.property("updatedAt");
        done();
      });
  });

  it("GET /genres/:id - It should return a genres object", (done) => {
    chai
      .request(server)
      .get("/genres/57259c0a-3ade-4d24-8a5d-b482062a4740")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Genre found successfully");
        res.body.should.have.property("result");
        res.body.should.have.property("result").property("id");
        res.body.should.have.property("result").property("name");
        res.body.should.have.property("result").property("createdAt");
        res.body.should.have.property("result").property("updatedAt");
        done();
      });
  });

  it("GET /genres/:id (wrong param) - It should return a validation error", (done) => {
    chai
      .request(server)
      .get("/genres/123456")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Validation error");
        res.body.should.have.property("errors");
        done();
      });
  });

  it("POST /genres/ - It should insert and return a result data", (done) => {
    chai
      .request(server)
      .post("/genres/")
      .send({ name: "survival" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Genre created successfully");
        res.body.should.have.property("result");
        res.body.should.have.property("result").property("id");
        res.body.should.have.property("result").property("name");
        res.body.should.have.property("result").property("createdAt");
        res.body.should.have.property("result").property("updatedAt");
        done();
      });
  });

  it("POST /genres/ - It must return error when I try to insert a genre that already exists", (done) => {
    chai
      .request(server)
      .post("/genres/")
      .send({ name: "adventure" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("This genre already exists");
        done();
      });
  });

  it("DELETE /genres/:id - It must delete a genre and return a successfully message", (done) => {
    chai
      .request(server)
      .delete("/genres/bf6c860c-344c-4ead-811e-d9755dcf320a")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Genre deleted successfully");
        done();
      });
  });

  it("PUT /genres/:id  - It must update plataform name and return successfully message", (done) => {
    chai
      .request(server)
      .put("/genres/57259c0a-3ade-4d24-8a5d-b482062a4740")
      .send({ name: "pc123" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Genre updated successfully");
        done();
      });
  });
});

describe("Sales route Unit Testing", () => {
  it("GET /sales/ - It should return error because it hasn't token", (done) => {
    chai
      .request(server)
      .get("/sales/")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("You need a token to access this resource.");
        done();
      });
  });

  it("GET /games/ - It should return error because it hasn't permissions to acess this route", (done) => {
    chai
      .request(server)
      .get("/logs/")
      .set("authorization", viewToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eq("Unauthorized Error");
        res.body.should.have.property("message").eq("You don't have permission to access this resource.");
        done();
      });
  });

  it("GET /sales/ - It should return all sales data", (done) => {
    chai
      .request(server)
      .get("/sales/")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Sales fetched successfully");
        res.body.should.have.property("result");
        res.body.should.have.property("result").to.be.an("array");
        done();
      });
  });

  it("GET /sales/:id - It should return a sale data by id", (done) => {
    chai
      .request(server)
      .get("/sales/f3581cf1-568c-44c0-8285-440909219459")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Sales fetched successfully");
        res.body.should.have.property("result");
        res.body.should.have.property("result").property("id");
        res.body.should.have.property("result").property("rank");
        res.body.should.have.property("result").property("createdAt");
        res.body.should.have.property("result").property("updatedAt");
        res.body.should.have.property("result").property("genreid");
        res.body.should.have.property("result").property("platformid");
        res.body.should.have.property("result").property("gameid");
        done();
      });
  });

  it("POST /sales/ - It should insert a sale and return a result data", (done) => {
    chai
      .request(server)
      .post("/sales/")
      .send({
        rank: 5,
        genreid: "23350f77-84d9-485a-a80f-0abd64774a8c",
        platformid: "b767db3e-7b71-4d3e-a23a-7b574fcd5f8b",
        gameid: "9689cedf-9437-4ca7-9cd2-d07c96febc13",
      })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Sale created successfully");
        res.body.should.have.property("data");
        res.body.should.have.property("data").property("id");
        res.body.should.have.property("data").property("rank");
        res.body.should.have.property("data").property("genreid");
        res.body.should.have.property("data").property("platformid");
        res.body.should.have.property("data").property("gameid");
        res.body.should.have.property("data").property("updatedAt");
        res.body.should.have.property("data").property("createdAt");
        done();
      });
  });

  it("POST /sales/ - It should return error because gameid is not a foreing key", (done) => {
    chai
      .request(server)
      .post("/sales/")
      .send({
        rank: 6,
        genreid: "23350f77-84d9-485a-a80f-0abd64774a8c",
        platformid: "b767db3e-7b71-4d3e-a23a-7b574fcd5f8b",
        gameid: "9689cedf-9437-2ac8-9cd2-d07c96febc13",
      })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("The role id is not a foreignKey");
        res.body.should.have.property("detail").eq('Key (gameid)=(9689cedf-9437-2ac8-9cd2-d07c96febc13) is not present in table "games".');
        done();
      });
  });

  it("POST /sales/ - It should return error because the rank already exist", (done) => {
    chai
      .request(server)
      .post("/sales/")
      .send({
        rank: 5,
        genreid: "23350f77-84d9-485a-a80f-0abd64774a8c",
        platformid: "b767db3e-7b71-4d3e-a23a-7b574fcd5f8b",
        gameid: "9689cedf-9437-2ac8-9cd2-d07c96febc13",
      })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("The rank is already taken");
        res.body.should.have.property("detail").eq("Key (rank)=(5) already exists.");
        done();
      });
  });

  it("DELETE /sales/:id - It must delete a sale and return a successfully message", (done) => {
    chai
      .request(server)
      .delete("/sales/6cf542fb-08ee-47bb-bbda-efce0dcaed89")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Sale deleted successfully");
        done();
      });
  });

  it("DELETE /sales/:id - It must return an error because the id doesn't exist", (done) => {
    chai
      .request(server)
      .delete("/sales/6cf542fb-08ee-47bb-bbda-efce0dcaed89")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("The sale with the given ID was not found.");
        done();
      });
  });

  it("PUT /sales/:id  - It must update sale genreid and return successfully message", (done) => {
    chai
      .request(server)
      .put("/sales/fa374627-144e-49a5-ba39-321a7e4616f8")
      .send({ genreid: "57259c0a-3ade-4d24-8a5d-b482062a4740" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Sale updated successfully");
        res.body.should.have.property("data").property("id").eq("fa374627-144e-49a5-ba39-321a7e4616f8");
        res.body.should.have.property("data").property("genreid").eq("57259c0a-3ade-4d24-8a5d-b482062a4740");
        done();
      });
  });

  it("PUT /sales/:id  - It must return error bcause the genreid isn't a foreing key", (done) => {
    chai
      .request(server)
      .put("/sales/fa374627-144e-49a5-ba39-321a7e4616f8")
      .send({ genreid: "57259c0a-3ade-4d24-8a5d-b482062a4741" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("The role id is not a foreignKey");
        res.body.should.have.property("detail").eq('Key (genreid)=(57259c0a-3ade-4d24-8a5d-b482062a4741) is not present in table "genres".');
        done();
      });
  });
});

describe("Roles route Unit Testing", () => {
  it("GET /roles/ - It should return error because it hasn't token", (done) => {
    chai
      .request(server)
      .get("/roles/")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("You need a token to access this resource.");
        done();
      });
  });

  it("GET /roles/ - It should return error because doesn't have permissions", (done) => {
    chai
      .request(server)
      .get("/roles/")
      .set("authorization", viewToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eq("Unauthorized Error");
        res.body.should.have.property("message").eq("You don't have permission to access this resource.");
        done();
      });
  });

  it("GET /roles/ - It should return a array of roles", (done) => {
    chai
      .request(server)
      .get("/roles/")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Array");
        res.body[0].should.have.property("id");
        res.body[0].should.have.property("name");
        res.body[0].should.have.property("createdAt");
        res.body[0].should.have.property("updatedAt");
        done();
      });
  });

  it("GET /roles/:id - It should return an error because the uid doesn't exist", (done) => {
    chai
      .request(server)
      .get("/roles/a5db994d-a5c2-4796-803e-15272c36ad7a")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Role not found");
        done();
      });
  });

  it("GET /roles/:id - It should return an object of role", (done) => {
    chai
      .request(server)
      .get("/roles/a5db994d-a5c2-4796-803e-15272c36ad70")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Role found successfully");
        res.body.should.have.property("result").property("id");
        res.body.should.have.property("result").property("name");
        res.body.should.have.property("result").property("createdAt");
        res.body.should.have.property("result").property("updatedAt");
        done();
      });
  });

  it("POST /roles/ - It should insert new role and return data and successfully message", (done) => {
    chai
      .request(server)
      .post("/roles/")
      .send({
        id: "cf21b74e-9454-45bf-b39d-943758d48052",
        name: "Gestor",
      })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Role created successfully");
        res.body.should.have.property("result").property("id");
        res.body.should.have.property("result").property("name");
        res.body.should.have.property("result").property("createdAt");
        res.body.should.have.property("result").property("updatedAt");
        done();
      });
  });

  it("POST /roles/ - It should return an error because the role name already exist", (done) => {
    chai
      .request(server)
      .post("/roles/")
      .send({ name: "Admin" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("This role already exists");
        done();
      });
  });

  it("DELETE /roles/:id - It must delete a role and return an successfully message", (done) => {
    chai
      .request(server)
      .delete("/roles/5e319552-7977-43fa-81a7-dae2ffc5aeff")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Role deleted successfully");
        done();
      });
  });

  it("DELETE /sales/:id (protected) - It must return an error because the role id is protected", (done) => {
    chai
      .request(server)
      .delete("/roles/70ee9863-4f26-4b56-bfac-31a63d258b0d")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("This role is protected.");
        done();
      });
  });

  it("PUT /sales/:id  - It must return an successfully message and return new data", (done) => {
    chai
      .request(server)
      .put("/roles/b2d3fb52-7dcb-4b63-8367-d3ac79a2eb43")
      .send({ name: "jogador Ativo" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Role updated successfully");
        done();
      });
  });

  it("PUT /sales/:id (protected) - It must return an error because the role id is protected", (done) => {
    chai
      .request(server)
      .delete("/roles/a5db994d-a5c2-4796-803e-15272c36ad70")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("This role is protected.");
        done();
      });
  });
});

describe("Users route Unit Testing", () => {
  it("GET /users/ - It should return error because it hasn't token", (done) => {
    chai
      .request(server)
      .get("/users/")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("You need a token to access this resource.");
        done();
      });
  });

  it("GET /users/ - It should return error because doesn't have permissions", (done) => {
    chai
      .request(server)
      .get("/users/")
      .set("authorization", viewToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eq("Unauthorized Error");
        res.body.should.have.property("message").eq("You don't have permission to access this resource.");
        done();
      });
  });

  it("GET /users/ - It should return a array of users", (done) => {
    chai
      .request(server)
      .get("/users/")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Array");
        res.body[0].should.have.property("id");
        res.body[0].should.have.property("email");
        res.body[0].should.have.property("name");
        res.body[0].should.have.property("password");
        res.body[0].should.have.property("createdAt");
        res.body[0].should.have.property("updatedAt");
        res.body[0].should.have.property("roleid");
        done();
      });
  });

  it("GET /users/:id - It should return an error because the uid doesn't exist", (done) => {
    chai
      .request(server)
      .get("/users/3b4922ff-aa73-4a3b-b984-1f2f50b49681")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("User not found");
        done();
      });
  });

  it("GET /users/:id (wrong param) - It should return a validation error", (done) => {
    chai
      .request(server)
      .get("/users/123456")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Validation error");
        res.body.should.have.property("errors");
        done();
      });
  });

  it("PUT /users/:id - It must update user account and return successfully message", (done) => {
    chai
      .request(server)
      .put("/users/ac1f1735-4d2e-4399-a8be-53bf33d33d31")
      .send({ name: "Admin Acc" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("User updated with success!");
        done();
      });
  });

  it("PUT /users/:id - It return error because the email already exist", (done) => {
    chai
      .request(server)
      .put("/users/3b4922ff-aa73-4a3b-b984-1f2f50b49680")
      .send({ email: "admin@ipvc.pt" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Email already in use");
        done();
      });
  });

  it("PUT /users/:id - It return error because the roleid isn't a foreing key", (done) => {
    chai
      .request(server)
      .put("/users/3b4922ff-aa73-4a3b-b984-1f2f50b49680")
      .send({ roleid: "bf6c860c-344c-4ead-811e-d9755dcf320a" })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("The role id is not a foreignKey");
        res.body.should.have.property("detail").eq('Key (roleid)=(bf6c860c-344c-4ead-811e-d9755dcf320a) is not present in table "roles".');
        done();
      });
  });

  it("POST /users/ - It should insert and return a result data", (done) => {
    chai
      .request(server)
      .post("/users/")
      .send({
        email: "xavieramaro2@gmail.com",
        name: "Xavier Amaro",
        password: "123456",
        createdAt: "2020-05-06T16:00:00.000Z",
        updatedAt: "2020-05-06T16:00:00.000Z",
        roleid: "c6f86c31-ab68-4cdf-9ee3-e2dfd04d15d8",
      })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("User created");
        res.body.should.have.property("info");
        res.body.should.have.property("info").property("id");
        res.body.should.have.property("info").property("name");
        res.body.should.have.property("info").property("email");
        res.body.should.have.property("info").property("password");
        res.body.should.have.property("info").property("roleid");
        res.body.should.have.property("info").property("updatedAt");
        res.body.should.have.property("info").property("createdAt");
        done();
      });
  });

  it("POST /users/ - It should return error because the email already exist", (done) => {
    chai
      .request(server)
      .post("/users/")
      .send({
        id: "64f7f301-046d-4354-b9f6-c967f498b183",
        email: "xavieramaro2@gmail.com",
        name: "Xavier Amaro",
        password: "123456",
        createdAt: "2020-05-06T16:00:00.000Z",
        updatedAt: "2020-05-06T16:00:00.000Z",
        roleid: "c6f86c31-ab68-4cdf-9ee3-e2dfd04d15d8",
      })
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Email already in use");
        done();
      });
  });

  it("POST /users/login - It should return jwt token and user data", (done) => {
    chai
      .request(server)
      .post("/users/login")
      .send({
        email: "xavieramaro2@gmail.com",
        password: "123456",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Auhterization success");
        res.body.should.have.property("accessToken");
        res.body.should.have.property("info").property("id");
        res.body.should.have.property("info").property("name");
        res.body.should.have.property("info").property("email");
        res.body.should.have.property("info").property("password");
        res.body.should.have.property("info").property("roleid");
        res.body.should.have.property("info").property("updatedAt");
        res.body.should.have.property("info").property("createdAt");
        done();
      });
  });

  it("POST /users/login - It should return error because password its wrong", (done) => {
    chai
      .request(server)
      .post("/users/login")
      .send({
        email: "xavieramaro2@gmail.com",
        password: "1235",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Email ou password not found");
        done();
      });
  });

  it("DELETE /users/:id - It must delete an user and return an successfully message", (done) => {
    chai
      .request(server)
      .delete("/users/d5aa3acb-3de2-490e-b59c-67fcf9409af7")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("User deleted with success!");
        done();
      });
  });

  it("DELETE /users/:id - It must return an error because the id doesn't exist", (done) => {
    chai
      .request(server)
      .delete("/users/4c631a15-dd55-4521-bf47-cf3e3364d6bb")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("User not found");
        done();
      });
  });
});

describe("Global routes Unit Testing", () => {
  it("GET /unknown/ - It should return error when route doesn't exist", (done) => {
    chai
      .request(server)
      .get("/unknown/")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("error").property("name").eq("Error");
        res.body.should.have.property("error").property("message").eq("Invalid Request");
        res.body.should.have.property("error").property("statusCode").eq(404);
        res.body.should.have.property("error").property("docs").eq("http://localhost:3000/api/v1/api-docs");
        res.body.should.have.property("message").eq("This route does not exist");
        done();
      });
  });

  it("GET /unknown/ - It should return error because have an json syntax error", (done) => {
    chai
      .request(server)
      .post("/roles/")
      .send("name:'\n'123")
      .set("authorization", adminToken)
      .end((err, res) => {
        res.should.have.status(400);
      
        done();
      });
  });
});
