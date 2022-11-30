// Contact & progress with Database
const slugify = require('slugify')
const Blogs = require('../models/blogModel')
const { v4: uuidv4 } = require('uuid')

// Save data
exports.create = (req,res)=>{
    const {title,content,author} = req.body
    let slug = slugify(title)         // build url
    if(!slug) slug = uuidv4();        // if 'title' is all Thai lang. => slug is ''

    console.log({title,content,author})
    
    switch(true){           //Validate data
        case !title :       //use this case when title is null
            return res.status(400).json({error:'Please Input Title.'})
            break;
        case !content :     //use this case when content is null
            return res.status(400).json({error:'Please Input Content.'})
            break;
    }
    //Save data
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:'This title already avilable.'})
        }
        res.json(blog)
    })
}

// Request all data
exports.getAllBlog = (req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{      // find all data without condition
        res.json(blogs)
    })
}

// req interested content with ref. by slug
exports.singleBlog = (req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}

exports.remove = (req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            message:'Content Deleted!'
        })
    })
}

exports.update = (req,res)=>{
    const {slug} = req.params
    const {title,content,author} = req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}) // find {slug} , update {title,content,author} , {new:true} stil understand
    .exec((err,blog)=>{
        if(err) console.log(err)
        res.json(blog)
    })
}