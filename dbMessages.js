import mongoose from "mongoose";

const whatsappSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

// collection. We are watching this with pusher middleware we installed. whenever there is a change in this
//collection, pusher will know
export default mongoose.model("messagecontents", whatsappSchema);
