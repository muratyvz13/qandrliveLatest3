import { Text } from '@mantine/core';
import React from 'react';

interface Props{
  value: number | string;
  title: string
}

export const CountDownItem = ({value,title}:Props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Text fz={60} fw={700} className={"grotesk-bold countdown-title"} lh={"60px"} lts={-3.7} color={"#000"} mb={10}>{value}</Text>
      <Text fz={19.5} lh={"20px"} fw={400} lts={-0.5} className={"grotesk-regular countdown-text"}>{title}</Text>
    </div>
  )
}

export default CountDownItem;


