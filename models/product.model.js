const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  brand:{
    type:String
  },

  category:{
    type:String,
    required:true
  },

  price:{
    type:Number,
    required:true
  },

  stock:{
    type:Number,
    default:0
  },

  description:{
    type:String
  },

  image:{
    type:String
  },

  specifications:{
    type:Object
  },

  status:{
    type:String,
    enum:["active","out_of_stock"],
    default:"active"
  }

},{
  timestamps:true
})

module.exports = mongoose.model("Product",productSchema)