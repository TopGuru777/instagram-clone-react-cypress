import React, {useState, Fragment,  useEffect, useContext} from "react";
import TruncateMarkup from "react-truncate";
import {FiHeart} from "react-icons/fi";
import {FaHeart} from "react-icons/fa";
import { withRouter } from "react-router";
// import {AppContext} from "../../Context";


const Commment =(props)=>{
    var {comment, replayFunc, postIndex , commentIndex , handleLikingComments, postOwnerId, myName, uid, userAvatar, changeModalState, contentURL, contentType, deleteComment} = props;
    const [viewSubComments, setSubComments] = useState(false); 
    const [postLiked, setPostLiked] = useState(false);
    useEffect(()=>{
        setPostLiked(comment?.likes.some(el => el.id === uid));
    },[comment?.likes])
    // const context = useContext(AppContext);
    // const browseUser = (specialUid) => {
    //     const {getUsersProfile, notify} = context;
    //     if (specialUid) {
    //       getUsersProfile(specialUid).then((res)=>{
    //         props.history.push(`/user-profile`);
    //       }).catch((err) =>{
    //         notify(err && err.message ||"error has occurred. please try again later!", "error");
    //       });
         
    //     }
    //   };
    return(
        <Fragment>
        <div className="post--comment--item">
               <div className="flex-row post--comment--row">
                <span  title={comment?.userName} className="post__top__comment flex-row">
                      <strong>{comment?.userName}</strong> <p className="comment__text w-100">
                          <TruncateMarkup className="w-100" line={1} ellipsis="...">{comment?.comment}</TruncateMarkup>
                          </p>
                </span>   

                   {
                       !postLiked ?
                       <span onClick={()=>  handleLikingComments("comment",true, postIndex, postOwnerId, myName, userAvatar, uid, commentIndex, comment?.comment, contentURL, contentType, comment?.likes)}
                           ><FiHeart/></span>
                       :
                           <span onClick={()=>  handleLikingComments("comment",false, postIndex , postOwnerId, myName, userAvatar, uid, commentIndex, comment?.comment, contentURL, contentType, comment?.likes)} 
                               style={{
                                   animation: "boundHeart 0.5s forwards ease"
                               }}
                           className="liked__heart"><FaHeart/></span>
                   }  
               </div>
              
               <div className="post--comment--actions flex-row">
                      {
                          comment.likes?.length >=1 ?
                             <span className="acc-action" onClick={()=> changeModalState("users",true, comment?.likes, "likes")}>{comment.likes?.length.toLocaleString()} {comment.likes?.length > 1 ? "likes" : "like"}</span>
                          : null
                      } 
                       <span style={{cursor:"pointer"}} onClick={()=> {replayFunc(comment?.userName, commentIndex , postIndex, comment?.postId , comment?.ownerId, uid); setSubComments(true)}}> Replay</span>      
                    {
                        comment?.uid === uid && (<span style={{cursor:"pointer"}} className="ml-1" onClick={() => deleteComment("comment", comment?.uid, comment?.postId, comment?.commentId ,postIndex,commentIndex)}>Delete</span>)
                    }                             
               </div>
                    {
                        comment.subComments?.length >=1 ? 
                        <div>
                           <span className="post__view__replies__btn" onClick={()=> setSubComments( !viewSubComments)}> — {viewSubComments ? "Hide": "View"} replies ({comment.subComments?.length})</span>
                             {
                                 viewSubComments ?
                                       <ul className="sub--comments--nav">
                                               {
                                                   comment && comment.subComments.length > 0 && comment.subComments?.map( (subComment, i )=>{
                                                       return(
                                                        <li
                                                            key={i} title={subComment?.senderName} className="post--comment--item">
                                                            <div className="flex-row post--comment--row">
                                                                <div  title={comment?.userName} className="post__top__comment flex-row">
                                                                    <strong>{subComment?.senderName}</strong>
                                                                    <span> {subComment?.commentText}</span>
                                                                </div>
                                                                {
                                                                    !subComment?.likes?.some(el => el.id === uid) ?
                                                                    <span onClick={()=>  handleLikingComments("subComment",true, postIndex, postOwnerId, myName, userAvatar, uid, commentIndex, subComment?.commentText, contentURL, contentType, i, subComment?.subCommentId)}
                                                                        ><FiHeart/></span>
                                                                    :
                                                                        <span onClick={()=>  handleLikingComments("subComment",false, postIndex, postOwnerId, myName, userAvatar, uid, commentIndex, subComment?.commentText, contentURL, contentType, i, subComment?.subCommentId)} 
                                                                            style={{
                                                                                animation: "boundHeart 0.5s forwards ease"
                                                                            }}
                                                                        className="liked__heart"><FaHeart/></span>
                                                                }  
                                                            </div>
                                                            <div className="post--comment--actions flex-row">
                                                                    {
                                                                        subComment?.likes?.length >=1 ?
                                                                            <span className="acc-action" onClick={()=> changeModalState("users",true, subComment?.likes, "likes")}>{subComment?.likes?.length.toLocaleString()} {subComment?.likes?.length > 1 ? "likes" : "like"}</span>
                                                                        : null
                                                                    } 
                                                                    <span style={{cursor:"pointer"}} onClick={()=> {replayFunc(comment?.userName, commentIndex , postIndex, comment?.postId , comment?.ownerId, uid); setSubComments(true)}}> Replay</span>      
                                                                    {
                                                                        subComment?.senderUid === uid && (<span style={{cursor:"pointer"}} className="ml-1" onClick={() => deleteComment("subComment", subComment?.senderUid, comment?.postId, comment?.commentId ,postIndex,commentIndex, subComment?.subCommentId, i )}>Delete</span>)
                                                                    }                             
                                                            </div>
                                                        </li>
                                                    )
                                                   })
                                               }
                                       </ul>
                                   : null
                             }  
                       </div>
                       : null
                    }   
                    
               </div>
        </Fragment>
    )
}
export default withRouter(Commment);