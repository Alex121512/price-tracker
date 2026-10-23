const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const ROLES = ['admin', 'manager', 'rep'];

const UserSchema = new Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    role: { type: String, required: true, enum: ROLES, default: 'rep' },
},
    { timestamps: true },
);

UserSchema.plugin(passportLocalMongoose.default);

module.exports = mongoose.model('User', UserSchema);
module.exports.ROLES = ROLES;

