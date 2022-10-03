import React from 'react';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import {Api} from "../api/api";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
    const {setLogin} = props;
    let navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('login'),
            password: data.get('password'),
        });
        Api.signUp(data.get('login'), data.get('password')).then(user => {
            // Обработка ошибок и редирект на Game
            if (user) {
                setLogin(user.login);
                navigate("../", { replace: true });
            }
        })
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="login"
                            name="login"
                            autoComplete="login"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <span>Already have an account?</span>
                                <Link href="signIn" variant="body2">
                                    {" Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );

}

export default SignUp;