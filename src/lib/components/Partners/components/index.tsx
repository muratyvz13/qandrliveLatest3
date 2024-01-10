import { Box,Image } from '@mantine/core';

interface Props{
  item:{
    title:string;
    img:{
      src:string;
      width:number;
      height:number;
    }
  }
}

export const PartnerItem = ({item}:Props) => {
  return (<Box  h={142} className={"partner-item"}>

    <Image
      width={item.img.width}
      height={item.img.height}
      alt={item.title}
      src={`/img/${item.img.src}`}
      fit={"contain"}
    />

  </Box>)
}

export default PartnerItem;
