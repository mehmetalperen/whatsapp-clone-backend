// PLAN:

// importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js"; //schema for the db

//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware

// db config
const mongoodbConnectionURL = `mongodb+srv://admin:Jq7oDAr0qpikxOAx@cluster0.s7lqsix.mongodb.net/whatsappclone?retryWrites=true&w=majority`; //security risk. hide this on deployment

mongoose.connect(mongoodbConnectionURL);

// magic stuff ??

// api routes
app.get("/", (req, res) => res.status(200).send("fart"));

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
