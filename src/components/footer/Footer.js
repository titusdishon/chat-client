import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 4, 3,4),
    },
    appBar: {
        backgroundColor:"#5e753e",
        top: 'auto',
        bottom: 0,
    }
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="sticky" color="primary" className={classes.appBar}>
                <Grid container>
                    <Grid sm={12} xs={12} lg={4} md={4} item >
                        <Typography variant={"h6"} className={classes.text}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consectetur consequatur
                             optio possimus temporibus. Accusantium cum delectus dolorem doloremque eos eveniet.
                        </Typography>
                    </Grid>
                    <Grid sm={12} xs={12} lg={4} md={4} item>
                        <Typography variant={"h6"}  className={classes.text}>
                           nemo optio possimus temporibus. Accusantium cum delectus dolorem doloremque eos eveniet ex
                        </Typography>
                    </Grid>
                    <Grid sm={12} xs={12} lg={4} md={4} item>
                        <Typography variant={"h6"} className={classes.text}>
                          optio possimus temporibus. Accusantium cum delectus dolorem doloremque eos eveniet ex
                        </Typography>
                    </Grid>
                </Grid>
            </AppBar>
        </React.Fragment>
    );
}
