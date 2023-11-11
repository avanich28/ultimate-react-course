// import DateCounter from "./DateCounter";
// import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../contexts/QuizContext";

// Topic: The "React Quiz" App
export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <Main className="main">
        {/* Topic: Handling Loading, Error, and Ready Status */}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}

        {/* Topic: Starting a New Quiz */}
        {status === "ready" && <StartScreen />}

        {status === "active" && (
          <>
            {/* Topic: Displaying Progress */}
            <Progress />
            {/* Topic: Displaying Questions */}
            <Question />
            <Footer>
              {/* Topic: Setting up a timer with useEffect */}
              <Timer />
              {/* Topic: Moving to the Next Question */}
              <NextButton />
            </Footer>
          </>
        )}

        {/* Topic: Finishing a Quiz */}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

// Topic: Section Summary: useState vs. useReducer
// In slide

// Track lessons
// 1) In DateCounter.js
