const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const UserSchema = Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        lowerCase: true,
        required: [true, 'Email is required'],
        validate: {
            validator(email) {
                return validator.isEmail(email);
            },
            message: '{VALUE} is not a valid email'
        }
    },
    name: { type: String, required: [true, 'name is required'] },
    password: { type: String, required: [true, 'password is required'] },
    picture: { type: String },
    isSeller: { type: Boolean, default: false },
    address: {
        add1: String,
        add2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },
    created: { type: Date, default: Date.now() }
});

UserSchema.plugin(uniqueValidator, {
    message: '{VALUE} is already taken'
});

UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password);
        // bcrypt.hash(this.password , null , null , function(err,hash){
        //     if(err) return next();
        //     this.password = hash;
        // });
    }
    return next();
});


UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.gravatar = function(size) {
    if (!this.size) size = 200;
    if (!this.email) return 'https://gravatar.com/?s' + size + '&d=retro';
    let md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar' + md5 + '?s' + size + '&d=retro';
}


module.exports = mongoose.model('User', UserSchema);