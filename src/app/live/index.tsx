import { Container, Grid,Title } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import React, { useState, useEffect } from "react";
import Quiz from './components/quiz';
import Reward from './components/reward';
import Banner from "./components/banner";
import Challenge from './components/challenge';
import socketIOClient from "socket.io-client";
import axios from 'axios';
import { useWeb3Modal,useWeb3ModalProvider, useWeb3ModalAccount  } from '@web3modal/ethers5/react'

const socket = socketIOClient("https://quiz-ws-server-a25e2a4e63e7.herokuapp.com", {
//const socket = socketIOClient("http://localhost:8000", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity
});

interface LiveProps {
}
export const Live: React.FunctionComponent<LiveProps> = ({ }) => {

  
  const { open } = useWeb3Modal()
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const [walletAddress,setWalletAddress]=useState("");
  const [username, setUsername] = useState("");
  const [championship_trophy, setChampionship_trophy] = useState("");
  const [participation_trophy, setParticipation_trophy] = useState("");
  const [top_ten_trophy, setTop_ten_trophy] = useState("");
  const [top_three_trophy, setTop_three_trophy] = useState("");
  const [question, setQuestion] = useState("");
  const [quizName, setQuizName] = useState("Exola Live Quiz");
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
  const [userMail, setUserMail] = useState("");
  const [checkusername, setCheckusername] = useState(true);
  const [mailcheck, setMailcheck] = useState(false);
  const [findUserName, setFindUserName] = useState(true);
 
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


  const checkUsernameMail = async () => {
    try {
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/get-username', {
        user_mail: userMail,
      });
      
      // Burada bir değer döndürülüyor olmalı
      
      setUsername(response.data.user_username);
      setChampionship_trophy(response.data.user_championship_trophy);
      setParticipation_trophy(response.data.user_participation_trophy);
      setTop_ten_trophy(response.data.user_top_ten_trophy);
      setTop_three_trophy(response.data.user_top_three_trophy);
      
      
      return response.data.user_username;
    } catch (error) {
      console.error('Error:', error);
  
      // Hata durumunda bir değer döndürülüyor
      return false;
    }
  };

  const checkUsernameWallet = async () => {
    try {
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/get-username', {
        user_walletAddress: address,
      });
      
      // Burada bir değer döndürülüyor olmalı
     
      setUsername(response.data.user_username);
      setChampionship_trophy(response.data.user_championship_trophy);
      setParticipation_trophy(response.data.user_participation_trophy);
      setTop_ten_trophy(response.data.user_top_ten_trophy);
      setTop_three_trophy(response.data.user_top_three_trophy);
    
      console.log(response.data);
      return response.data.user_username;
    } catch (error) {
      console.error('Error:', error);
  
      // Hata durumunda bir değer döndürülüyor
      return false;
    }
  };
  useEffect(() => {
    
    if( isConnected  )
    {
      checkUsernameWallet();
        
    }
    if(userMail !== null &&  userMail!== "")
    {
      checkUsernameMail();
      
    }

  }, [address,userMail,username]);
  const createUserWithWallet = async () => {
    try {
        const response = await axios.post('https://qandrlivebackend-jet.vercel.app/register', {
        user_walletAddress: address
        
      });
      
      setFindUserName(false);
    } catch (error) {
      console.error('Error:', error);
      
    }
  };
  const createUserWithMail = async () => {
    try {
        const response = await axios.post('https://qandrlivebackend-jet.vercel.app/register', {
          user_mail: userMail
        
      });
     
      setFindUserName(false);
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  const checkMail = async () => {
    try {
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/check-mail', {
        user_mail: userMail
      });
     
      // Burada bir değer döndürülüyor olmalı  
      return response.data.available;
    } catch (error) {
      console.error('Error:', error);
      // Hata durumunda bir değer döndürülüyor
      return false;
    }
  };

  const checkWallet = async () => {
    try {
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/check-wallet', {
        user_walletAddress: address
      });
      
      // Burada bir değer döndürülüyor olmalı  
      return response.data.available;
    } catch (error) {
      console.error('Error:', error);
      // Hata durumunda bir değer döndürülüyor
      return false;
    }
  };

 


  
  useEffect(() => {
    
    //checkMetamaskConnect*ionn();
    
    if ((address !== undefined ||  userMail !== "") && username!=="" ) {
      if (address !== undefined ) {
        
        setWalletAddress(address);
        
        
        checkWallet().then(available => {
       
          if (available) {
           
            createUserWithWallet();
            
          } 
        }).catch(error => {
          console.error('Error:', error);
          // Hata işleme
        });
      }
      if (userMail !== "" ) {
        
       
        checkMail().then(available => {
          
          if (available) {
          
            createUserWithMail()
            .then(response => {
              // Promise başarıyla çözüldüğünde burası çalışır
             
              setCheckusername(false);
              
              // Başka bir işlem yapabilirsiniz, örneğin durum güncellemesi veya yönlendirme
            })
            .catch(error => {
              // Promise reddedildiğinde (hata olduğunda) burası çalışır
              console.error('Kullanıcı oluşturulurken bir hata oluştu:', error);
              // Hata yönetimi yapabilirsiniz, örneğin kullanıcıya hata mesajı gösterebilirsiniz
            });
          
            
            
          } 
        }).catch(error => {
          console.error('Error:', error);
          // Hata işleme
        });
     
        }
      if (address !== undefined ) {
        
      }
      
      if(username!=="")
      {
        socket.emit("setParams", { username: username });
      }
    
    
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
  
    
  });
  socket.on("quizName", (quizname) => {
    setQuizName(String(quizname));
  });
  socket.on("userScore", (score) => {
   // alert("score geldi");
    setUserScore(parseInt(score));
  });

  socket.on("options", (options) => {

    //let optionsArray = String(options).split(",");
    setOptions([options[0], options[1], options[2], options[3]]);
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
    socket.disconnect();
 
  
   
  });

  socket.on("countdown", (message) => {
    setCountDown(message);
  });
}
  }, [address,userMail,username]);

  
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



    <Quiz   championship_trophy={championship_trophy}
  top_three_trophy={top_three_trophy}
  participation_trophy={participation_trophy}
  top_ten_trophy={top_ten_trophy} username={username} setUsername={setUsername} findUserName={findUserName} setFindUserName={setFindUserName} setUserMail={setUserMail} userMail={userMail} walletAddress={walletAddress}  setClickedIndexState={setClickedIndexState}  setUserAnswerTime={setUserAnswerTime} setUserAnswer={setUserAnswer} countDown={countDown} waiting={isWaiting} currentQuestion={question} trueAnswer={trueAnswer} userAnswer={userAnswer} options={options} gameOver={isGameOver} quizName={quizName} totalQuestionNumber={totalQuestionNumber} currentQuestionIndex={currentQuestionIndex} optionsCounts={optionsCounts} sortedUsers={sortedUsers} />
    
  
  
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

