const express = require('express')
const router = express.Router()
const { create , getAllBlog , singleBlog , remove , update } = require('../controllers/blogController')
const { requireLogin } = require('../controllers/authController')



router.post('/create',requireLogin,create)
router.get('/blogs',getAllBlog)
router.get('/blog/:slug',singleBlog)        //':slug' is paramiter
router.delete('/blog/:slug',requireLogin,remove)
router.put('/blog/:slug',requireLogin,update)

module.exports=router