import React from "react";
import node from "../assets/images/node.png"
import git from "../assets/images/git.png"
import js from "../assets/images/js.png"
import mongo from "../assets/images/mongo.jpeg"
import linux from "../assets/images/linux.png"
import code from "../assets/images/code.png"
import react from "../assets/images/react.png"
import go from "../assets/images/golang.jpeg"
import grpc from "../assets/images/grpc.png"
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Typography
} from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const parallaxStyle = makeStyles((theme) => ({
    parallax: {
        height: "90vh",
        maxHeight: "1000px",
        overflow: "hidden",
        position: "relative",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        margin: "0",
        color: "#ffffff",
        background: "#ffffff",
        padding: "0",
        border: "0",
        display: "flex",
        alignItems: "center"
    },
    container: {
        paddingTop: '80px',
    },
    gridContent: {
        color: "#000000",
        letterSpacing: "0.5em",
        paddingTop: '74px',
        fontFamily: "'Source Code Pro', monospace",
        backgroundColor: "#ffffff",
    },
    text: {
        padding: "120px 10px 0 10px",
        fontFamily: "'Source Code Pro', monospace",
        letterSpacing: "0.1em",
    },
    textMobile: {
        padding: "10px 10px 0 10px",
        fontFamily: "'Source Code Pro', monospace",
        letterSpacing: "0.1em",
    },
    innerText: {
        fontFamily: "'Source Code Pro', monospace",
        letterSpacing: "0.02em",
    },
    mobileView: {
        paddingTop: "100px !important",
        height: "70vh"
    },
}));

function Stack(props) {
    const classes = parallaxStyle();
    const {mobileView} = props;
    return <Grid sm={12} xs={12} lg={8} md={7} className={!mobileView && classes.gridContent} item>
        <div className={mobileView ? classes.textMobile : classes.text}>
            <h1>Hello, Let's talk about javascript and Go</h1>
            <Grid container>
                <Grid sm={12} xs={12} lg={6} md={6} item>
                    <Typography variant={"h6"} className={classes.innerText}>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    <Typography variant={"h5"}>Web development skills</Typography>
                                </ListSubheader>
                            }
                            className={classes.root}
                        >
                            <Divider/>
                            <ListItem button>
                                <ListItemIcon>
                                    <Avatar alt="Node" src={node}/>
                                </ListItemIcon>
                                <ListItemText primary="Node js"/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Avatar alt="React" src={react}/>
                                </ListItemIcon>
                                <ListItemText primary="React js, React redux, Jest, React testing library"/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Avatar alt="Js" src={js}/>
                                </ListItemIcon>
                                <ListItemText primary="Javascript (Es6)"/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Avatar alt="Golang" src={go}/>
                                </ListItemIcon>
                                <ListItemText primary="Go Programming"/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Avatar alt="Mongo" src={mongo}/>
                                </ListItemIcon>
                                <ListItemText primary="Mongo Database"/>
                            </ListItem>
                        </List>
                    </Typography>
                </Grid>
                <Grid sm={12} xs={12} lg={6} md={6} item>
                    <Typography variant={"h6"} className={classes.innerText}>
                        <br/>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.root}
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <Avatar alt="Grpc" src={grpc}/>
                                </ListItemIcon>
                                <ListItemText primary="Grpc"/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Avatar alt="Git" src={git}/>
                                </ListItemIcon>
                                <ListItemText primary="Git"/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Avatar alt="Linux" src={linux}/>
                                </ListItemIcon>
                                <ListItemText primary="Linux servers setup"/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Avatar alt="Web Development" src={code}/>
                                </ListItemIcon>
                                <ListItemText primary="Web development"/>
                            </ListItem>
                        </List>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    </Grid>
}

export default Stack