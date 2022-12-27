   import React from "react";
   import {Link, useLocation } from "react-router-dom";

    function Home() {
    const { state } = useLocation();

        return (
          <div>
            <p>
                Welcome to the quiz home-page!
              <br />
              Click on the button below if you wanna take some quizzes.
            </p>
            <Link to="/quiz" state={{jwtToken: state.jwtToken, playerdata: state.playerdata}}>
            <button> Go to Quiz </button>
            </Link>

            <Link to="/results" state={{playerdata: state.playerdata}}>
            <button> Go Results Page </button>
            </Link>
          </div>
        );

    }

    export default Home;
