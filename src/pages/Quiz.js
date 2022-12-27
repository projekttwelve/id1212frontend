import React from "react";
import {Link, useLocation} from "react-router-dom";
import axios from './../api/axios';
import { useRef, useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';

const LOGIN_URL = './../auth';

   function Quiz(props) {

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [quizdata, setQuizdata] = useState([]);
    const [quiztype, setQuiztype] = useState('');
    const [html, setHtml] = useState('');
    const { state } = useLocation();

    useEffect(() => {
        try {
            const response = axios.get("/types",
                {headers: { 
                    Authorization: 'Bearer ' + state.jwtToken,
                    'Access-Control-Allow-Origin': '*'
                }}
            ).then(function(response) { 
                    setQuizdata(response.data);
                    setSuccess(true);
                }
            )
        } catch (err) {
            setErrMsg(err);
        }
    }, [])
        return (
        <>
            <div>
                <Link to="/"><button>
                    Go to Frontpage
                </button>
                </Link>
            </div>
            {success ? (
                <section>
                    Pick Quiz:
                    {quizdata.map((type)=> {
                        return (
                            <Link to="/quizpage" state={{type: type, player: state.playerdata}}>
                                <button> {type} </button>
                            </Link>
                        );
                    })}
                </section>
            ) : (
                <section>
                nooo
                </section>
            )}
        </>
        );

    }

    export default Quiz;
