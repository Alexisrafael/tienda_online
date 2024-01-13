const {Schema} = require("mongoose");
const mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate')

const ConjuntosSchema = new Schema({
    name:{type:String , required:true,lowercase:true},
    image:{type:Array},
    activo: { type: Boolean, default: true },
    price: {type:Number , required:true,lowercase:true}
})
ConjuntosSchema.plugin(findOrCreate)
module.exports = mongoose.model("Conjuntos", ConjuntosSchema)