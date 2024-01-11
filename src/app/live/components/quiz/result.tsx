import React, { useEffect, useState } from 'react';
import QuizHeader from './header';
import {Text} from "@mantine/core";

interface Props {
  onClick: (index: number) => void;
  sortedUsers:{username:string;score:number;time:number;rank:number;imageSrc:string}[];
}


export const QuizResult = ({onClick,sortedUsers}:Props) => {

  function manipulateString(inputString: string): string {
    // String'in uzunluğunu kontrol et
    if (inputString.length < 3) {
        console.log("String en az 3 karakter içermelidir.");
        return inputString;
    }

    // İlk 3 harfi al
    const firstThreeChars: string = inputString.slice(0, 3);

    // Son 3 harfi al
    const lastThreeChars: string = inputString.slice(-3);

    // Ortadaki karakterleri sil
    const middleChars: string = inputString.slice(3, -3);

    // Manipüle edilmiş string'i oluştur
    const manipulatedString: string = firstThreeChars + middleChars + lastThreeChars;

    // Sonucu yazdır
    console.log("Manipüle Edilmiş String:", manipulatedString);

    return manipulatedString;
}




  const [result,setResult] = useState([
    {
      id:1,
      title:'0x34.....14232312...32.4',
      point:'512 $'
    },
    {
      id:2,
      title:'0x34.....14232312...32.4',
      point:'212 $'
    },
    {
      id:3,
      title:'0x34.....14232312...32.4',
      point:'120 $'
    },
    {
      id:4,
      title:'0x34.....14232312...32.4',
      point:'90 $'
    },
    {
      id:5,
      title:'0x34.....14232312...32.4',
      point:'80 $'
    },
    {
      id:6,
      title:'0x34.....14232312...32.4',
      point:'20 $'
    },
    {
      id:7,
      title:'0x34.....14232312...32.4',
      point:'4 $'
    },
    {
      id:8,
      title:'0x34.....14232312...32.4',
      point:'4 $'
    },
    {
      id:9,
      title:'0x34.....14232312...32.4',
      point:'4 $'
    },
    {
      id:10,
      title:'0x34.....14232312...32.4',
      point:'4 $'
    }
  ]);
  useEffect(() => {
    console.log(sortedUsers);
    const transformedResult = sortedUsers.map((user, index) => ({
      id: index + 1,
      title: user.username.slice(0, 5)+"..."+user.username.slice(-5),
      point: `${user.score} `,
    }));
  
    setResult(transformedResult);
  }, [sortedUsers]);

  return(
    <div>
      
      <div className={"quiz-area"}>
        <div className={"profile-header"}>
          <QuizHeader title={"RESULTS 🔥"} onClick={(index) => onClick && onClick(index)}/>

          <div className={"result-quiz-box"}>
            <div className={"result-quiz-box-top"}>
              <Text fz={12} mr={45} className={"grotesk-regular rank-title"} color={"#000"} lts={-0.3} fw={400}>RANK</Text>
              <Text fz={12} className={"grotesk-regular"} color={"#000"} lts={-0.3} fw={400} style={{flex:1}}>USER</Text>
              <Text fz={12} className={"grotesk-regular"} color={"#000"} lts={-0.3} fw={400}>Point</Text>
            </div>

            <div className="result-quiz-box-bottom">
  
          
     
              {result.map((item,index) => (
                <div className={`result-quiz-box-item item-${index+1}`}>
                  <div className={"badge-result"}>{index+1}</div>
                  <Text style={{flex:1}} className={"title"} fz={9} color={"#000"} fw={300} lts={-0.7}>{item.title}</Text>
                  <Text className={"title"} fz={9} color={"#000"} fw={300} lts={-0.7}>{item.point}</Text>

                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </div>
  )

}

export default QuizResult;
