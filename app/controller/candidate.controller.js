const db = require("../model");
const sequelize = require("sequelize");
const candidateService = require("../service/candidate.service");

const candidates = db.candidates;
const candidateScore = db.candidateScore;

exports.createCandidate = async(req, res) => {
    const payload = req.body;
    const candidate = {
        name: payload.name,
        emailId: payload.emailId,
    };
    const result = await candidateService.createCandidate(candidate);
    res.send(result);
};

exports.getAllCandidates = async(req, res) => {
    const result = await candidateService.getAllCandidates();
    res.send(result);
};

exports.getCandidateById = async(req, res) => {
    const candidateId = req.params.id;
    const result = await candidateService.getCandidateById(candidateId)
    res.send(result);
};

exports.findTestDetails = async(req, res) => {
    const result = await candidateService.findTestDetails();
    res.send(result);
}

exports.addCandidateScore = async(req, res) => {
    const payload = req.body
    const score = {
        firstRound: payload.firstRound,
        secondRound: payload.secondRound,
        thirdRound: payload.thirdRound,
        candidateId: req.params.id
    }
    const data = await candidateService.addCandidateScore(score);
    res.send(data);

};












// SELECT candidateId, (SUM(first_round)+SUM(second_round)+SUM(third_round)) as total  FROM test_scores group by candidateId order by total   desc ;

// SELECT ROUND(avg(first_round),2)  as firstRoundAvg, ROUND(avg(second_round),2)  as secondRoundAvg, ROUND(avg(third_round),2)  as thirdRoundAvg FROM  test_scores ;