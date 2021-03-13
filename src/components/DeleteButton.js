import React, {useState} from "react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {FETCH_POSTS_QUERY} from "../utils/graphql";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {HtmlTooltip} from "../shared/Tooltip";

function DeleteButton({postId, commentId, callback}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutations = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
        proxy.writeQuery({query: FETCH_POSTS_QUERY, data});
        if (callback) callback();
      }
    },
    onError(err) {
    },
    variables: {postId, commentId},
  });
  return (
      <>
        <HtmlTooltip title={commentId ? "Delete this comment" : "Delete this post"} placement="top" arrow>
          <IconButton
              onClick={() => setConfirmOpen(true)}
              floated="right"
          >
            <DeleteIcon color={"secondary"}/>
          </IconButton>
        </HtmlTooltip>
        <Dialog
            fullScreen={fullScreen}
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Are sure you want to delete your comment?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              By deleting this comment means it will no longer be visible to viewers of this post
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setConfirmOpen(false)} color="primary" variant={"outlined"}>
              Cancel
            </Button>
            <Button onClick={deletePostOrMutation} color="secondary" variant={"contained"} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

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
