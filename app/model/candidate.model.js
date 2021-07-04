const sequlize = require("sequelize");

const db = require("./index");

module.exports = (connection) => {
    const CandidateModel = connection.define("candidates", {
        id: { type: sequlize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: sequlize.STRING, field: "name" },
        emailId: { type: sequlize.STRING, field: "email_id" },
        createdAt: { type: sequlize.DATE, field: "created_at", defaultValue: sequlize.NOW },
        updatedAt: { type: sequlize.DATE, field: "updated_at", defaultValue: sequlize.NOW },
    }, {
        timestamps: true
    });

    return CandidateModel;

}