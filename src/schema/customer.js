const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { hashPassword } = require('../utils/middleware')
/*#Simple format*/

const formatStr = {
    type: String,
    required: [true, "The path is required."],
    // unique: true
};

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

var codevalidation = function (length) {
    return Math.floor(
        Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
    );
};

/*#Schema Customer*/
const customerSchema = new Schema({
    name: { type: String, required: [true, "Path `name` is required."], lowercase: true, },
    rccm: {
        type: String,
    },
    codePays: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, "Path `number` is required."],
        min: [6, "Must be at least 6, got {VALUE}."],
        max: [15, "Must be 15 characters or less, got {VALUE}."],
    },
    email: {
        type: String,
        lowercase: true,
        required: "Email address is required",
        validate: [validateEmail, "Please fill a valid email address."],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    adresse: {
        type: String,
    },
    signature: {
        type: String,
        lowercase: true,
        required: [true, 'The pah `siganture` is required.'],
        min: [3, "Must be at least 3, got {VALUE}"],
        max: [15, "Must be 15 characters or less, got {VALUE}."],
    },
    sms: { type: Number, default: 0 },
    password: { type: String, required: true },
    activated: {
        type: Boolean,
        default: false
    },
    codeValidation: {
        type: Number
    }
}, { timestamps: true });

customerSchema.pre('save', async function (next) {
    try {
        // #criptage du mot de passe async
        this.password = hashPassword(this.password)
        // #code de validation (code à 6 chiffres)
        this.codeValidation = codevalidation(6);
        next();
    } catch (err) {
        next(err)
    }
});
// #
customerSchema.methods.comparePassword = function (customerPassword, cb) {
    bcrypt.compare(customerPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}
//#
const Customer = mongoose.model("Customers", customerSchema);
module.exports = Customer;