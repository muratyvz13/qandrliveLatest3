import { Text, UnstyledButton, Image, Group } from '@mantine/core';
import { IoMdCheckmark } from 'react-icons/io';

interface Props {
  title: string;
  type: string;
  checked?: boolean;
  wrongAnswer?: boolean;
  correctAnswer?: boolean;
  onClick: () => void;
  small?: boolean;
  style?:object;
  total:number;
  isOpen?:boolean

}

export const QuestionItem = ({ title, total = 0, type, onClick, isOpen = false, wrongAnswer = false, correctAnswer = false, checked = false, small = false,style = {} }: Props) => {
  return (<UnstyledButton style={{height:"68px"}} className={`answer-item ${checked ? 'checked-answer' : ''} ${small ? 'small-item' : ''} ${wrongAnswer ? 'wrong-answer' : ''} ${correctAnswer ? 'correct-answer' : ''}`} onClick={() => onClick()}>
    <Text style={{ lineHeight: '1',flex: 1,fontSize:"17px" }} className={"title"} fw={700} fz={small ? 25 : 28}>{type}: {title}</Text>

    {isOpen &&
   <Group spacing={5}>
     <Image src={'/img/profile-icon.png'} width={15} height={15} fit={"contain"} style={{marginTop:-1.2}}/>
       <Text fz={14} fw={500} color={"#fff"} className={"rubik-regular"}>
         {"%"}{total}</Text>
   </Group>
    }
  </UnstyledButton>);
}
export default QuestionItem;
