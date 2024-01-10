import {Title,List} from "@mantine/core";
import { Link } from 'react-router-dom';
import { RiArrowRightUpLine } from "react-icons/ri";


interface Props{
  data:Array<{
      title:string;
      link:string;
  }>;
  isTarget:boolean;
  title:string;
}

export const FooterList = ({title,isTarget,data}:Props) => {
    return(<div className={"footer-list-ul"}>
      <Title  className={"footer-ul-title"} color={"#fff"} fz={14.75} fw={700} lh={"16px"} mb={28} order={6}>{title}</Title>
      <List p={0} listStyleType={"none"}>
        {data.map((item,index) => (
          <List.Item>
            <Link target={isTarget ? '_blank' : ''} className={"footer-list-item"} to={item.link}>{item.title}
              {isTarget &&
                <RiArrowRightUpLine style={{marginLeft:5,marginBottom:-1}} size={12} color={"#fff"} />
              }
            </Link>
          </List.Item>
        ))}
      </List>
    </div>)
}

export default FooterList;
