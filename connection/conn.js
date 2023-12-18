const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose
  .connect(
    "mongodb+srv://bhavitha:Bhavitha_0901@cluster0.lvjhdc4.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then((res) => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Connection Error !" + err.message);
  });
