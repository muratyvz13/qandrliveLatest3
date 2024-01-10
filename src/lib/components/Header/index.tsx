import { Button, Container, Grid, Image, List, UnstyledButton } from "@mantine/core";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {IoIosMenu,IoMdMenu} from "react-icons/io";
import MobileMenu from '../MobileMenu';

export const Header = () => {

  const [visible,setVisible]  = useState(false);

  const path = window.location.pathname;

  const scrollClick = (id:string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  }

  return (<>

    <MobileMenu isVisible={visible} onClose={() => setVisible(false)} />

    <header id={"header"} className={`${path !== '/' ? 'variant' : ''}`}>
      <Container h={"100%"} pos={"relative"} size={"xl"} style={{ zIndex: 2 }}>
        <Grid h={"100%"} style={{ alignItems: 'center' }}>
          <Grid.Col span={6} lg={3}>
            <Link to={'/'}>
              <Image className={"header-logo"} src={'/img/logo.png'} width={133} height={103}/>
            </Link>
          </Grid.Col>
          <Grid.Col span={6} lg={9} style={{ alignItems: 'center', display: 'flex' }}>
            <List className={"header-list"}>
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

            <UnstyledButton className={"mobile-menu"} onClick={() => setVisible(true)}>
              <IoMdMenu color={"#000"} size={22}/>
            </UnstyledButton>

            <Link to={'/live'} style={{ textDecoration: 'none' }} className={"header-join-a"}>
              <UnstyledButton className={"join-btn"} >
                Join Now
              </UnstyledButton>
            </Link>

          </Grid.Col>

        </Grid>
      </Container>
    </header>

  </>)

}

export default Header;
