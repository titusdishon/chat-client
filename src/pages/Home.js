import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { Button, Modal } from "semantic-ui-react";

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  return (
    <Grid divided>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
        <div  className={loading ? "loading" : ""}/>
      <Grid.Row>
        {user && (
          <Grid.Column>
              <Modal
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  trigger={<Button >Create Post</Button>}>
                  <Modal.Content image>
                      <PostForm  setOpen={(e)=>setOpen(e)}/>
                  </Modal.Content>
              </Modal>
          </Grid.Column>
        )}
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1 className="loading">..loading posts..</h1>
        ) : (
          <Transition.Group>
            {data &&
              data.getPosts.map((post) => (
                <Grid.Column
                  key={post.id}
                  mobile={16}
                  tablet={16}
                  computer={16}
                  style={{ margin: "auto", alignItems: "center" }}
                >
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
      
    </Grid>
  );
}

export default Home;
