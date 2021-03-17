import React, { useContext, useRef, useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Container,
  TextField,
} from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { HtmlTooltip } from "../shared/Tooltip";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "98%",
    backgroundColor: "#ffffff",
    margin: "10px auto 20px auto",
  },
  deleteButton: {
    float: "right",
  },
  name: {
    color: "#01313e",
    textTransform: "upperCase",
  },
  time: {
    color: "#01313e",
  },
  comment: {
    height: "32px",
  },
  text: {
    fontSize: "0.9em",
  },
  commentsH3: {
    color: "#ffffff",
    width:"100%",
    textAlign: "center"
  },
  avatar: {
    backgroundColor: "#ffffff",
    margin: "auto",
  },
  avatarOuter: {
    color: "#ffffff",
    padding: "20px",
    margin: "10px auto auto auto",
    textAlign: "center",
  },

  cardContent: { padding: "0" },
  commentInput: {
    width: "100%",
  },
  commentButton: {
    float: "right",
    margin: "10px auto 10px auto",
  },
  post: {
    marginTop: "40px",
  },
}));
function SinglePost(props) {
  const classes = useStyles();
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const { data } = useQuery(FETCH_POST_QUERY, { variables: { postId } });
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update(_, result) {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: { postId, body: comment },
  });
  const submitHandler = (e) => {
    e.preventDefault();
    submitComment().then();
  };

  function deletePostCallback(params) {
    props.history.push("/");
  }

  let postMarkUp;
  if (!data) {
    postMarkUp = <p>Loading post....</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;
    postMarkUp = (
      <Container>
         <Grid container className={classes.post}>
        <Grid lg={2} sm={12} xs={12} md={2} item>
          <div className={classes.avatarOuter}>
            <Avatar
              className={classes.avatar}
              floated="right"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
            <div className={classes.name}>{username}</div>
            <div className={classes.time}>{moment(createdAt).fromNow()}</div>
          </div>
        </Grid>
        <Grid lg={10} sm={12} xs={12} md={10} item>
          <Card className={classes.root}>
            <CardContent>
              <div className={`${classes.content} ck-content`}>
                <ReactMarkdown plugins={[gfm]}>{body}</ReactMarkdown>
              </div>
            </CardContent>
            <hr />
            <CardContent className={classes.cardContent}>
              <LikeButton user={user} post={{ id, likeCount, likes }} />
              <HtmlTooltip
                title={`${commentCount} comments on this article`}
                placement="top"
                arrow
              >
                <Button>
                  <ChatBubbleIcon color={"primary"} />
                  <span className={classes.text}> {commentCount}</span>
                </Button>
              </HtmlTooltip>
              <div className={classes.deleteButton}>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </div>
            </CardContent>
          </Card>
          <h2 className={classes.commentsH3}>Comments</h2>
          {user && (
            <Card className={classes.root}>
              <CardContent>
                <p>Post a comment</p>
                <form>
                  <div>
                    <TextField
                      type="text"
                      multiline
                      variant={"outlined"}
                      className={classes.commentInput}
                      placeholder="Start typing something.."
                      onChange={(event) => setComment(event.target.value)}
                      value={comment}
                      name="comment"
                      ref={commentInputRef}
                    />
                    <Button
                      className={classes.commentButton}
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={comment.trim() === ""}
                      onClick={submitHandler}
                    >
                      {" "}
                      submit
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {comments.map((comment) => (
            <Card key={comment.id} className={classes.root}>
              <CardContent>
                <div className={classes.name}>{comment.username}</div>
                <div className={classes.time}>
                  {moment(comment.createdAt).fromNow()}
                </div>
                {comment.body}
                <div className={classes.deleteButton}>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
  
      </Container>
       );
  }
  return postMarkUp;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
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

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
