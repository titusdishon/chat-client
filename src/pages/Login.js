import React, {useContext, useState} from "react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {useForm} from "../utils/hooks";
import {AuthContext} from "../context/auth";
import {Button, Grid, Grow, LinearProgress, makeStyles, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textFiled: {
    width: '100%',
    backgroundColor: "#ffffff",
    margin: "10px auto 20px auto",
  },

}));

function Login(props) {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const {onChange, onSubmit, values} = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, {loading}] = useMutation(LOGIN_USER, {
    update(_, {data: {login: userData}}) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser().then(r => {
    });
  }

  return (
      <Grid container>
        <br/>
        <br/>
        <br/>
        <br/>
        <Grow in={true}>
          <div className="form-container">

            <h1>Login</h1>
            <form onSubmit={onSubmit}>
              {loading && <LinearProgress color="primary"/>}
              <TextField
                  className={classes.textFiled}
                  variant={"outlined"}
                  label="Username"
                  type="text"
                  placeholder="Username.."
                  name="username"
                  error={!!errors.username}
                  value={values.username}
                  onChange={onChange}
              />
              <TextField
                  className={classes.textFiled}
                  variant={"outlined"}
                  label="Password"
                  type="password"
                  placeholder="Password.."
                  name="password"
                  error={!!errors.password}
                  value={values.password}
                  onChange={onChange}
              />
              <Button type="submit" disabled={values.password === "" || values.username === ""} variant="contained"
                      color="primary">login</Button>
            </form>
            {Object.keys(errors).length > 0 &&
            <div className="ui error message">
              <ul className="list">
                {Object.values(errors).map(value =>
                    (<li key={value}>{value}</li>))
                }
              </ul>
            </div>}
          </div>
        </Grow>
      </Grid>
  );
}

//graphql mutations
const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login( username: $username
        password: $password
    ) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

export default Login;
