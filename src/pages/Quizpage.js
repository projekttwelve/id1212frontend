import React from "react";
import {Link, useLocation } from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from './../api/axios';

function Quizpage(props) {
    const [errMsg, setErrMsg] = useState('');
    const [quizdata, setQuizdata] = useState([]);
    const { state } = useLocation();
    const [success, setSuccess] = useState(false);
    const [submittedquiz, setSubmittedquiz] = useState(false);
    const [question1answer, setQuestion1answer] = useState('');
    const [question2answer, setQuestion2answer] = useState('');
    const [question3answer, setQuestion3answer] = useState('');
    const [finalscore, setFinalscore] = useState(0);

    useEffect(() => {
        try {
            const response = axios.get("/questions" + "/" + state.type,
                {headers: { 
                    'Access-Control-Allow-Origin': '*'
                }}
            ).then(function(response) { 
                    setQuizdata(response.data);
                    setSuccess(true);
                    setFinalscore(0);
                }
            )
        } catch (err) {
            setErrMsg(err);
        }
    }, [state])
    
    useEffect(() => {
        console.log("finalscore");
        console.log(finalscore);
    }, [finalscore])

        function onChangeValue(event) {
            if (event.target.name === "0")
                setQuestion1answer(event.target.value)
            else if (event.target.name === "1")
                setQuestion2answer(event.target.value)
            else if (event.target.name === "2")
                setQuestion3answer(event.target.value)
        }

        function onFormsubmit(event) {
            const answers = [question1answer, question2answer, question3answer]
            const nrcorrectanswers = answers.filter(answer => answer === 'correct').length
            setFinalscore(nrcorrectanswers);
            setSubmittedquiz(true);
            if (state.player != null){
                try {
                    const response = axios.get("/quizid" + "/" + state.type,
                        {headers: { 
                            'Access-Control-Allow-Origin': '*'
                        }}
                    ).then(function(response) { 
                        console.log(state.player);

                try {
                        const res = axios.post("/result",
                            JSON.stringify({"playerid":state.player.playerid,"quizid":response.data,"score":nrcorrectanswers}),
                            {
                                headers: { 
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*'
                                }
                            }
                        );
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
        }

        function resetAllFilters(event) {
            setQuestion1answer('')
            setQuestion2answer('')
            setQuestion3answer('')
            setFinalscore(0);
            setSubmittedquiz(false);
        }

        return (
        <>
            <div>
                <p> Welcome to the quiz Quizpage </p>
                <Link to="/"><button onClick={resetAllFilters}>
                    Go to Home
                </button>
                </Link>
            </div>
            {success ? (
                submittedquiz ? (
                    <div>  Your score is: {finalscore} our of 3 </div>     
                ) : (
                    <section>
                        <form onSubmit={onFormsubmit}>
                        {quizdata.map((question, index)=> {
                            return (
                                <div>
                                <p>{question.text}</p>
                                <div onChange={onChangeValue} value={index}>
                                    {question.answer}
                                    <input type="radio" name={index} value='correct'/>
                                    {question.wrong_answer1}
                                    <input type="radio" name={index} value='wrong'/>
                                    {question.wrong_answer2}
                                    <input type="radio" name={index} value='wrong'/>
                                </div>
                                </div>
                            )
                        })}
                        <button>Submit this quiz</button>
                        </form>
                    </section>
                )
            ) : (
                <section>
                nooo
                </section>
            )}
        </>
        );

    }

    export default Quizpage;
