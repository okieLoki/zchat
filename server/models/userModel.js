const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        dob: { type: Date, required: true },
        picture: { type: String, default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' }
    },
    {
        timestamps: true
    }
)

//eHhA8Si0gZqmAzH4

userSchema.methods.matchPassword = async function(enterredPass){
    return await bcrypt.compare(enterredPass, this.password)
}

userSchema.pre('save', async function(next){
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

exports.User = mongoose.model('User', userSchema)