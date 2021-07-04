const db = require("../model");
const sequelize = require("sequelize");

const candidates = db.candidates;
const candidateScore = db.candidateScore;

exports.create = async(req, res) => {
    const candidate = {
        name: req.body.name,
        emailId: req.body.emailId,
    };
    const info = await candidates.create(candidate);
    return info;

};

exports.findAll = async(req, res) => {
    const getAll = await candidates.findAll();
    return getAll;
};

exports.findOne = async(req, res) => {
    const candidateId = req.params.id;
    const info = await candidates.findByPk(candidateId)
    return info;
};

exports.findByScore = async(req, res) => {
    // const info = await candidateScore.sequelize.query('SELECT candidateId, (SUM(first_round)+SUM(second_round)+SUM(third_round)) as total  FROM test_scores group by candidateId order by total   desc ;');
    const highestScoreCandidate = await candidateScore.findAll({
        include: [{
            model: candidates,
            required: true,
            as: 'candidate',
            // attributes: ['id', 'name']
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

exports.candidateScore = async(req, res) => {
    const score = {
        firstRound: req.body.firstRound,
        secondRound: req.body.secondRound,
        thirdRound: req.body.thirdRound,
        candidateId: req.params.id
    }
    const info = await candidateScore.create(score);
    return info;

};


// SELECT candidateId, (SUM(first_round)+SUM(second_round)+SUM(third_round)) as total  FROM test_scores group by candidateId order by total   desc ;

// SELECT ROUND(avg(first_round),2)  as firstRoundAvg, ROUND(avg(second_round),2)  as secondRoundAvg, ROUND(avg(third_round),2)  as thirdRoundAvg FROM  test_scores ;