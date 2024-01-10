import { Container, Grid } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import QuizProfile from './profile';
import QuizCountDown from './countdown';
import QuizPlay from './play';
import QuizQuestion from './question';
import QuizResult from './result';
import SponsorItem from './sponsor';
import { wait } from '@testing-library/user-event/dist/utils';

interface QuizProps {
  countDown: number;
  waiting: number;
  currentQuestion: string;
  trueAnswer: string;
  userAnswer: string;
  options: string[];
  gameOver:number;
  quizName:string;
  totalQuestionNumber:number;
  currentQuestionIndex:number;
  optionsCounts: { name: string; votes: number }[];
  sortedUsers:{username:string;score:number;time:number;rank:number;imageSrc:string}[];
  setClickedIndexState: React.Dispatch<React.SetStateAction<number>>;
  setUserAnswer:React.Dispatch<React.SetStateAction<string>>;
  setUserAnswerTime: React.Dispatch<React.SetStateAction<number>>;
  // Diğer prop tipleri
}
export const Quiz: React.FunctionComponent<QuizProps> = ({ countDown,waiting,currentQuestion,trueAnswer,userAnswer,options,gameOver,quizName,totalQuestionNumber,currentQuestionIndex,optionsCounts,sortedUsers, setClickedIndexState,setUserAnswer,setUserAnswerTime}) => {

  const sponsorImage = {
    src: `/img/sponsor-2.png`,
    width: 172,
    height: 56
  }

  const [step, setStep] = useState(0);

  useEffect(() => {
    if(gameOver == 1)
    {
      setStep(3);
    }
  }, [gameOver]);

  const updateQuiz = () => {

    switch (step) {
      case 0:
        setStep(1);
        break;
      case 1:
        setStep(2);
        break;
      case 2:
        setStep(3); // Results Components
        break;
      case 3:
        setStep(4); // Profile Components
        break;
    }

  }

  return (<Container size={"xl"} mt={78} mb={54}>
    <div id={"quiz-screen"}>
      {step === 0 &&
        <QuizPlay onClick={() => updateQuiz()}/>
      }
      {step > 0 &&
        <div className={"fullscreen"}>
          <div className={"zoom-screen"}>
            {step === 1 &&
              <QuizCountDown onClick={() => updateQuiz()} quizName={quizName}/>
            }
            {step === 2 &&
              <QuizQuestion onClick={(index: number) => {
                setStep(index);
              }}
              countDown={countDown}
              waiting={waiting}
              currentQuestion={currentQuestion}
              trueAnswer={trueAnswer}
              userAnswer={userAnswer}
              quizName={quizName}
              options={options}
              totalQuestionNumber={totalQuestionNumber} 
              currentQuestionIndex={currentQuestionIndex}
              optionsCounts={optionsCounts}
              setClickedIndexState={setClickedIndexState}
              setUserAnswer={setUserAnswer}
              setUserAnswerTime={setUserAnswerTime}
              />
            }

            {step === 3 &&
              <QuizResult onClick={(index: number) => {
                setStep(index);
              }}
              sortedUsers={sortedUsers}
              />
            }


            {step === 4 &&
              <QuizProfile
                onClick={(index: number) => {
                  setStep(index);
                }}
              />
            }


            <Grid mt={36}>
              <Grid.Col lg={3}>
                <SponsorItem image={sponsorImage}/>
              </Grid.Col>
              <Grid.Col lg={3}>
                <SponsorItem image={sponsorImage}/>
              </Grid.Col>
              <Grid.Col lg={3}>
                <SponsorItem image={sponsorImage}/>
              </Grid.Col>
              <Grid.Col lg={3}>
                <SponsorItem image={sponsorImage}/>
              </Grid.Col>
            </Grid>
          </div>
        </div>
      }
    </div>
  </Container>)
}

export default Quiz;
