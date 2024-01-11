import { Center, Grid, Image, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormButton from '../../../../lib/components/Form/button';
import { Button } from '@mantine/core';
import CountDownItem from './countdownItem';
import SponsorItem from './sponsor';
import { useWeb3Modal,useWeb3ModalProvider, useWeb3ModalAccount  } from '@web3modal/ethers5/react'
import { ethers } from 'ethers'
interface Props {
  onClick: () => void;
  quizName: string; // countDown prop'u eklendi
};



const QuizCountDown: React.FC<Props> = ({ onClick,quizName }: Props) => {
  const initialCountdown = {
    days: 1,
    hours: 6,
    minutes: 29,
    seconds: 48,
  };


  const { open } = useWeb3Modal()
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const [countdown, setCountdown] = useState(initialCountdown);
  const [quizNameState, setQuizNameState] = useState(quizName);

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
            
            

            <Center mb={28}>
              <div className="reward-outline">
                <div>
                  <Text fz={10} fw={400} lts={-0.3} lh={"11px"} color={"#000"} className={"grotesk-regular"}>REWARD
                    PRIZE</Text>
                  <Text fw={700} color={"#000"} fz={14} className={"grotesk-bold"} lts={-0.42} lh={"14px"}>50
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
              
              {isConnected ? (
                <div style={{display:''}}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <FormButton style={{ marginBottom: 15 }} title={"Join Now"} onClick={() => onClick && onClick()} />
  <Button variant="filled" color="red" style={{ marginBottom: 15 }} onClick={() => open()}>Disconnect Wallet</Button>
  <div>
    
    <Text fz={15} fw={400} lts={-0.3} lh={"11px"} color={"#000"} className={"grotesk-regular"}>{address?.slice(0, 5)+"..."+address?.slice(-6)}
                    </Text>
    
  </div>
</div>

                
                 
                 
                 </div>
                 
                    ) : (
                 <FormButton title={"Connect Wallet"} onClick={() => open()} />
                  )}

            </div>
          </div>
          
        </Center>
        
      </div>

    </div>
  );
};

export default QuizCountDown;
