const sequlize = require("sequelize");

const db = require("./index");

module.exports = (connection) => {
    const TestScoreModel = connection.define("test_score", {
        id: { type: sequlize.INTEGER, primaryKey: true, autoIncrement: true },
        // candidateId: { type: sequlize.INTEGER, field: "candidate_id", foreignKey: true },
        firstRound: { type: sequlize.INTEGER, field: "first_round" },
        secondRound: { type: sequlize.INTEGER, field: "second_round" },
        thirdRound: { type: sequlize.INTEGER, field: "third_round" },
        createdAt: { type: sequlize.DATE, field: "created_at", defaultValue: sequlize.NOW },
        updatedAt: { type: sequlize.DATE, field: "updated_at", defaultValue: sequlize.NOW },
    }, {
        timestamps: true
    });

    return TestScoreModel;
}