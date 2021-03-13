import React, {useContext} from "react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {FETCH_POSTS_QUERY} from "../utils/graphql";
import {usePost} from "../utils/hooks";
import {Button, Grid, makeStyles} from "@material-ui/core";
import {Link, Redirect} from "react-router-dom";
import {AuthContext} from "../context/auth";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import {editorConfiguration} from "../shared/EditorConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    backgroundColor: "#ffffff",
    padding: " 90px auto auto auto",
    margin: " auto ",
  }
}));


function PostForm() {
  const {values, onSubmit, onChange} = usePost(createPostCallBack, {
    body: "",
  });
  const classes = useStyles();
  const {user} = useContext(AuthContext);
  const [createPost, {error}, loading] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      if (data !== undefined) {
        data.getPosts = [result.data.createPost, ...data.getPosts];
        proxy.writeQuery({query: FETCH_POSTS_QUERY, data});
        values.body = "";
      }
    },
    onError(err) {
    },
  });

  function createPostCallBack() {
    createPost()
  }

  return (
      <div>
        <Grid container className={classes.root}>
          {user ? <Grid xs={12} lg={12} md={12} sm={12} item>
            <form onSubmit={onSubmit} className={loading ? "loading post-form" : "post-form"}>
              <h2>Create a post</h2>
              <CKEditor
                  editor={ Editor }
                  config={ editorConfiguration }
                  onChange={ ( event, editor ) => {
                    const data = {body:editor.getData()};
                    console.log("DATA DATA", data)
                    onChange(data);
                  } }
              />
              <br/>
              <Button variant="contained" color="default"> <Link to={"/"}>cancel</Link></Button>
              <Button type="submit" className="post-submit" variant="contained" color="primary">submit</Button>
            </form>
            {error && (
                <div className="ui error message">
                  <ul className="list">
                    <li>"An error occurred"</li>
                  </ul>
                </div>
            )}
            <br/>
            <br/>
            <br/>
          </Grid> : <Redirect to={"/"}/>}
        </Grid>
      </div>
  );
}

//graphql mutations
const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      likes {
        id
        username
      }
      likeCount
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
