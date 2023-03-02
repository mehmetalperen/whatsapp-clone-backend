// PLAN:

// importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher"; // to make our db real time. a middleware between front ent and the backend. whenever we push a message to our db, pusher gets notified bc it is always listening the backend. when that happens, pusher tells frontend to make a fetch req
import cors from "cors";
//app config
const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
  appId: "1562349", // hide these upon deployment
  key: "b23f5e99ce5b8bebe530",
  secret: "df20a359e9c71a36f78e",
  cluster: "us3",
  useTLS: true,
});

//middleware
app.use(express.json());
app.use(cors()); // BIG SECURITY RISK FIX THIS BEFORE DEPLOYMENT
// db config
const mongoodbConnectionURL = `mongodb+srv://admin:Jq7oDAr0qpikxOAx@cluster0.s7lqsix.mongodb.net/whatsappclone?retryWrites=true&w=majority`; //security risk. hide this on deployment

mongoose.connect(mongoodbConnectionURL);

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB is connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
      });
    } else {
      console.log("Error trigering pusher");
    }
  });
});

// api routes
app.get("/", (req, res) => res.status(200).send("working"));

app.get("/messages/sync", (req, res) => {
  Messages.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  //this code returns all the messages in the db
  //for simplictiy of my learning, i will have only one messaging room, so will be dislplaying messages from that room only
});

app.post("/api/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => res.status(500).send(err));
});

// listeners
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
