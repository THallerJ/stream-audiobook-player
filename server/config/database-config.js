const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();

var mySession;

function createDb() {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const db = mongoose.connection;
	db.on("error", (error) => console.error(error));
	db.once("open", () => console.log("Connected to database"));

	// setup session store
	const sessionStore = new MongoDBStore({
		uri: process.env.MONGO_URI,
		collection: "sessions",
	});

	mySession = session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: { maxAge: 1000 * 3600 * 24 * 30 }, // 1 month
		store: sessionStore,
	});
}

function getSession() {
	return mySession;
}

module.exports = {
	createDb,
	getSession,
};
