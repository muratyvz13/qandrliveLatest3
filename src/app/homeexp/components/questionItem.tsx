import { Text, UnstyledButton } from '@mantine/core';
import { IoMdCheckmark } from 'react-icons/io';

interface Props {
  title: string;
  type: string;
  checked?: boolean;
  wrongAnswer?: boolean;
  onClick: () => void;
  small?: boolean;
  style?:object

}

export const QuestionItem = ({ title, type, onClick, wrongAnswer = false, checked = false, small = false,style = {} }: Props) => {
  return (<UnstyledButton style={style} className={`answer-item ${checked ? 'checked-answer' : ''} ${small ? 'small-item' : ''} ${wrongAnswer ? 'wrong-answer' : ''}`} onClick={() => onClick()}>
    <Text style={{ flex: 1 }} fw={700} fz={small ? 25 : 28}>{type}: {title}</Text>
    {checked &&
      <IoMdCheckmark size={24} color={"#000"}/>
    }
  </UnstyledButton>);
}
export default QuestionItem;
