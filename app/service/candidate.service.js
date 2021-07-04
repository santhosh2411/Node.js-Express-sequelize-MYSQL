const db = require("../model");
const sequelize = require("sequelize");

const candidates = db.candidates;
const candidateScore = db.candidateScore;


const createCandidate = async(candidate) => {
    const result = await candidates.create(candidate);
    return result;
};


const getAllCandidates = async() => {
    const data = await candidates.findAll();
    return data;
};

const getCandidateById = async(candidateId) => {
    const info = await candidates.findByPk(candidateId)
    return info;
};

const findTestDetails = async() => {
    const highestScoreCandidate = await candidateScore.findAll({
        include: [{
            model: candidates,
            required: true,
            as: 'candidate',
            attributes: ['id', 'name', 'emailId']
        }],
        attributes: [
            [sequelize.literal(
                'COALESCE(first_round, 0) + COALESCE(second_round, 0) + COALESCE(third_round, 0)'
            ), 'total'],
        ],
        order: [

            [sequelize.literal(
                'COALESCE(first_round, 0) + COALESCE(second_round, 0) + COALESCE(third_round, 0)'
            ), 'DESC']

        ],
        group: ['candidateId'],
        limit: 1
    });

    const avgScoresPerRound = await candidateScore.findAll({
        attributes: [
            [sequelize.fn('avg', sequelize.col('first_round')), 'firstRound'],
            [sequelize.fn('avg', sequelize.col('second_round')), 'secondRound'],
            [sequelize.fn('avg', sequelize.col('third_round')), 'thirdRound'],
        ],
    });

    return { highestScoreCandidate: highestScoreCandidate[0], avgScoresPerRound };
};

const addCandidateScore = async(score) => {

    const data = await candidateScore.create(score);
    return data;

};

const candidateService = { createCandidate, getAllCandidates, findTestDetails, addCandidateScore, getCandidateById };
module.exports = candidateService;


// SELECT candidateId, (SUM(first_round)+SUM(second_round)+SUM(third_round)) as total  FROM test_scores group by candidateId order by total   desc ;

// SELECT ROUND(avg(first_round),2)  as firstRoundAvg, ROUND(avg(second_round),2)  as secondRoundAvg, ROUND(avg(third_round),2)  as thirdRoundAvg FROM  test_scores ;