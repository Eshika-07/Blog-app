const express=require("express");
const router= express.Router();
const Post= require('../models/Post');

/**
 GET /
 HOME
 */
router.get('',async(req,res)=>{
  try{
    let perPage=6;
    let page=req.query.page || 1;

    const data= await Post.aggregate([{$sort:{createdAt:-1}}])
    .skip(perPage * page-perPage)
    .limit(perPage)
    .exec();

    const count = await Post.countDocuments();
    const nextPage= parseInt(page)+1;
    const hasNextPage= nextPage <= Math.ceil(count/perPage);

    res.render("index",{data,current:page,nextPage:hasNextPage ? nextPage:null,});
  }
  catch(error){
    console.log(error);
  }  
});


/**
 GET /
 *Post :id
 */
router.get('/post/:id',async(req,res)=>{
  try{

    let slug=req.params.id;
    const data= await Post.findById({_id:slug});

    const locals={
      title: data.title,
      description: "Simple blog created with NodeJs, Express & MongoDb",
    }
    res.render("post",{locals,data});
  }
  catch(error){
    console.log(error);
  }  
});

/**
 POST /
 *Post : searchTerm
 */
router.post('/search',async(req,res)=>{
  try{

    let searchTerm= req.body.searchTerm;
    const searchNoSpecialChar= searchTerm.replace(/[^a-zA-Z0-9]/g,"")

    const data= await Post.find({
      $or:[
        {title:{$regex: new RegExp(searchNoSpecialChar,'i')}},
        {body:{$regex: new RegExp(searchNoSpecialChar,'i')}}
      ]
    });
    res.render("search",{data});
  }
  catch(error){
    console.log(error);
  }  
});


/**
 GET /
 ABOUT
 */
router.get('/about',(req,res)=>{
  res.render("about");
});

// router.get('',async(req,res)=>{
//   try{
//     const data= await Post.find();
//     res.render("index",{data});
//   }
//   catch(error){
//     console.log(error);
//   }  
// });

router.get('/contact',(req,res)=>{
  res.render("contact");
});






// function insertPostData(){
//   Post.insertMany([
//     {
//       title:"Building a blog",
//       body:"This is the body text"
//     },
//     {
//       title:"Conent Writing",
//       body:"This is the content"
//     },
//     {
//       title:"Stroy Telling",
//       body:"This is the power of story telling"
//     },
//     {
//       title:"Science fiction",
//       body:"This is the post regarding a science fiction"
//     },
//     {
//       title:"Horror world",
//       body:"This is the blog about horror world"
//     },
//     {
//       title:"Health Concern",
//       body:"This is the blog about health issues"
//     },
//     {
//       title:"Study smart not hard",
//       body:"This is the blog about studying tips"
//     },
//     {
//       title:"Not every thing is important in life",
//       body:"This is the blog about your inner concisence"
//     },
//     {
//       title:"As you so shall you reap",
//       body:"This is the blog about the karma"
//     },
//     {
//       title:"Discipline",
//       body:"This is the blog about the importance of discipline in life"
//     },
//     {
//       title:"Gym",
//       body:"This is the blogabout gym"
//     },
//     {
//       title:"New Trends",
//       body:"This is the blog about new trends in the world of technology"
//     },
//     {
//       title:"Fashion",
//       body:"This is the blog about latest trends in fashion technology"
//     },
//     {
//       title:"Sports",
//       body:"This is the blog about latest trends in sports"
//     },
//   ])
// }
// insertPostData();

module.exports=router;