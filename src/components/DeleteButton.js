import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import MyPopUp from "../utils/MyPopUp";

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutations = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrMutation] = useMutation(mutations, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      if (data !== undefined && !commentId) {
        data.getPosts = data.getPosts.filter(
          (p) => p.id.trim() !== postId.trim()
        );
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
        if (callback) callback();
      }
      //TODO: Remove post from cache
    },
    onError(err) {
      return;
    },
    variables: { postId, commentId },
  });
  return (
    <>
      <MyPopUp
        content={commentId?"Delete this comment":"Delete this post"}>
        <Button
            color="red"
            to=""
            as="div"
            onClick={() => setConfirmOpen(true)}
            floated="right"
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
      </MyPopUp>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
