import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./../context/AuthProvider";
import { Route, Routes } from "react-router-dom";
import {Link} from "react-router-dom";
import Home from "./Home";
import Quiz from "./Quiz";
import Results from "./Results";
import Quizpage from "./Quizpage";
import Register from "./Register";

import axios from './../api/axios';
const LOGIN_URL = './../auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [jwt, setJwt] = useState('');
    const [player, setPlayer] = useState('');


    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(JSON.stringify(response?.data));
            const jwt = response?.data?.jwtToken;
            const player = response?.data?.player;
            setJwt(jwt);
            setPlayer(player);
            setAuth({ username, password, jwt });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            setErrMsg(err);
        }
    }

    return (
        <>
            {success ? (
                <section>
                <Link to="/home" state={{jwtToken: jwt, playerdata: player}}>
                <button> Go to Home</button>
                </Link>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={username}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                          <div><Link to="/register">Register</Link></div>
                </section>
            )}
        </>
    )
}

export default Login
