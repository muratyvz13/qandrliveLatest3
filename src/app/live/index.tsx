import { Container, Grid,Title } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import React, { useState, useEffect } from "react";
import Quiz from './components/quiz';
import Reward from './components/reward';
import Banner from "./components/banner";
import Challenge from './components/challenge';
import socketIOClient from "socket.io-client";

import { useWeb3Modal,useWeb3ModalProvider, useWeb3ModalAccount  } from '@web3modal/ethers5/react'
const socket = socketIOClient("https://quiz-ws-server-a25e2a4e63e7.herokuapp.com");

interface LiveProps {
}
export const Live: React.FunctionComponent<LiveProps> = ({ }) => {

  
  const { open } = useWeb3Modal()
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const [walletAddress,setWalletAddress]=useState("");
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState("");
  const [quizName, setQuizName] = useState("Exolo Live Quiz");
  const [options, setOptions] = useState(["1", "2", "3", "4"]);
  const [trueAnswer, setTrueAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState(""); 
  const [userAnswerTime, setUserAnswerTime] = useState(0); 
  const [countDown, setCountDown] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState("");
  const [width, setWidth] = useState(100);
  const [isWaiting, setIsWaiting] = useState(1);
  const [isGameOver, setIsGameOver] = useState(0);
  const [clickedIndexState, setClickedIndexState] = useState(0);

  const [sortedUsers, setSortedUsers] = useState([
    { username: 'A',score:10,time: 0 ,rank:10,imageSrc: '/i'}
    // Eklemek istediğiniz diğer adaylar
  ]);
  const [advertImage, setAdvertImage] = useState("/images/chaingptadvert.jpeg");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestionNumber, setTotalQuestionNumber] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [onlineUser, setOnlineUser] = useState(0);
  const [optionsCounts, setOptionsCounts] = useState([
    { name: 'A', votes: 0 },
    { name: 'B', votes: 0 },
    { name: 'C', votes: 0 },
    { name: 'D', votes: 0 }
    // Eklemek istediğiniz diğer adaylar
  ]);
  const optionss = [
    "A",
    "B",
    "C",
    "D"
  ]
  const colors = [
    "bg-neu-pink4",
    "bg-neu-red3",
    "bg-neu-purple3",
    "bg-neu-blue3",
  ];
  const optionType = [
    "A",
    "B",
    "C",
    "D",
  ];

 


  
  
  
  
  useEffect(() => {
    
  
    if(trueAnswer!=="")
    {
      if(userAnswer == "A")
      {
        socket.emit("optionACounter");
      }
      if(userAnswer == "B")
      {
        socket.emit("optionBCounter");
      }
      if(userAnswer == "C")
      {
        socket.emit("optionCCounter");
      }
      if(userAnswer == "D")
      {
        socket.emit("optionDCounter");
      }
      socket.emit("increaseTotalTime",userAnswerTime);
      
      if (userAnswer.toLowerCase() === trueAnswer.toLowerCase())
      {
        socket.emit("increaseScore");
        
      }
    }
  }, [trueAnswer]);

 

  
  useEffect(() => {
    
    //checkMetamaskConnectionn();
    if (address !== undefined) {
      setWalletAddress(address);
      console.log(address);
    socket.emit("setParams", { username: address});
    
    socket.emit("joinRoom", "tuNNcay");
    
    
    socket.on("question", (question) => {
      setQuestion(question);
      setTrueAnswer("*");
      setUserAnswer("");
    });
    socket.on("currentQuestionIndex", (currentQuestionIndex) => {
    let optionsArray = String(currentQuestionIndex).split(",");
    setCurrentQuestionIndex(parseInt(optionsArray[0],10));
    setTotalQuestionNumber(parseInt(optionsArray[1],10));
  });

  socket.on("advertisingImage", (advertisingImage) => {
    setAdvertImage(String(advertisingImage));

  });
  socket.on("onlineUser", (onlineuser) => {
    setOnlineUser(parseInt(onlineuser));

  });
  socket.on("optionsCounts", (optionscounts) => {
    
    let values=optionscounts.toString();
    let splittedValues = values.split(',');
    setOptionsCounts([
      { name: 'A', votes: parseInt(splittedValues[0]) },
      { name: 'B', votes: parseInt(splittedValues[1]) },
      { name: 'C', votes: parseInt(splittedValues[2]) },
      { name: 'D', votes: parseInt(splittedValues[3]) }
      // Eklemek istediğiniz diğer adaylar
    ]);
    console.log(optionsCounts);
    
  });
  socket.on("quizName", (quizname) => {
    setQuizName(String(quizname));
  });
  socket.on("userScore", (score) => {
   // alert("score geldi");
    setUserScore(parseInt(score));
  });

  socket.on("options", (options) => {

    let optionsArray = String(options).split(",");
    setOptions([optionsArray[0], optionsArray[1], optionsArray[2], optionsArray[3]]);
  });

  socket.on("answer", (answer) => {
    
    setTrueAnswer(String(answer));

  
  });

  socket.on("waiting", (waiting) => {
    setIsWaiting(waiting);
  });
  

  socket.on("gameOver", (sortedUsers) => {

    setIsGameOver(1);

    setSortedUsers(sortedUsers);
    //console.log(sortedUsers);
   
  });

  socket.on("countdown", (message) => {
    setCountDown(message);
  });
}
  }, [address]);

  
  useDocumentTitle('Qandr Live - Live');

  const [data,setData] = useState([
    {
      title:'Last Challange Results',
      isIcon:false,
      data:[
        {
          user:'sef**012***azor',
          value:'512 $'
        },
        {
          user:'sef**012***azor',
          value:'512 $'
        },
        {
          user:'sef**012***azor',
          value:'512 $'
        },
        {
          user:'sef**012***azor',
          value:'512 $'
        },
        {
          user:'sef**012***azor',
          value:'512 $'
        },
        {
          user:'sef**012***azor',
          value:'512 $'
        },
        {
          user:'sef**012***azor',
          value:'512 $'
        },
        {
          user:'sef**012***azor',
          value:'512 $'
        },
        {
          user:'sef**012***azor',
          value:'512 $'
        },
        {
          user:'sef**012***azor',
          value:'512 $'
        },

      ]
    },
    {
      title:'Highest Winner of All Time',
      isIcon:true,
      data:[
        {
          user:'sef**012***azor',
          value:'5.433 Point'
        },
        {
          user:'sef**012***azor',
          value:'5.433 Point'
        },
        {
          user:'sef**012***azor',
          value:'5.433 Point'
        },
        {
          user:'sef**012***azor',
          value:'5.433 Point'
        },
        {
          user:'sef**012***azor',
          value:'5.433 Point'
        },
        {
          user:'sef**012***azor',
          value:'5.433 Point'
        },
        {
          user:'sef**012***azor',
          value:'5.433 Point'
        },
        {
          user:'sef**012***azor',
          value:'5.433 Point'
        },
        {
          user:'sef**012***azor',
          value:'5.433 Point'
        },
        {
          user:'sef**012***azor',
          value:'5.433 Point'
        },
      ]
    }
  ]);


  return (<>



    <Quiz walletAddress={walletAddress} setClickedIndexState={setClickedIndexState}  setUserAnswerTime={setUserAnswerTime} setUserAnswer={setUserAnswer} countDown={countDown} waiting={isWaiting} currentQuestion={question} trueAnswer={trueAnswer} userAnswer={userAnswer} options={options} gameOver={isGameOver} quizName={quizName} totalQuestionNumber={totalQuestionNumber} currentQuestionIndex={currentQuestionIndex} optionsCounts={optionsCounts} sortedUsers={sortedUsers} />
 
    <Reward/>
    
    <Container size={"xl"}>
      <Title mt={129} mb={166} ta={"center"} className={"grotesk-bold challenge-title"} order={2} fz={64} lh={"64px"} color={"#000"} fw={700} style={{letterSpacing:-1.92}}>CHALLANGE RESULTS</Title>
      

      <Grid gutter={45}>
        {data.map((item,index) => (
          <Grid.Col lg={6} key={`challenge-${index}`}>
            <Challenge {...item}/>
          </Grid.Col>
        ))}

      </Grid>
      
    </Container>

    <Banner img={'/img/banner.png'}/>

  </>);
}

export default Live;

