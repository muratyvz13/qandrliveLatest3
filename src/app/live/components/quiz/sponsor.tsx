import { Image } from "@mantine/core";

interface Props {
  image: {
      src:string;
      width:number;
      height:number
  };
}

export const SponsorItem = ({ image }: Props) => {
  return (<div className={"sponsor-box"}>
    <Image fit={"contain"} {...image}/>
  </div>)
}

export default SponsorItem;
