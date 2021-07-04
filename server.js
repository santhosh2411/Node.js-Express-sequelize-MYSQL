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

app.get("/candidate", async(req, res, next) => {
    controller.getAllCandidates(req, res, next);
});

app.get("/candidate/:id", async(req, res, next) => {
    controller.getCandidateById(req, res, next);
});

app.post("/candidate", async(req, res, next) => {
    controller.createCandidate(req, res, next);
});

app.post("/candidate/score/:id", async(req, res, next) => {
    controller.addCandidateScore(req, res, next)

});

app.get("/test/details", async(req, res, next) => {
    controller.findTestDetails(req, res, next);

});

const PORT = process.env.PORT || 5151;

app.listen(PORT, () => {
    console.log(`server is running on ${corsOption.origin}`);
});