import { Grid, Group, Image, Text } from "@mantine/core";
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import _ from 'lodash';

import 'swiper/css';
import QuizHeader from './header';
import QuestionItem from './questionItem';
import 'swiper/css/navigation';

import Live from '../../../live';
interface Props {
  onClick: (index: number) => void;
  countDown: number; // countDown prop'u eklendi
  waiting:number;
  currentQuestion: string;
  trueAnswer:string;
  userAnswer:String;
  options: string[];
  quizName:string;
  totalQuestionNumber:number;
  currentQuestionIndex:number;
  optionsCounts: { name: string; votes: number }[];
  setClickedIndexState: React.Dispatch<React.SetStateAction<number>>;
  setUserAnswer:React.Dispatch<React.SetStateAction<string>>;
  setUserAnswerTime: React.Dispatch<React.SetStateAction<number>>;

}

interface CheckProps {
  text: string;
  total: number;
  reply: boolean
}



const QuizQuestion: React.FC<Props> = ({ onClick, countDown,waiting,currentQuestion,trueAnswer,userAnswer,options,quizName,totalQuestionNumber,currentQuestionIndex,optionsCounts, setClickedIndexState,setUserAnswer,setUserAnswerTime}: Props) => {
  const swiperRef = useRef<SwiperProps>();

  const [checkedList, setCheckedList] = useState<Array<any>>([]);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [timer, setTimer] = useState({ minutes: 1, seconds: 20 });
  const [choice,setChoice] = useState('*');
  const [currentQuestionn,setCurrentQuestionn] = useState('');
  const [waitingState, setWaitingState] = useState(waiting);
  const [optionA,setOptionA] = useState('A');
  const [optionB,setOptionB] = useState('B');
  const [optionC,setOptionC] = useState('C');
  const [optionD,setOptionD] = useState('D');
  const [countdown, setCountdown] = useState(15);
  const [clickedButtonIndex, setClickedButtonIndex] = useState(0);
  const [trueAnswerState, setTrueAnswerState] = useState("*");
  const [userAnswerState, setuserAnswerState] = useState("*");
  const [isSelected, setIsSelected] = useState(false);
  const [deneme, setDeneme] = useState(false);
  const [quizNameState,setQuizNameState]=useState(quizName);
  const [totalQuestionNumberState,setTotalQuestionNumberState]=useState(totalQuestionNumber);
  const [currentQuestionIndexState,setCurrentQuestionIndexState]=useState(currentQuestionIndex);
  const [optionsCountsState, setOptionsCountsState] = useState([
    { name: 'A', votes: 0 },
    { name: 'B', votes: 0 },
    { name: 'C', votes: 0 },
    { name: 'D', votes: 0 }
    // Eklemek istediğiniz diğer adaylar
  ]);
  const [openResults, setOpenResults] = useState(false);
  
  
  const [question, setQuestion] = useState([
    {
      title: 'What is the maximum supply of Bitcoin?What is the maximum supply of Bitcoin?What is the maximum supply of Bitcoin?What is the maximum supply of Bitcoin?What is the maximum supply of Bitcoin?',
      logo: '/img/tunncay.png',
      isAdvert: false,
      answers: {
        a: {
          text: '10 Million',
          total: 34,
          reply: false

        },
        b: {
          text: '21 Million',
          total: 240,
          reply: false
        },
        c: {
          text: '50 Million',
          total: 330,
          reply: true
        },
        d: {
          text: '100 Million',
          total: 540,
          reply: false
        }
      }
    },
    {
      title: 'Question 2',
      logo: '/img/tunncay.png',
      isAdvert: false,
      answers: {
        a: {
          text: '10 Million',
          total: 34,
          reply: false
        },
        b: {
          text: '21 Million',
          total: 240,
          reply: false
        },
        c: {
          text: '50 Million',
          total: 330,
          reply: true
        },
        d: {
          text: '100 Million',
          total: 540,
          reply: false
        }
      }
    },
    {
      title: 'Advert Title',
      logo: '/img/banner-image.png',
      isAdvert: true
    },
    {
      title: 'Question 3',
      logo: '/img/tunncay.png',
      isAdvert: false,
      answers: {
        a: {
          text: '10 Million',
          total: 34,
          reply: true
        },
        b: {
          text: '21 Million',
          total: 240,
          reply: false
        },
        c: {
          text: '50 Million',
          total: 330,
          reply: false
        },
        d: {
          text: '100 Million',
          total: 540,
          reply: false
        }
      }
    },

  ]);
  


  const bannerCheck = (index: number) => {
    return index % 2 === 0;
  }

  useEffect(() => {
    setCurrentQuestionn(currentQuestion);
    
    setTrueAnswerState("*"); 
    
  }, [currentQuestion]);

  useEffect(() => {
    setWaitingState(waiting);
    setClickedIndexState(0);
    setCountdown(15);
    setOpenResults(false);
  }, [waiting]);

  useEffect(() => {
    setOptionsCountsState(optionsCounts);
    setOpenResults(true);
  }, [optionsCounts]);
 

  

  /*useEffect(() => {
    let timerId: NodeJS.Timeout;

    const handleCountdown = () => {
      if (countdown > 0) {
        timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        if (question.length !== (swiperRef.current.activeIndex + 1)){
          setTimeout(() => {
            setChoice('*');
            swiperRef && swiperRef.current.slideNext();
            
            if (bannerCheck(swiperRef.current.activeIndex)){
              //const checkList = [...checkedList];
              //checkList.push({text:'',total:0,reply:false, advert:true});
              //setCheckedList(checkList)
              setCountdown(2);
            } else{
              setCountdown(15);

            }

          }, 1500);
        } else{
          setTimeout(()=>{
            setChoice('*');
            onClick(3);
          },1000);
        }

      }
    };

    handleCountdown();

    return () => clearTimeout(timerId); // Component unmounted olduğunda timer'ı temizle

  }, [countdown]);
*/

  useEffect(() => {
/*
    if (isSelected) {
      if (countdown > 3) {
        setCountdown(3);
      }
    }
*/

  }, [isSelected]);

  useEffect(() => {
    setCountdown(countDown);
    /*
        if (isSelected) {
          if (countdown > 3) {
            setCountdown(3);
          }
        }
    */
    
      }, [countDown]);

  useEffect(() => {
    setWaitingState(waiting);
    
      }, [waiting]);
  useEffect(() => {

    setClickedButtonIndex(0)

  },[waitingState]);

  useEffect(() => {
    setOptionA(options[0]);
    setOptionB(options[1]);
    setOptionC(options[2]);
    setOptionD(options[3]);
  }, [options]);

  useEffect(() => {
    setTrueAnswerState(trueAnswer);
  }, [trueAnswer]);
  
{/*
  useEffect(() => {
    // Reset timer when selected question changes
    setTimer({ minutes: 1, seconds: 20 });
  }, [selectedQuestion]);

  useEffect(() => {
    // Update timer every second
    const timerInterval = setInterval(() => {
      if (timer.minutes === 0 && timer.seconds === 0) {
        // If timer reaches 0, handle it here (e.g., move to the next question or submit)
      } else {
        setTimer((prevTimer) => {
          const newSeconds = prevTimer.seconds === 0 ? 59 : prevTimer.seconds - 1;
          const newMinutes = prevTimer.seconds === 0 ? prevTimer.minutes - 1 : prevTimer.minutes;
          return { minutes: newMinutes, seconds: newSeconds };
        });
      }

    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timer, selectedQuestion]);
*/}




 

  const setButtonClicked = (buttonNumber:number) => {
    if(countDown > 0)
    {
      setClickedIndexState(buttonNumber)
      setClickedButtonIndex(buttonNumber);
      setUserAnswerTime(countdown);
    }

  }



  





  return (
    <div className={"quiz-area"}>
      
     
      
      <div className={"question-item"}>
        <QuizHeader
          title={quizNameState}
          onClick={(index) => onClick && onClick(index)}
          rightComponent={
            <Group spacing={10} className={"right-statistic"}>
              {/*
              <div className={"box-item"}>
                <Text fz={14.6} mt={-1} fw={700} className={"grotesk-bold text"} color={"#000"} lts={-0.4}>
                  {`${timer.minutes}:${timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}`}
                </Text>
              </div>
          */}
              <div className={"box-item"} style={{ borderColor: '#000' }}>
                <Text fz={14.6} mt={-1} fw={700} className={"grotesk-bold text"} color={"#000"} lts={-0.4}>
                {Number(currentQuestionIndex) + 1} / {totalQuestionNumber}
                </Text>
              </div>
              {/*
              <div className={"box-item"} style={{ borderColor: '#fff' }}>
                <Text fz={14.6} mt={-1} fw={700} className={"grotesk-bold text"} color={"#000"} lts={-0.4}>
                  1.5k
                </Text>
              </div>
               */}
            </Group>
          }
        />


        <Swiper
          onBeforeInit={(swiper: SwiperProps) => {
            swiperRef.current = swiper;
          }}
          allowTouchMove={false}
          className={""}
          spaceBetween={15}
          slidesPerView={1}
          speed={500}
          autoHeight
          onSlideChange={(e:{activeIndex:number}) =>{
            setSelectedQuestion(e.activeIndex);
          }}

    >
     

          
           
            {/* <SwiperSlide key={`question-${1}`}> */}
              
                {waitingState === 0 &&
                  <div className={"question-slide"}>
                    <div className={"question-view-box"}>
                    
                      <Group>
                        <div className="ques-min-box">
                          <div>
                            <Text className={"title grotesk-bold"}>Countdown</Text>
                            <Text className={"min-text grotesk-bold"}>{countdown}</Text>
                          </div>
                        </div>
                        <div className="ques-min-box">
                          <div>
                            <Text className={"title grotesk-bold"}>Answer</Text>
                            <Text className={"min-text grotesk-bold"}>{trueAnswerState}</Text>
                          </div>
                        </div>
                      </Group>

                      <Text ta={"center"} className={"main-question-title"} fz={16} fw={600} color={"#000"}
                            lh={"20px"}>{currentQuestionn}</Text>
                    </div>
                    
                    <Grid gutter={7}>
                      <Grid.Col  md={6}>
                        <QuestionItem wrongAnswer={clickedButtonIndex === 1 && trueAnswerState!=="A" && countdown<=0} total={optionsCountsState[0].votes}
                                      type={"A"} title={optionA}//
                                      onClick={() => {
                                        //setChecked(index, item.answers.a,'A');
                                        setButtonClicked(1);
                                        setUserAnswer("A");
                                      }
                                      }
                                      checked={clickedButtonIndex === 1}
                                      correctAnswer={trueAnswerState==="A"}
                                      isOpen={openResults}
                        />
                      </Grid.Col>
                      <Grid.Col md={6}>
                        <QuestionItem wrongAnswer={clickedButtonIndex === 2 && trueAnswerState!=="B" && countdown<=0} total={optionsCountsState[1].votes}
                                      type={"B"}
                                      title={optionB} onClick={() => 
                                        {
                                          //setChecked(index, item.answers.b,'B');
                                          setButtonClicked(2);
                                          setUserAnswer("B");
                                        }}
                                      checked={clickedButtonIndex === 2}
                                      correctAnswer={ trueAnswerState==="B"}
                                      isOpen={openResults}

                        />
                      </Grid.Col>
                      <Grid.Col md={6}>
                        <QuestionItem wrongAnswer={clickedButtonIndex === 3 && trueAnswerState!=="C" && countdown<=0} total={optionsCountsState[2].votes}
                                      type={"C"} title={optionC}
                                      onClick={() => {
                                        //setChecked(index, item.answers.c,'C');
                                        setButtonClicked(3);
                                        setUserAnswer("C");
                                      }}
                                      checked={clickedButtonIndex === 3}
                                      correctAnswer={ trueAnswerState==="C"}
                                      isOpen={openResults}

                        />
                      </Grid.Col>
                      <Grid.Col md={6}>
                      
                        <QuestionItem wrongAnswer={clickedButtonIndex === 4 && trueAnswerState!=="D" && countdown<=0} total={optionsCountsState[3].votes}
                                      type={"D"} title={optionD}
                                      onClick={() => {
                                        //setChecked(index, item.answers.c,'D');
                                        setButtonClicked(4);
                                        setUserAnswer("D");
                                      }}
                                      checked={clickedButtonIndex === 4 }
                                      correctAnswer={ trueAnswerState==="D"}
                                      isOpen={openResults}
                        />
                      </Grid.Col>
                    </Grid>
                  </div>
                }

                {waitingState === 1 &&

                  
        <Image src={'/img/banner-image.png'} className={"banner-image"} />
      
                }

{/* </SwiperSlide> */}
            
        

        </Swiper>


      </div>
    </div>);

}

export default QuizQuestion;
