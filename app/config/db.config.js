module.exports = {
    host: "localhost",
    user: "admin",
    password: "123456",
    db: "task_interview",
    dialect: "mysql",
    pool: {
        max: 40,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};