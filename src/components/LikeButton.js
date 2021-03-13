import {useMutation} from "@apollo/react-hooks";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/auth";
import gql from "graphql-tag";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    liked: {
        color: "red",
        float: 'left',
    },
    notLiked: {
        color: "green",
        float: 'left',
    },
}));
function LikeButton({ post: { id, likes, likeCount } }) {
    const {user} = useContext(AuthContext);
    const classes = useStyles();
    const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    }else{
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost]=useMutation(LIKE_POST_MUTATION,{
    variables:{postId:id},
    onError(){
    }
  });

  const LikeButton = user ? (
    liked ? (
        <Button className={classes.liked}>
            <FavoriteIcon/>{likeCount}
        </Button>
    ) : (
        <Button className={classes.notLiked}>
            <FavoriteIcon/>{likeCount}
        </Button>
    )
  ) : (
      <Button className={classes.notLiked}>
          <FavoriteIcon/>{likeCount}
      </Button>
  );

  return (
      <div onClick={likePost}>
          {LikeButton}
      </div>
  );
}


const LIKE_POST_MUTATION=gql`
   mutation likePost($postId:String!){
     likePost(postId:$postId){
       id likes{
         id username
       }
       likeCount
     }
   }
`
export default LikeButton;
