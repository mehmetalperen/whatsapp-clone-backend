// PLAN:

// importing
import express from "express";
import mongoose from "mongoose";

//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware

// db config
const mongoodbConnectionURL = `mongodb+srv://admin:Jq7oDAr0qpikxOAx@cluster0.s7lqsix.mongodb.net/whatsappclone?retryWrites=true&w=majority`;
mongoose.connect(mongoodbConnectionURL);

// magic stuff ??

// api routes
app.get("/", (req, res) => res.status(200).send("fart"));

// listeners
app.listen(port, () => console.log(`Listeningfdf sfs on localhost: ${port}`));
