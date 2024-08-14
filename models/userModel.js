import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'


// userio Schema
const Schema = mongoose.Schema
const userSchema = new Schema ({
    email: {type:String, required:true, unique: true},
    username:{type:String, required:true, unique: true},
    password:{type:String,required:true},
    role:{type:String,required:false} //palieku false nes dar po klaustuku kaip veiks

},{timestamps:true})

userSchema.statics.signup = async function(email, password,username) {
    if(!email || !password ||!username) {
        throw Error('Visi laukeliai yra privalomi.')
    }
    if(!validator.isEmail(email)) {
        throw Error('El. paštas jau egzistuoja.')
    }
    if(!validator.isStrongPassword(password,{minLength:5,minUppercase:1,minNumbers:1,minSymbols:0})) {
        throw Error('Slaptažodis pernelyg silpnas.')
    } //Passwordo parametrai dar keiciami

    const exists = await this.findOne({email})
    if(exists) {
        throw Error('El. paštas jau naudojamas.')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, username,password: hash,role:"user"})
    return user
}

userSchema.statics.login = async function(email, password) {
    if(!email || !password ) {
        throw Error('Visi laukeliai privalomi.')
    }
    const user = await this.findOne({email})
    if(!user) {
        throw Error('El. paštas neteisingas.')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error('Įvestas neteisingas slaptažodis.')
    }
    return user
}



// User modelio eksportas

export default mongoose.model('User', userSchema)
