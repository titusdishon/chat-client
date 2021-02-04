import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {usePost} from "../utils/hooks";

function PostForm(props) {
  const { values, onSubmit, onChange } = usePost(createPostCallBack, {
    body: "",
  });

  const [createPost,{error}, loading] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      if (data !== undefined) {
        data.getPosts = [result.data.createPost, ...data.getPosts];
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
        values.body = "";
      }
    },
    onError(err) {
      return;
    },
  });

  function createPostCallBack() {
    createPost();
    props.setOpen(false)
  }

  return (
    
    <div className="post-form">
      <Form onSubmit={onSubmit}  className={loading ? "loading" : ""}>
        <h2>Create a post</h2>
        <CKEditor
          editor={ClassicEditor}
          data=""
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = {body:editor.getData()};
            console.log("Editor is ready to use!", editor);
            onChange(data);
          }}
          // onBlur={(event, editor) => {
          //   console.log("Blur.", editor);
          // }}
          // onFocus={(event, editor) => {
          //   console.log("Focus.", editor);
          // }}
        />
        <br/>
        <br/>
        <Button type="submit" color="grey" onClick={()=>props.setOpen(false)}>cancel</Button>
        <Button type="submit" className="post-submit" color="teal">submit</Button>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
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
