import {Text} from "@mantine/core";


interface Props{
  title:string;
}


export const MarqueeItem = ({title}:Props) => {
    return(
      <Text mr={150} className={"grotesk-bold slide-swipe-title"} color={"#000"} fz={60} lh={"47px"} fw={900} >{title}</Text>
    )
}

export default MarqueeItem;
