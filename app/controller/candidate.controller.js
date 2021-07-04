const candidateService = require("../service/candidate.service");
const schema = require("../validator/candidate.validate");
const schemaValidator = require("../validator/validator");

exports.createCandidate = async(req, res, next) => {
    try {
        const payload = req.body;
        await schemaValidator.validateRequest(schema.createCandidateRequestSchema, payload);
        const candidate = {
            name: payload.name,
            emailId: payload.emailId,
        };
        const result = await candidateService.createCandidate(candidate);
        res.send(result);
    } catch (error) {
        next(error);
    }
};

exports.getAllCandidates = async(req, res, next) => {
    try {
        const result = await candidateService.getAllCandidates();
        res.send(result);
    } catch (error) {
        next(error);
    }
};

exports.getCandidateById = async(req, res, next) => {
    try {
        const candidateId = req.params.id;
        const result = await candidateService.getCandidateById(candidateId)
        res.send(result);
    } catch (error) {
        next(error);
    }
};

exports.findTestDetails = async(req, res, next) => {
    try {
        const result = await candidateService.findTestDetails();
        res.send(result);
    } catch (error) {
        next(error);
    }
}

exports.addCandidateScore = async(req, res, next) => {
    try {
        const payload = req.body
        const score = {
            firstRound: payload.firstRound,
            secondRound: payload.secondRound,
            thirdRound: payload.thirdRound,
            candidateId: req.params.id
        }
        const data = await candidateService.addCandidateScore(score);
        res.send(data);
    } catch (error) {
        next(error);
    }
};












// SELECT candidateId, (SUM(first_round)+SUM(second_round)+SUM(third_round)) as total  FROM test_scores group by candidateId order by total   desc ;

// SELECT ROUND(avg(first_round),2)  as firstRoundAvg, ROUND(avg(second_round),2)  as secondRoundAvg, ROUND(avg(third_round),2)  as thirdRoundAvg FROM  test_scores ;