const express = require("express");
const nedb = require("nedb");
const rest = require("express-nedb-rest");
const cors = require("cors");

const app = express();

const messagesDatastore = new nedb({
    filename: "messages.db",
    autoload: true
});

const usersDatastore = new nedb({
    filename: "users.db",
    autoload: true
});

const tunesDatastore = new nedb({
    filename: "tunes.db",
    autoload: true
});

const datesDatastore = new nedb({
    filename: "dates.db",
    autoload: true
});

const restAPI = rest();

restAPI.addDatastore("messages", messagesDatastore);
restAPI.addDatastore("users", usersDatastore);
restAPI.addDatastore("tunes", tunesDatastore);
restAPI.addDatastore("dates", datesDatastore);


app.use(cors());

app.use('/', restAPI);

app.listen(3000);