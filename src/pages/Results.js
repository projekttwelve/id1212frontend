import React from "react";
import {Link, useLocation } from "react-router-dom";
import axios from './../api/axios';
import { useRef, useState, useEffect, useContext } from 'react';

   function Results() {

    const { state } = useLocation();
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [successtwo, setSuccesstwo] = useState(false);
    const [quizdata, setQuizdata] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        try {
            const response = axios.get("/types",
                {headers: { 
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

    useEffect(() => {
        console.log(quizdata);
    }, [quizdata])

    useEffect(() => {
        console.log(results);
    }, [results])

    function onButtonClick(e) {
        console.log("this is e.target.type ")
        console.log(e.target.value)
        const type = e.target.value
        try {
            const response = axios.get("/quizid" + "/" + e.target.value,
                {headers: { 
                    'Access-Control-Allow-Origin': '*'
                }}
            ).then(function(response) { 
                try {
                    const res = axios.get("/result" + "/" + response.data + "/" + state.playerdata.playerid,
                        {
                                headers: { 
                                    'Access-Control-Allow-Origin': '*'
                                }
                            }
                        ).then(function(response) { 
                            console.log(response.data)
                            setResults(response.data);
                            setSuccesstwo(true);
                        })
                } catch (err) {
                    console.log(err);
                    setErrMsg(err);
                }
            }
            )
        } catch (err) {
            setErrMsg(err);
        }
    }
        return (
            <>
             {success ? (
                 successtwo ? (
                    <section> 
                    {results.map((result)=> {
                            return (
                                <div>
                                    <p>Score: {result.score}</p>
                                    <p>Time: {result.time}</p>
                                </div>
                            )
                        })}
                    <Link to="/"><button>
                        Go to Home
                    </button>
                    </Link>
                    </section>
                    ) : (
                        <section> 
                            {quizdata.map((type)=> {
                                return (
                                    <button value={type} onClick={onButtonClick}>{type}</button>
                                );
                            })}
                        </section>
                    )
                ) : (
                <section>
                    <p> This is the Results Page </p>
                    <Link to="/"><button>
                        Go to Home
                    </button>
                    </Link>
                </section>
            )}
            </>
        );

    }

    export default Results;
