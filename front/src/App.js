import * as React from 'react';

import './App.css'
import {Route, Routes} from "react-router-dom";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import MyStats from "./pages/myStats";
import Minesweeper from "./pages/Minesweeper"
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { Api } from "./api/api";
import {useLocalStorage} from "react-use-storage";
import Page2048 from "./src2048/page2048";
import Fifteen from './components/Fifteen';

function App() {
    let localLogin = localStorage.getItem("login")
    if (!localLogin) localStorage.setItem("login", null);
    const [login, setLogin] = useLocalStorage("login", null);
    const handleLogout = () => {
        Api.finishGame(login).then(_ => {
            setLogin(null);
        });
    }
    return (
        <>
            <H1>Arcade Games</H1>
            {!login ? <Button href="/signIn">SignIn</Button> : null}
            {!login ? <Button href="/signUp">SignUp</Button> : null}
            {login && <Button href="/minesweeper">Minesweeper</Button>}
            {login && <Button href="/2048">2048</Button>}
            {login ? <Button href="/fifteen">Fifteen</Button> : null}
            {login ? <Button href="/myStats">Stats</Button> : null}
            {login ? <Button onClick={handleLogout}>Logout</Button> : null}

            <Routes>
                {login ? <Route exact path="/" element={<MyStats login={login} setLogin={setLogin}/>}/> : null}
                {!login ? <Route path="/" element={<SignIn setLogin={setLogin}/>}/> : null}
                {!login ? <Route path="/signIn" element={<SignIn setLogin={setLogin}/>}/> : null}
                {!login ? <Route path="/signUp" element={<SignUp setLogin={setLogin}/>}/> : null}
                {login ? <Route path="/myStats" element={<MyStats  login={login} setLogin={setLogin}/>}/>: null}
                {login && <Route path="/minesweeper" element={<Minesweeper login={login} setLogin={setLogin}/>}/>}
                {login && <Route path="/2048" element={<Page2048 login={login} setLogin={setLogin}/>}/>}
                <Route path="/fifteen" element={<Fifteen login={login} setLogin={setLogin}/>}/>: null
            </Routes>
        </>
    )
}

export default App;

const H1 = styled.h1`
  font-size: 2em;
  font-family: "Roboto Thin", sans-serif;
  color: black;
  background: rgba(41, 146, 186, 0.29);
  text-align: center;
  text-transform: uppercase;
  line-height: 1.5;
  letter-spacing: 0.00938em;
`



