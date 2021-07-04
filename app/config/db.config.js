module.exports = {
    host: "db-study.cvm7crkxeqnl.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "Admin#123",
    db: "task_interview",
    dialect: "mysql",
    pool: {
        max: 40,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};