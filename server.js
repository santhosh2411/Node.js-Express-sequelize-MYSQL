const express = require("express");
const cors = require("cors");
const controller = require("./app/controller/candidate.controller");

const app = express();

const db = require("./app/model");

db.connection.sync();

let corsOption = {
    origin: "http://localhost:5151"
};

app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/candidate", async(req, res) => {

    const candidates = await controller.findAll();
    res.send(candidates)
});

app.get("/candidate/:id", async(req, res) => {
    const candidateId = await controller.findOne(req, res);
    res.send(candidateId);
});

app.post("/candidate", async(req, res) => {
    const result = await controller.create(req, res)
    res.send(result)
});

app.post("/score/candidate/:id", async(req, res) => {
    const result = await controller.candidateScore(req, res)
    res.send(result)
});

app.get("/score/candidate/", async(req, res) => {
    const result = await controller.findByScore(req, res);
    res.send(result);
});



const PORT = process.env.PORT || 5151;

app.listen(PORT, () => {
    console.log(`server is running on ${corsOption.origin}`);
});