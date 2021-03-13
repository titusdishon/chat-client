import React from "react";
import {useQuery} from "@apollo/react-hooks";
import PostCard from "../components/PostCard";
import {FETCH_POSTS_QUERY} from "../utils/graphql";
import {Container, Grid, Grow, makeStyles} from "@material-ui/core";
import MenuBar from "../components/Menu/MenuBar";

const useStyles = makeStyles(() => ({
    header: {
        fontWeight: "bold",
        color: "#ffffff",
    },
    like: {
        padding: "10px",
        backgroundColor: "#000000",
        marginBottom: "20px",
    }
}));

function Home() {
    const {loading, data} = useQuery(FETCH_POSTS_QUERY);
    const classes = useStyles();
    return (
        <Container>
            <MenuBar/>
            <div className="page-title">
                <h3 className={classes.header}>Recent Posts</h3>
            </div>
            <div className={loading ? "loading" : ""}/>
            <br/>
            <Grid container>
                {loading ? (
                    <div className="loading">..loading posts..</div>
                ) : (
                    <Grow in={true} mountOnEnter unmountOnExit>
                        <div style={{width: "100%", justifyContent: "center"}}>
                            <Grid container spacing={2}>
                                {data &&
                                data.getPosts.map((post) => (
                                    <Grid lg={12} sm={12} md={12} xs={12} key={post.id} item>
                                        <PostCard post={post}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Grow>
                )}
            </Grid>
        </Container>
    );
}

export default Home;
