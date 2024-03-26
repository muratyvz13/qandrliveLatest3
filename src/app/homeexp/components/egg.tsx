import { Image, Text } from "@mantine/core";

interface Props {
  item: {
    img:{
      src:string;
      width:number;
      height:number;
      style:object
    };
    title: string;
    subTitle: string;
    color: string;
    bgColor:string
  };
  index: number
}

export const EggItem = ({ item, index }: Props) => {

  return (<div className={"egg-item"} style={{ backgroundColor: item.bgColor,borderWidth:2,borderStyle:'solid',borderColor:item.color }}>
    <div style={{marginTop:-100,textAlign:'center'}}>
    <div style={{height:330,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Image  alt={item.title} src={`/img/${item.img.src}`} width={item.img.width} height={item.img.height} style={item.img.style}/>
    </div>
      <div style={{paddingLeft:60,paddingRight:60,height:100}}>
        <Text className={"grotesk-bold"} fz={34} color={item.color} align={"center"} fw={700}
              lh={"34px"} >{index+1}- {item.title}</Text>
        <Text fz={18} color={item.color} fw={400} align={"center"} lh={"19.4px"} mt={35}>{item.subTitle}</Text>
      </div>
    </div>
  </div>)

}

export default EggItem;
