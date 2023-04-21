const dotenv = require("dotenv").config({ path: "./config/.env" });
const app = require("./app");

const PORT = process.env.PORT || 3000;
const MODE = process.env.MODE || "DEVELOPMENT";

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} on ${MODE} mode.`);
});
