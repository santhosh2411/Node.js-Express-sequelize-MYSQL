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
    controller.getAllCandidates(req, res);
});

app.get("/candidate/:id", async(req, res) => {
    controller.getCandidateById(req, res);
});

app.post("/candidate", async(req, res) => {
    controller.createCandidate(req, res);
});

app.post("/candidate/score/:id", async(req, res) => {
    controller.addCandidateScore(req, res)

});

app.get("/test/details", async(req, res) => {
    controller.findTestDetails(req, res);

});

const PORT = process.env.PORT || 5151;

app.listen(PORT, () => {
    console.log(`server is running on ${corsOption.origin}`);
});