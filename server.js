// PLAN:

// importing
import express from "express";

//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware

// db config

// magic stuff ??

// api routes
app.get("/", (req, res) => res.status(200).send("fart"));

// listeners
app.listen(port, () => console.log(`Listeningfdf sfs on localhost: ${port}`));
