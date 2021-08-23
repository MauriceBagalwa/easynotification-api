const mongoose = require("mongoose");
mongoose
    .connect(
        // "mongodb+srv://root:uauPNwi5HINC4kUx@cluster0.jdyxr.mongodb.net/updevsms_db?retryWrites=true&w=majority",
        "mongodb://127.0.0.1:27017/updevsms_db",
        // mongo --host 91.234.194.225 --authenticationDatabase "bienfafood_db" -u "updev_luccin" -p M7Ve59cGF3ib
        // "mongodb://updev_luccin:M7Ve59cGF3ib@91.234.194.225/bienfafood_db",
        // "mongodb://updev_maurice:bin2431kin@91.234.194.225/bienfafood",

        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    )
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
        console.log("DB Connection Error: " + err);
    });