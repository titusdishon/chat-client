import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import Image from "../assets/images/dishon.png"
import Linkedin from "../assets/images/linkedin.png"
import Gmail from "../assets/images/gmail.png"
import Twitter from "../assets/images/twitter.png"
import mern from "../assets/images/mern.png"
import {Avatar, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Stack from "../stack/Stack";
import {Link} from "react-router-dom";


const parallaxStyle = makeStyles((theme) => ({
    parallax: {
        height: "90vh",
        overflow: "hidden",
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
    parallaxMobile: {
        height: "80vh",
        overflow: "hidden",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        marginTop: "57px",
        color: "#ffffff",
        padding: "0",
        border: "0",
        display: "flex",
        alignItems: "center"
    },
    small: {
        height: "380px"
    },
    text: {
        padding: "120px 10px 0 10px",
        fontFamily: "'Source Code Pro', monospace",
        letterSpacing: "0.5em",
    },
    mobileView: {
        paddingTop: "100px !important",
        height: "70vh"
    },
    gridImage: {
        backgroundImage: "url(" + Image + ")",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        height: "90vh",
        color: "#ffffff",
    },
    mern: {
        margin: "48vh auto  auto",
        width: "150px",
        height: "150px"
    },

    linkedin: {
        width:"50px",
        height:"50px",
    },
    gmail: {
        width:"50px",
        height:"50px",
    },
    twitter: {
        width:"50px",
        height:"50px",
    },
    social: {
        paddingTop:"20px",
        display:"flex",
        margin: "auto",
        justifyContent:"space-evenly"
    },
    mernMobile: {
        margin: "30vh auto  auto",
        textAlign: "center",
        width: "150px",
        height: "150px"
    },
    name: {
        textAlign: "center",
        fontSize:"2.3em",
        width: "100%",
        fontWeight: "bold"
    }
}));


function Parallax(props) {
    let windowScrollTop;
    if (window.innerWidth >= 768) {
        windowScrollTop = window.pageYOffset / 3;
    } else {
        windowScrollTop = 0;
    }
    const [transform, setTransform] = React.useState(
        "translate3d(0," + windowScrollTop + "px,0)"
    );
    React.useEffect(() => {
        if (window.innerWidth >= 768) {
            window.addEventListener("scroll", resetTransform);
        }
        return function cleanup() {
            if (window.innerWidth >= 768) {
                window.removeEventListener("scroll", resetTransform);
            }
        };
    });
    const [state, setState] = useState({
        mobileView: false,
    });
    const {mobileView} = state;
    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({...prevState, mobileView: true}))
                : setState((prevState) => ({...prevState, mobileView: false}));
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    }, []);
    const resetTransform = () => {
        setTransform("translate3d(0,px,0)");
    };
    const {className, style, small} = props;
    const classes = parallaxStyle();
    const parallaxClasses = classNames({
        [classes.parallax]: !mobileView,
        [classes.parallaxMobile]: mobileView,
        [classes.small]: small,
        [className]: className !== undefined
    });

    return (
        <div className={parallaxClasses}
             style={{...style, backgroundImage: "url(" + Image + ")", transform: transform}}>
            <Grid container spacing={2}>
                {!mobileView &&
                <Stack mobileView={mobileView}/>
                }
                <Grid sm={12} xs={12} lg={4} md={5} className={mobileView ? classes.mobileView : classes.gridImage} item>
                    <Avatar alt="Remy Sharp" src={mern} className={mobileView ? classes.mernMobile : classes.mern}/>
                    <Typography variant={"h5"} className={classes.name}>Titus M. Dishon</Typography>
                    {!mobileView&&<div className={classes.social}>
                        <Link to={""}>
                            <Avatar alt="Remy Sharp" src={Linkedin} className={classes.linkedin} />
                        </Link>
                        <Link to={""}>
                            <Avatar alt="Remy Sharp" src={Gmail} className={classes.gmail} />
                        </Link>
                        <Link to={""}>
                            <Avatar alt="Remy Sharp" src={Twitter} className={classes.twitter}/>
                        </Link>
                    </div>}
                </Grid>
            </Grid>
        </div>
    );
}

export default Parallax