const dbConfig = require("../config/db.config")

const sequlize = require("sequelize");


const connection = new sequlize(dbConfig.db, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.connection = connection;
db.candidates = require("./candidate.model")(connection);

db.candidateScore = require("./test-score.model")(connection);


db.candidates.hasMany(db.candidateScore, { as: "testScore" });
// db.candidates.hasMany(db.candidateScore);
db.candidateScore.belongsTo(db.candidates, {
    foreignKey: "candidateId",
    as: "candidate",
});

module.exports = db;