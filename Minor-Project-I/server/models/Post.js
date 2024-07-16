const mongoose= require('mongoose');

const Schema= mongoose.Schema;
const PostSchema= new Schema({
    title:{
      type: String,
      required:true
    },
    body:{
      type: String,
      required:true
    },
    // img:{
    //   data:Buffer,
    //   contentType:String,
    // },
    image:String,
    video:String,
    createdAt:{
      type: Date,
      default:Date.now
    },
    updatedAt:{
      type: Date,
      default:Date.now
    },
});

module.exports= mongoose.model('Post',PostSchema);