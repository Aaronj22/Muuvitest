const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['patient', 'nurse'],
    default: 'patient',
  },
});

// static signup method
userSchema.statics.signup = async function (firstname, lastname, email, password, role) {
  // validation
  if ( !firstname || !lastname || !email || !password || !role) {
    throw Error('Kaikki kentät täytyy täyttää');
  }
  if (!validator.isEmail(email)) {
    throw Error('Sähköposti ei ole oikeassa muodossa');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Salasana ei ole tarpeeksi vahva');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Sähköposti on jo käytössä');
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ firstname, lastname, email, password: hash, role });
  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('Täytä kaikki kentät!');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Väärä sähköposti');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Väärä salasana');
  }
  return user;
};

module.exports = mongoose.model('User', userSchema);
