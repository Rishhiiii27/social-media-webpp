import React, { useState } from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss'
import {AiOutlineHeart} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { likeAndUnlikePost } from '../../redux/slices/postSlice'
import {AiFillHeart} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../redux/slices/appConfigSlice'
import { TOAST_SUCCESS } from '../../App'



function Post({post}) {

  const dispatch = useDispatch()
  const navigate = useNavigate(null);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);

  async function handlePostLiked(){
    dispatch(showToast({
      type: TOAST_SUCCESS,
      message: 'liked or unliked'
    }))
      dispatch(likeAndUnlikePost({
        postId:post._id
      }))
      setIsLiked(!isLiked);
  }
  return (
    <div className='Post'>
        <div className='heading' onClick={()=> navigate(`/profile/${post.owner._id}`)}>
            <Avatar  src={post?.owner?.avatar?.url}/>
            <h4 style={{color:'white'}}>{post?.owner?.name}</h4>
        </div>
        <div className='content'>
        <img src={post?.image?.url} alt=''/> 
        </div>
        <div className='footer'>
            <div  className={`like ${post?.isLiked ? 'clicked' : ''}`} onClick={handlePostLiked}>
              
              {isLiked?<AiFillHeart style={{color:'red'}} className='icons'/>:<AiOutlineHeart  className='icon'/>}
                
                <h4 style={{color:'white'}}>{`${post?.likesCount} likes`}</h4>
            </div>
            <p className='caption'>{post?.caption}</p>
            <h6 className='time-ago'>{post?.timeAgo}</h6>
        </div>
    </div>
  )
}

export default Post