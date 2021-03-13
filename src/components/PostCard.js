import React, {useContext, useEffect} from "react";
import moment from "moment";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import Card from '@material-ui/core/Card';
import {red} from "@material-ui/core/colors";
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import Typography from '@material-ui/core/Typography';
import {Button, Divider, Grid, makeStyles} from "@material-ui/core";
import {HtmlTooltip} from "../shared/Tooltip";
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '98%',
        backgroundColor: "#ffffff",
        margin: "10px",
    },
    expand: {
        float: "right"
    },
    content: {
        width: "98%",
        margin:"auto",
    },
    avatar: {
        marginTop: "10px",
        marginLeft: "10px",
        borderRadius: "0",
        backgroundColor: red[500],
    },
    cardFooter: {
        width: "100%",
        paddingTop: "10px",
    },
    body: {
        width: "100%",
        paddingBottom: "20px",
    },
    moreData:{
        margin:"10px auto auto 10px"
    }
}));

function PostCard({
                      post: {body, createdAt, username, id, likes, likeCount, commentCount},
                  }) {
    const {user} = useContext(AuthContext);
    const classes = useStyles();
    useEffect(() => {
        console.log("CODE", body)
    }, [body])
    return (
        <Card className={classes.root}>
            <Grid container className={classes.body}>
                <Grid xs={2} lg={2} md={2} item>
                    <Avatar aria-label="recipe"
                            className={classes.avatar}
                            src="https://react.semantic-ui.com/images/avatar/large/molly.png"/>
                    <div className={classes.moreData}>
                        <Typography variant="body2" color="textSecondary" component="p">{username}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">{moment(createdAt).fromNow()}</Typography>
                    </div>
                </Grid>
                <Grid xs={10} lg={10} md={10} item>
                    <div className={`${classes.content} ck-content`}><ReactMarkdown plugins={[gfm]}>{body}</ReactMarkdown></div>
                </Grid>
            </Grid>
            <Divider/>
            <div className={classes.cardFooter}>
                <LikeButton post={{id, likes, likeCount}}/>
                <HtmlTooltip title={`${commentCount} comments on this article`} placement="top" arrow>
                    <Button>
                        <Link to={`/posts/${id}`}>
                            <CommentIcon color={"primary"}/>{" "}{commentCount}
                        </Link>
                    </Button>
                </HtmlTooltip>
                <HtmlTooltip title={`Sure you want to delete this article?`} placement="top" arrow>
                    <div className={classes.expand}>
                        {user && user.username === username && <DeleteButton postId={id}/>}
                    </div>
                </HtmlTooltip>
            </div>
        </Card>
    );
}

export default PostCard;
