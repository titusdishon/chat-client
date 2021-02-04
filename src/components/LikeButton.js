import { useMutation } from "@apollo/react-hooks";
import React, { useEffect, useState, useContext } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import gql from "graphql-tag";
import MyPopUp from "../utils/MyPopUp";

function LikeButton({ post: { id, likes, likeCount } }) {
  const { user } = useContext(AuthContext);
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
      return
    }
  });

  const LikeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <MyPopUp content={liked ?"Unlike post":"Like post"}>
      {LikeButton}
      </MyPopUp>
      <Label as="a" basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
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
