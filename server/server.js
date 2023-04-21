const dotenv = require("dotenv").config({ path: "./config/.env" });
const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV;

connectDatabase();

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} on ${MODE} mode.`);
});
