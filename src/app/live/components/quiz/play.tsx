import { Center, Text, Image, UnstyledButton } from '@mantine/core';
import React, { useEffect, useState } from 'react';


interface Countdown {
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  onClick:() =>void;
}


const QuizPlay: React.FC<Props> = ({onClick}:Props) => {

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
  eveningTargetDate.setHours(18,30, 0, 0);
  
  // Farkı hesapla ve yazdır
  const timeDifference = calculateTimeDifference(now, eveningTargetDate);
  
  
  const [countdown, setCountdown] = useState<Countdown>({
    hours: timeDifference.hours,
    minutes: timeDifference.minutes,
    seconds: timeDifference.seconds,
  });


  useEffect(() => {
    const interval = setInterval(() => {
      // Zamanı her saniye azalt
      setCountdown((prevCountdown) => {
        const { hours, minutes, seconds } = prevCountdown;
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(interval);
          // Geri sayım tamamlandığında yapılacak işlemleri buraya ekleyebilirsiniz.
          return prevCountdown; // Bu satırı ekleyin
        } else {
          // Zamanı azalt
          const newSeconds = seconds === 0 ? 59 : seconds - 1;
          const newMinutes = newSeconds === 59 ? minutes - 1 : minutes;
          const newHours = newMinutes === 59 ? hours - 1 : hours;

          return {
            hours: newHours,
            minutes: newMinutes,
            seconds: newSeconds,
          };
        }
      });
    }, 1000);

    // Komponentin unmount edildiğinde interval'i temizle
    return () => clearInterval(interval);
  }, []); // Boş dependency array kullanarak sadece bir kere çalışmasını sağla




  return(<Center className={"center-play"}>
      <div style={{textAlign:'center'}}>
        <Text mt={132} mb={100} fz={64} fw={600} lh={'53px'} className={'grotesk-semibold next-ch-title'}>
          NEXT CHALLENGE:{' '}
          <b className={'grotesk-bold'}>
            {`${countdown.hours.toString().padStart(2, '0')}:${countdown.minutes
              .toString()
              .padStart(2, '0')}:${countdown.seconds.toString().padStart(2, '0')}`}
          </b>
        </Text>
        <UnstyledButton style={{cursor:'pointer'}} onClick={() => onClick()}>
          <Image className={"play-btn-image"} style={{display:'inline-block'}} fit={"contain"} src={'/img/play.png'} width={249} height={249}/>
        </UnstyledButton>
      </div>
    </Center>)
}

export default QuizPlay;
