import { Center, Grid, Image, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormButton from '../../../../lib/components/Form/button';
import { Button } from '@mantine/core';
import CountDownItem from './countdownItem';
import SponsorItem from './sponsor';
import { useWeb3Modal,useWeb3ModalProvider, useWeb3ModalAccount  } from '@web3modal/ethers5/react'
import { ethers } from 'ethers'
import { signInWithGooglePopup,auth } from "../../../../firebase-config"
import { GoogleAuthProvider,signOut } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import { add } from 'lodash';
import { TextInput } from '@mantine/core';
interface Props {
  onClick: () => void;
  quizName: string; // countDown prop'u eklendi
  userMail?:string | undefined;
  setUserMail:React.Dispatch<React.SetStateAction<string>>;
  findUserName?:boolean | undefined;
  setFindUserName:React.Dispatch<React.SetStateAction<boolean>>;
  username: string; // countDown prop'u eklendi
};



const QuizCountDown: React.FC<Props> = ({ username,onClick,quizName,userMail,setUserMail,findUserName,setFindUserName}: Props) => {
  
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    
}
const logout = async () => {
  
  try {
    await signOut(auth);
 
    
    
  } catch (error) {
    console.error('Çıkış yapılırken bir hata oluştu', error);
  }
};


function calculateTimeDifference(now: Date, targetDate: Date): { hours: number, minutes: number, seconds: number } {
  const differenceInMilliseconds = targetDate.getTime() - now.getTime();

  const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

const now: Date = new Date();

// Aynı günün 20:00'ine ayarlanmış tarih ve saat
const eveningTargetDate: Date = new Date();
eveningTargetDate.setHours(22, 0, 0, 0);

// Farkı hesapla ve yazdır
const timeDifference = calculateTimeDifference(now, eveningTargetDate);

const initialCountdown = {
  days: 0,
  hours: timeDifference.hours,
  minutes: timeDifference.minutes,
  seconds: timeDifference.seconds,
};
  const { open } = useWeb3Modal()
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const [countdown, setCountdown] = useState(initialCountdown);
  const [quizNameState, setQuizNameState] = useState(quizName);
  const [usernameText, setUsernameText] = useState('');

  const checkUsernameMail = async () => {
    try {
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/check-username-withmail', {
        user_mail: userMail
      });
      
      // Burada bir değer döndürülüyor olmalı
      setFindUserName(response.data.usernameExists);
      
      return response.data.usernameExists;
    } catch (error) {
      console.error('Error:', error);
  
      // Hata durumunda bir değer döndürülüyor
      return false;
    }
  };

  const checkUsernameWallet = async () => {
    try {
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/check-username-withwallet', {
        user_walletAddress: address
      });
   
      // Burada bir değer döndürülüyor olmalı
      setFindUserName(response.data.usernameExists);
     
      return response.data.usernameExists;
    } catch (error) {
      console.error('Error:', error);
  
      // Hata durumunda bir değer döndürülüyor
      return false;
    }
  };

  const updateUsernameWithmail = async () => {
    try {
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/update-username-by-mail', {
        user_mail: userMail,
        new_username: usernameText
      });
      setFindUserName(true);
      checkUsernameMail();
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      // Hata durumunda bir değer döndürülüyor
      return false;
    }
  };

  const updateUsernameWithWallet = async () => {
    try {
      
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/update-username-by-wallet', {
        user_wallet: address,
        new_username: usernameText
      });
      setFindUserName(true);
      checkUsernameWallet();
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      // Hata durumunda bir değer döndürülüyor
      return false;
    }
  };
  useEffect(() => {
    
    if(address !== undefined   )
    {
      checkUsernameWallet();
        
    }
    if(userMail !== null &&  userMail!== "")
    {
      checkUsernameMail();
      
    }

  }, [address,userMail]);
  
  useEffect(() => {
    if(userMail !== "")
    {
      //checkUsername();
    }
  }, [userMail]);

  useEffect(() => {
    setQuizNameState(quizName);
  }, [quizName]);

  useEffect(() => {
    
  }, [isConnected]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        const { days, hours, minutes, seconds } = prevCountdown;
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(interval);
          // Geri sayım tamamlandığında yapılacak işlemleri buraya ekleyebilirsiniz.
          onClick();
          return prevCountdown;
        } else {
          const newSeconds = seconds === 0 ? 59 : seconds - 1;
          const newMinutes = newSeconds === 59 ? minutes - 1 : minutes;
          const newHours = newMinutes === 59 ? hours - 1 : hours;
          const newDays = newHours === 23 && newMinutes === 59 && newSeconds === 59 ? days - 1 : days;

          return {
            days: newDays,
            hours: newHours,
            minutes: newMinutes,
            seconds: newSeconds,
          };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onClick]);

 

  useEffect(() => {
    // Kullanıcının giriş durumunu dinle
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // Kullanıcı giriş yapmış
       
        setUserMail(user.email ?? "");
        
      
      } else {
        // Kullanıcı giriş yapmamış
        setUserMail("");
       
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <div>
     
      <div className={"quiz-area"}>
        <Center>
          <div className={"w-quiz-answer-w100"} style={{ textAlign: 'center' }}>
       
            <Center mt={35}>
              <Link to={'/'}>
                <Image src={'/img/logo.png'} width={54.54} height={54.54} fit={'contain'}/>
              </Link>
            </Center>

            <Text mt={25} mb={15} fz={31.86} fw={600} lh={'45px'} className={'grotesk-semibold quiz-item-title'}>
              # {quizNameState} #
            </Text>
  
            <div>
        </div>
            <Center mb={28}>
              <div className="reward-outline">
                <div>
                  <Text fz={10} fw={400} lts={-0.3} lh={"11px"} color={"#000"} className={"grotesk-regular"}>REWARD
                    PRIZE</Text>
                  <Text fw={700} color={"#000"} fz={14} className={"grotesk-bold"} lts={-0.42} lh={"14px"}>100
                    USDT</Text>
                </div>
              </div>
            </Center>
            
            <div className={'center-item-days'}>
              <CountDownItem value={countdown.days} title={'DAYS'}/>
              <CountDownItem value={countdown.hours} title={'HOURS'}/>
              <CountDownItem value={countdown.minutes} title={'MINUTES'}/>
              <CountDownItem value={countdown.seconds} title={'SECONDS'}/>
            </div>
            

            <div style={{ display: 'inline-block', marginBottom: 45 }}>
              {/* || userMail !=="" */}
              {findUserName && username!=="" &&(isConnected || userMail !==""  ? ( 
                <>
                {userMail !== "" ? (
                  <div style={{display:''}}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <FormButton style={{ marginBottom: 15 }} title={"Join Now"} onClick={() => onClick && onClick()} />
    <Button variant="filled" color="red" style={{ marginBottom: 15 }} onClick={() => logout()}>Log Out</Button>
    <div>
      
      
                      
                      <Text fz={15} fw={400} lts={-0.3} lh={"11px"} color={"#000"} className={"grotesk-regular"}>{username}
      
                      </Text>
      
    </div>
  </div>
          
                   </div>
                ) : (
                 
                  <div style={{display:''}}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <FormButton style={{ marginBottom: 15 }} title={"Join Now"} onClick={() => onClick && onClick()} />
  <Button variant="filled" color="red" style={{ marginBottom: 15 }} onClick={() => open()}>Disconnect Wallet</Button>
  <div>
    

                    <Text fz={15} fw={400} lts={-0.3} lh={"11px"} color={"#000"} className={"grotesk-regular"}>{username}
  
                    </Text>
                    
                    
                    
    
  </div>
</div>
        
                 </div>
                )
                }
                
                 
                 </>) : (
                      <div>
                        
                       
                        
                 <FormButton title={"Connect Wallet"} onClick={() => open()} />
                 <FormButton title={"Login gmail"} onClick={() => logGoogleUser()} />
                 
                 </div>
                  ))}
                 {!findUserName && ( 
                  <div>
                  {/* Label */}
                  <TextInput
        label="Please enter your username"
        placeholder="@username"
        value={usernameText} // TextInput bileşeninin değerini durum değişkeni ile bağlayın
        onChange={(event) => setUsernameText(event.currentTarget.value)} // Kullanıcı girişini usernameText durumuna güncelleyin
      />
                  <br />
                  {/* Buton */}
                  <FormButton title={"Save"} onClick={() => {
    if (userMail !== "") {
      updateUsernameWithmail();
    } else {
      updateUsernameWithWallet();
    }
  }} />
                </div>
                 )}


            </div>
          </div>
          
        </Center>
        
      </div>

    </div>
  );
};

export default QuizCountDown;
