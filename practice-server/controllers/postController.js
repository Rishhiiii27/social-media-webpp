const getAllPostsController = async(req,res)=>
{
    console.log('id value id',req._id)
    return res.send("these are all your posts")
}

module.exports ={getAllPostsController}