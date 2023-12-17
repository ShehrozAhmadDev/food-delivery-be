import mongoose from "mongoose";
let Schema = mongoose.Schema;
let adminSchema = new Schema({
    isLogin: {
        type: String,
    },
});

module.exports = mongoose.model("Admin", adminSchema);