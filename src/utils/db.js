const mongoose = require("mongoose");
mongoose
    .connect(
        // "mongodb+srv://root:uauPNwi5HINC4kUx@cluster0.jdyxr.mongodb.net/updevsms_db?retryWrites=true&w=majority",
        "mongodb://127.0.0.1:27017/updevsms_db",
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    )
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
        console.log("DB Connection Error: " + err);
    });