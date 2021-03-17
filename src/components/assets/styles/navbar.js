import {makeStyles} from "@material-ui/core";

export const navStyles = makeStyles(() => ({
    header: {
        backgroundColor:"#6c8a7d",
        margin:"auto",
        color:"#ffffff",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },
    },
    headerTransparent: {
        backgroundColor:"#6c8a7d",
        margin:"auto",
        color:"#ffffff",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
    loginNav:{
        float:'right',
        right:0,
        marginLeft: "38px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    drawerContainer: {
        padding: "20px 30px",
    },
    userMenu:{
        marginTop:"49px"
    }
}));

