import React, {useContext, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Drawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader} from "@material-ui/core";
import {Link} from "react-router-dom";
import {navStyles} from "../assets/styles/navbar";
import {headersData} from "./navList";
import {AuthContext} from "../../context/auth";
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        margin: 0,
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: "#ffffff",
        textDecoration: "none",
        fontWeight: "bold"
    },
    desktop: {
        flexGrow: 1,
    },
    menuDrop: {
        marginTop: "50px",
        minWidth: "100px"
    }
}));

export default function Navbar(props) {
    const classes = useStyles();
    const [top, setTop] = React.useState(0);
    const {header, loginNav, userMenu, headerTransparent, drawerContainer} = navStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const {user, logout} = useContext(AuthContext);
    // const pathName = window.location.pathname;
    // const path = pathName === "/" ? "home" : pathName.substr(1);
    // const [activeItem, setActiveItem] = useState(path);
    // const handleItemClick = (e, {name}) => setActiveItem(name);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const {mobileView, drawerOpen, setState} = props;
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = (event) => {
        setTop(event && event.target && event.target.scrollingElement && event.target.scrollingElement.scrollTop)
    }
    const getDrawerChoices = () => {
        return (<List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    More from Dishon
                </ListSubheader>
            }
            className={classes.root}
        >
            {headersData.map(({label, href}) => (

                <ListItem button>
                    <ListItemIcon>
                        <StarIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Chelsea Otakan"/>
                </ListItem>

            ))}
        </List>)

    };
    const menuBar = user ? (
        <Menu
            id="menu-appbar"
            className={userMenu}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}><Link to={"/new"}> Create an article</Link></MenuItem>
            <MenuItem onClick={() => {
                logout();
                handleClose(true)
            }}>logout</MenuItem>
        </Menu>
    ) : (
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            className={classes.menuDrop}
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to="/login">Login</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to="/register">Register</Link></MenuItem>
        </Menu>
    );
    const displayDesktop = () => {
        return (
            <Toolbar>
                <Link to={"/"} className={classes.title}> Titus M Dishon</Link>
                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                    {menuBar}
                </div>
            </Toolbar>
        );
    };
    const displayMobile = () => {
        const handleDrawerOpen = () => setState((prevState) => ({...prevState, drawerOpen: true}));
        const handleDrawerClose = () => setState((prevState) => ({...prevState, drawerOpen: false}));

        return (
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} onClick={handleDrawerOpen} color="inherit"
                            aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Link to={"/"} className={classes.title}> Titus M Dishon</Link>
                <Drawer
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>
                <div className={loginNav}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                    {menuBar}
                </div>
            </Toolbar>
        );
    };
    return (
        <header>
            <AppBar className={top > 0 || mobileView === true ? header : headerTransparent}
                    elevation={top > 0 || mobileView === true ? 1 : 0}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </header>
    );
}
