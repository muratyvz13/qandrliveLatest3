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
  style?: object;
  total: number;
  isOpen?: boolean;
}

export const QuestionItem = ({
  title, 
  total = 0, 
  type, 
  onClick, 
  isOpen = false, 
  wrongAnswer = false, 
  correctAnswer = false, 
  checked = false, 
  small = false,
  style = {}
}: Props) => {
  const textStyle = small ? { lineHeight: '1' } : { lineHeight: '1' };

  return (
    <UnstyledButton 
      style={style} 
      className={`answer-item ${checked ? 'checked-answer' : ''} ${small ? 'small-item' : ''} 
                  ${wrongAnswer ? 'wrong-answer' : ''} ${correctAnswer ? 'correct-answer' : ''}`} 
      onClick={() => onClick()}
    >
      <Text 
        style={{ ...textStyle, flex: 1 }} 
        className="title" 
        fw={700} 
        fz={small ? 25 : 28}
      >
        {type}: {type}
      </Text>

      {isOpen && (
        <Group spacing={5}>
          <Image 
            src={'/img/profile-icon.png'} 
            width={15} 
            height={15} 
            fit="contain" 
            style={{marginTop:-1.2}}
          />
          <Text 
            style={textStyle}
            fz={14} 
            fw={500} 
            color="#fff" 
            className="rubik-regular"
          >
            {"%"}{total}
          </Text>
        </Group>
      )}
    </UnstyledButton>
  );
}

export default QuestionItem;
