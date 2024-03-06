import { Group, Image, Text, UnstyledButton } from '@mantine/core';
import React from 'react';

interface Props{
  onClick:(index:number) => void;
  title:string;
  rightComponent?:React.ReactNode;
}

export const QuizHeader = ({onClick,title,rightComponent}:Props) => {

  return (
    <div className="question-top">
      <Group spacing={4}>
        <UnstyledButton>
          <Image src={'/img/question.svg'} w={32} height={32} fit={"contain"}/>
        </UnstyledButton>
        {
        <UnstyledButton onClick={() => onClick && onClick(4)}>
          <Image src={'/img/profile.svg'} w={32} height={32} fit={"contain"}/>
        </UnstyledButton>
        }
         <UnstyledButton onClick={() => onClick && onClick(1)}>
          <Image src={'/img/back.svg'} w={32} height={32} fit={"contain"}/>
        </UnstyledButton>
      </Group>
      <Text style={{ flex: 1 }} pl={rightComponent ? 35 : 0} ml={rightComponent ? 0 : -90} mt={3} ta={"center"} fz={18.81} lh={"34px"} fw={700}
            className={"grotesk-bold title"} color={"#000"} lts={-0.5}>
        {title}
      </Text>

      {rightComponent}
    </div>
  )

}

export default QuizHeader;
