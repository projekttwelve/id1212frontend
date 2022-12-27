import { useRef, useState, useEffect, useContext } from 'react';

import {Link} from "react-router-dom";
import axios from './../api/axios';

const Register = () => {
    const errRef = useRef();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [gender, setGender] = useState('');
    const [username, setUser] = useState('');

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
            const response = await axios.post("/api/ins",
                JSON.stringify({firstname, lastname, middlename, email, password, gender, username}),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(JSON.stringify(response?.data));
            setFirstname('');
            setLastname('');
            setMiddlename('');
            setEmail('');
            setGender('');
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
                    Ok it worked go sign in
                    <Link to="/"><button>
                        Go to Home
                        </button>
                    </Link>
                </section>
            ) : (
                <section>
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="firstname">Firstname:</label>
                        <input
                            type="text"
                            id="firstname"
                            onChange={(e) => setFirstname(e.target.value)}
                            value={firstname}
                            required
                        />

                        <label htmlFor="middlename">Middlename:</label>
                        <input
                            type="text"
                            id="middlename"
                            onChange={(e) => setMiddlename(e.target.value)}
                            value={middlename}
                            required
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="gender">Gender:</label>
                        <input
                            type="text"
                            id="gender"
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                            required
                        />


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
                            type="text"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                        />


                        <button>Sign Up</button>
                    </form>
                <Link to="/"><button>
                    Go to Home
                </button>
                </Link>
                </section>
            )}
        </>
    )
}

export default Register
