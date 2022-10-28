const mongoose = require('mongoose')


const authSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:[true,'Full Name is required']
    },
    email:{
        type: String,
        required:[true,'Email is required']
    },
    phoneNumber:{
        type: String,
        required:[true,'Phone Number is required']
    },
    job:{
        type: String,
        required:[true,'Job is required']
    }
},
{
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})


const Auth = mongoose.model('Auth', authSchema)

module.exports = Auth