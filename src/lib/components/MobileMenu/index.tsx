import { Grid, List, Text, UnstyledButton } from "@mantine/core";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';

interface Props {
  onClose: () => void;
  isVisible: boolean
}


export const MobileMenu = ({ onClose, isVisible }: Props) => {

  const scrollClick = (id:string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    onClose && onClose();
  }


  return (<div id={`mobileMenu`} className={isVisible ? 'show' : ''}>

    <Grid>
      <Grid.Col span={6}>
        <Text color={"#fff"} size={25} fw={700} className={"grotesk-bold"}>MENU</Text>
      </Grid.Col>
      <Grid.Col span={6}>
        <UnstyledButton style={{ float: 'right' }} onClick={() => onClose && onClose()}>
          <IoMdCloseCircle color={"#fff"} size={35}/>
        </UnstyledButton>
      </Grid.Col>
    </Grid>

    <List className={"mobile-menu-list"}>
      <List.Item>
        <Link to={'/'}>Home</Link>
      </List.Item>
      <List.Item>
        <Link  onClick={() => scrollClick('play')} to={'/#play'}>How to Play</Link>
      </List.Item>
      <List.Item>
        <Link onClick={() => scrollClick('home-slide')} to={'/#home-slide'}>NFT</Link>
      </List.Item>
      <List.Item>
        <Link onClick={() => scrollClick('partners')} to={'/#partners'}>Partners</Link>
      </List.Item>
      <List.Item>
        <Link onClick={() => scrollClick('footer')}  to={'/#footer'}>Contact</Link>
      </List.Item>
    </List>


    <Link to={'/live'} style={{ textDecoration: 'none' }}>
      <UnstyledButton className={"join-btn w-100"} onClick={() => onClose && onClose()}>
        Join Now
      </UnstyledButton>
    </Link>


  </div>)

}

export default MobileMenu;
