import { UnstyledButton } from '@mantine/core';
import React from 'react';


interface Props {
  style?: object;
  onClick: () => void;
  title:string
}

export const FormButton = ({title = '', style, onClick }: Props) => {

  return (<UnstyledButton
    style={style}
    onClick={() => onClick && onClick()}
    className={'join-form-btn'}>{title}</UnstyledButton
  >)

}

export default FormButton;
