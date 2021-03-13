import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    Container,
    Fade
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {red} from "@material-ui/core/colors";
import Image from "../assets/images/cardholder.jpg"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%"
    },
    card: {
        width: "85%",
        margin: "20px auto 0 auto",
        backgroundColor: " #f2f2f2",
    },
    cardExpanded: {
        width: "100%",
        margin: "20px auto 0 auto",
        backgroundColor: " #f2f2f2",
    },
    control: {
        padding: theme.spacing(2),

    },
    container: {
        backgroundColor: "#ffffff",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    title:{
        marginLeft:"23px",
        color:"#5e753e"
    }
}));

export default function Projects(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const {mobileView} = props;

    return (
        <div className={classes.container}>
            <Container>
                <Typography variant={"h3"} className={classes.title}>Projects</Typography>
                <Grid container justify="center">
                    {[0,1].map((value) => (
                        <Grid key={value} sm={12} xs={12} lg={6} md={6} item>
                            <Fade in={true}>
                                <Card className={mobileView ? classes.cardExpanded : classes.card}>
                                    <CardHeader
                                        avatar={<Avatar aria-label="recipe" className={classes.avatar}>R</Avatar>}
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon/>
                                            </IconButton>
                                        }
                                        title="Shrimp and Chorizo Paella"
                                        subheader="September 14, 2016"
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image={Image}
                                        title="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            This impressive paella is a perfect party dish and a fun meal to cook
                                            together with
                                            your
                                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon/>
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon/>
                                        </IconButton>
                                        <IconButton
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: expanded,
                                            })}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon/>
                                        </IconButton>
                                    </CardActions>
                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography paragraph>Method:</Typography>
                                            <Typography paragraph>
                                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                                aside
                                                for 10
                                                minutes.
                                            </Typography>
                                            <Typography paragraph>
                                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                                medium-high
                                                heat. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                            </Typography>
                                        </CardContent>
                                    </Collapse>
                                </Card>
                            </Fade>

                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}
