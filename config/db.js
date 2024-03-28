const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: "localhost",
  dialect: "postgres",
});

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to DB")
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connectToDB };
