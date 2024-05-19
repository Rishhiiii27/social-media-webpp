import React, { useEffect } from 'react'
import "./Feed.scss"
import Post from '../post/Post'
import Follower from '../follower/Follower'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../redux/slices/feedSlice'

function Feed() {

    const dispatch = useDispatch();
    const feedData = useSelector(state=> state.feedDataReducer.feedData);

    useEffect(()=>
    {
        dispatch(getFeedData())
    },[dispatch])

  return (
    <div className='Feed'>
        <div className='container'>
            <div className='left-part'>
                {feedData?.posts?.map(post=> <Post key={post._id} post={post}/>)}
            </div>
           
            <div className='right-part'>
                <div className='following'>
                    <h3 className='title'>You Are Following</h3>
                  <div> {feedData?.followings?.map( user=> <Follower  key={user._id} user={user} style={{ color: 'white' }} />)}</div>
                </div>
                <div className='suggestions'>
                    <h3 className='title'>Suggested for you</h3>
                    {feedData?.suggestions?.map(user=> <Follower key={user._id} user={user}/>)}
                </div>
            </div>
        </div>    
    </div>
  )
}

export default Feed