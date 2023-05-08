const dotenv = require("dotenv").config({ path: "./configs/.env" });
const app = require("./app");
const connectDatabase = require("./configs/database");

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
	console.log(`ERROR: ${err.stack}`);
	console.log("Shutting down server due to uncaught exception");
	process.exit(1);
});

const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV;

connectDatabase();

const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} on ${MODE} mode.`);
});

// Handle unhandled promise rejections

process.on("unhandledRejection", (err) => {
	console.log(`ERROR: ${err.message}`);
	console.log("Shutting down the server due to Unhandled Promise rejection");
	server.close *
		(() => {
			process.exit(1);
		});
});
