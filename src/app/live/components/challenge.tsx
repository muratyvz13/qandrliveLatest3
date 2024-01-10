import { Text, Title,Image } from "@mantine/core";

interface Props {
  data: Array<{
    user: string;
    value: string;
  }>;
  title: string;
  isIcon: boolean;
}

export const Challenge = ({ data, title, isIcon }: Props) => {

  return (<div className={"challenge-list"}>
    <Title fw={700} className={"grotesk-bold high-title"} fz={34} lh={"53px"} style={{ letterSpacing: -1 ,display:'flex', alignItems:'center'}}
           order={3}><span style={{flex:1}}>🔥 {title}</span>
      {isIcon &&
          <Image src={'/img/division.png'} width={25.9} height={40.04}/>
      }
    </Title>
    <div className={"top-table"}>
      <Text mr={35} fz={20} fw={400} className={"grotesk-regular challenge-top-title"} style={{ letterSpacing: -0.6 }} color={"#000"}
            lh={"53px"}>RANK</Text>
      <Text fz={20} fw={400} className={"grotesk-regular challenge-top-title"} style={{ letterSpacing: -0.6, flex: 1 }} color={"#000"}
            lh={"53px"}>USER</Text>
      <Text fz={20} fw={400} className={"grotesk-regular challenge-top-title"} style={{ letterSpacing: -0.6 }} color={"#000"}
            lh={"53px"}>VALUE</Text>
    </div>
    <div className="table-body">
      {data.map((item, index) => (
        <div className="table-item" key={`table-item-${index}`}>
          <div className="square">
           <Text className={"grotesk-bold"} mt={-2.5} fz={30} fw={700} style={{letterSpacing:-0.9}}>{index+1}</Text>
          </div>
          <Text className={"challange-item-title"} fw={400} lh={"53px"} fz={30} color={"#000"} style={{letterSpacing:-0.9,flex:1}}>{item.user}</Text>
          <Text className={"challange-item-title"} fw={700} lh={"53px"} fz={30} color={"#000"} style={{letterSpacing:-0.9}}>{item.value}</Text>
        </div>
      ))}
    </div>
  </div>);

}

export default Challenge;
