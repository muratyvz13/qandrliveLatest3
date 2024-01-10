// global.d.ts

declare module "global" {
    interface Window {
      ethereum?: any; // ethereum'ın türüne göre burada uygun bir tip tanımlayabilirsiniz
    }
  }

  



  import { Grid, Group, Image, Text } from "@mantine/core";
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import _ from 'lodash';

import 'swiper/css';
import QuizHeader from './header';
import QuestionItem from './questionItem';
import 'swiper/css/navigation';

interface Props {
  onClick: (index: number) => void;
  countDown: number; // countDown prop'u eklendi
  waiting:number;
  currentQuestion: string;
  trueAnswer:string;
  userAnswer:String,
}

interface CheckProps {
  text: string;
  total: number;
  reply: boolean;
  
}



const QuizQuestion: React.FC<Props> = ({ onClick, countDown,waiting,currentQuestion,trueAnswer,userAnswer }: Props) => {
  const swiperRef = useRef<SwiperProps>();

  const [checkedList, setCheckedList] = useState<Array<any>>([]);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [waitingValue, setWaitingValue] = useState(0);
  const [timer, setTimer] = useState({ minutes: 1, seconds: 20 });
  const [choice,setChoice] = useState('*');
  const [currentQuestionn,setCurrentQuestionn] = useState('*');
  const [countdown, setCountdown] = useState(15);
  const [isSelected, setIsSelected] = useState(false);
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
    setWaitingValue(waitingValue);
  }, [waitingValue]);
  useEffect(() => {
    //setCountdown(countDown);
  }, [countDown]);
  useEffect(() => {
     //
     setCurrentQuestionn(currentQuestionn);
   }, [currentQuestionn]);
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    const handleCountdown = () => {
      if (countdown > 0) {
        timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        if (question.length !== (swiperRef.current.activeIndex + 1)){
          setTimeout(() => {
            setChoice('*');
            swiperRef && swiperRef.current.slideNext();
            setIsSelected(false);
            if (bannerCheck(swiperRef.current.activeIndex)){
              const checkList = [...checkedList];
              checkList.push({text:'',total:0,reply:false, advert:true});
              setCheckedList(checkList)
              //setCountdown(2);
            } else{
              //setCountdown(15);

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


  useEffect(() => {

    if (isSelected) {
      if (countdown > 3) {
        setCountdown(3);
      }
    }


  }, [isSelected]);


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


  const setChecked = (index: number, answer: any, reply:string) => {

    if (!isSelected) {
      const arr = [...checkedList];

      if (index >= 0 && index < checkedList.length) {
        arr[index] = answer;
      } else {
        arr.push(answer);
        setIsSelected(true);
      }

      setCheckedList(arr);
    }
  };

  const checkControl = (index: number, answer: any) => {

    if (index >= 0 && index <= checkedList.length) {

      return checkedList[index] === answer;
    }
    return false;
  }


  const getCheckAnswer = (question:any,index:number) => {

    if (!countdown){
      const correctAnswer = _.findKey(question.answers, { reply: true });

      if (correctAnswer){
        return correctAnswer.toUpperCase();
      }


    }

    return "*"

  }


  const replyWrongCheck = (index: number, answer: any) => {


    if (!countdown) {
      const checkItem: any = checkControl(index, answer)
      if (checkItem) {
        return !answer.reply;
      }
    }
    return false;
  }

  const correctCheck = (index: number, answer: any) => {

    if (!countdown && isSelected) {
      const checkItem: any = checkControl(index, answer);

      if (checkItem) {
        return answer.reply
      }

    }

    return false;

  };





  return (
    <div className={"quiz-area"}>

      <div className={"question-item"}>

        <QuizHeader
          title={"BTC QUIZ COMPETITON"}
          onClick={(index) => onClick && onClick(index)}
          rightComponent={
            <Group spacing={10} className={"right-statistic"}>
              <div className={"box-item"}>
                <Text fz={14.6} mt={-1} fw={700} className={"grotesk-bold text"} color={"#000"} lts={-0.4}>
                  {`${timer.minutes}:${timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}`}
                </Text>
              </div>
              <div className={"box-item"} style={{ borderColor: '#000' }}>
                <Text fz={14.6} mt={-1} fw={700} className={"grotesk-bold text"} color={"#000"} lts={-0.4}>
                  {selectedQuestion + 1}/{question.length}
                </Text>
              </div>
              <div className={"box-item"} style={{ borderColor: '#fff' }}>
                <Text fz={14.6} mt={-1} fw={700} className={"grotesk-bold text"} color={"#000"} lts={-0.4}>
                  1.5k
                </Text>
              </div>
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

          {question.map((item: any, index) => {

            const reply = getCheckAnswer(item,index);

            return(
              <SwiperSlide key={`question-${index}`}>
                {!item.isAdvert &&
                  <div className={"question-slide"}>
                    <div className={"question-view-box"}>
                    {countDown}
                    {waiting}
                    {currentQuestion}
                    {trueAnswer}:string;

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
                            <Text className={"min-text grotesk-bold"}>{reply}</Text>
                          </div>
                        </div>
                      </Group>

                      <Text ta={"center"} className={"main-question-title"} fz={16} fw={600} color={"#000"}
                            lh={"20px"}>{item.title}</Text>
                    </div>
                    <Grid gutter={7}>
                      <Grid.Col  md={6}>
                        <QuestionItem wrongAnswer={replyWrongCheck(index, item.answers.a)} total={item.answers.a.total}
                                      type={"A"} title={item.answers.a.text}
                                      onClick={() => setChecked(index, item.answers.a,'A')}
                                      checked={checkControl(index, item.answers.a)}
                                      correctAnswer={correctCheck(index, item.answers.a)}
                                      isOpen={!countdown}

                        />
                      </Grid.Col>
                      <Grid.Col md={6}>
                        <QuestionItem wrongAnswer={replyWrongCheck(index, item.answers.b)} total={item.answers.b.total}
                                      type={"B"}
                                      title={item.answers.b.text} onClick={() => setChecked(index, item.answers.b,'B')}
                                      checked={checkControl(index, item.answers.b)}
                                      correctAnswer={correctCheck(index, item.answers.b)}
                                      isOpen={!countdown}

                        />
                      </Grid.Col>
                      <Grid.Col md={6}>
                        <QuestionItem wrongAnswer={replyWrongCheck(index, item.answers.c)} total={item.answers.c.total}
                                      type={"C"} title={item.answers.c.text}
                                      onClick={() => setChecked(index, item.answers.c,'C')}
                                      checked={checkControl(index, item.answers.c)}
                                      correctAnswer={correctCheck(index, item.answers.c)}
                                      isOpen={!countdown}

                        />
                      </Grid.Col>
                      <Grid.Col md={6}>
                        <QuestionItem wrongAnswer={replyWrongCheck(index, item.answers.d)} total={item.answers.d.total}
                                      type={"D"} title={item.answers.d.text}
                                      onClick={() => setChecked(index, item.answers.d,'D')}
                                      checked={checkControl(index, item.answers.d)}
                                      correctAnswer={correctCheck(index, item.answers.d)}
                                      isOpen={!countdown}
                        />
                      </Grid.Col>
                    </Grid>
                  </div>
                }

                {item.isAdvert &&
                  <Image src={'/img/banner-image.png'} className={"banner-image"}/>
                }

              </SwiperSlide>
            )
          })
          }

        </Swiper>


      </div>
    </div>);

}

export default QuizQuestion;
