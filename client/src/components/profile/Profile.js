import React, { useEffect, useState } from 'react'
import './Profile.scss'
import Post from '../post/Post'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postSlice'
import { followAndUnfollowUser } from '../../redux/slices/feedSlice'
import dummyUserImg from '../../assets/user.png'



function Profile() {

    const navigate = useNavigate();
    const params = useParams();
    const userProfile = useSelector(state=> state.postReducer.userProfile)
    const myProfile = useSelector(state=> state.appConfigReducer.myProfile)
    const feedData = useSelector(state=> state.feedDataReducer.feedData)
    const dispatch = useDispatch();
    const[isMyProfile,setisMyProfile]=useState(false)
    const[isFollowing,setIsFollowing]=useState(false)

    useEffect(()=>
    {
      dispatch(getUserProfile({
        userId:params.userId 
      }))

      setisMyProfile(myProfile?._id === params.userId);
      setIsFollowing(feedData?.followings?.find(item=> item._id === params.userId))

    },[dispatch,myProfile,params.userId,feedData])
    console.log('this is userprofile',userProfile)

    function handleUserFollow(){
      dispatch(followAndUnfollowUser({
        userIdToFollow: params.userId}))
    }

  return (
    
    <div className='Profile'>
        <div className='container'>
            <div className="left-part">
              {isMyProfile &&  <CreatePost/>}
                {userProfile?.result?.posts?.map(post => <Post key={post._id} post={post}/>)}
            </div>
            <div className="right-part">
                <div className="profile-card">
                    <img className='user-img' src={userProfile?.result?.avatar?.url || dummyUserImg} alt=''/>
                    <h3 className='user-name'>{userProfile?.result?.name}</h3>
                    
                    <p className='bio'>{`Bio : ${userProfile?.result?.bio}`}</p>
                    <div className="follower-info">
                        <h4 style={{color:'white'}}>{`${userProfile?.result?.followers?.length} Followers`}</h4>
                        <h4 style={{color:'white'}}>{`${userProfile?.result?.followings?.length} Followings`}</h4>
                    </div>
                    {!isMyProfile &&  (<h5 
                          style={{marginTop:'10px'}}
                          onClick={handleUserFollow}
                          className=
                          {isFollowing?'hover-link  follow-link':'btn-primary'}>
                          {isFollowing?'Unfollow':'Follow'}
          </h5>)}
                   {isMyProfile && <button 
                    className='update-profile btn-secondary'
                    onClick={()=> {navigate('/updateProfile')}} > Update Profile</button>}
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile