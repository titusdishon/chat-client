import React, {useEffect, useState} from "react";
import {Avatar, Divider, Grid} from "@material-ui/core";
import Parallax from "../parallax/Parallax";
import Stack from "../stack/Stack";
import Linkedin from "../assets/images/linkedin.png";
import Twitter from "../assets/images/twitter.png";
import Gmail from "../assets/images/gmail.png";
import {Link} from "react-router-dom";


export default function MenuBar() {
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
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

    return (
        <Grid>
            <Parallax filter mobileView={mobileView}/>
            <Divider/>
            {mobileView && <div style={{
                justifyContent: "space-evenly",
                marginTop: "20px",
                display: "flex"
            }}>
                <Link to={""} className={{
                    width: "80px",
                    margin: "20px",
                    height: "80px",
                }}>
                    <Avatar alt="Remy Sharp" src={Linkedin}/>
                </Link>
                <Link to={""} className={{
                    width: "80px",
                    margin: "20px",
                    height: "80px",
                }}>
                    <Avatar alt="Remy Sharp" src={Twitter}/>
                </Link>
                <Link to={""} className={{
                    width: "80px",
                    margin: "20px",
                    height: "80px",
                }}>
                    <Avatar alt="Remy Sharp" src={Gmail}/>
                </Link>
            </div>}
            {mobileView && <div>
                <Stack mobileView={mobileView}/>
            </div>}
        </Grid>
    )
};
