import { Container, Grid, Group, Image, Text } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FooterList from './components/list';


export const Footer = () => {

  const [data,setData] = useState([
    {
      title:'Q&R',
      isTarget:false,
      data:[
        {
          title:'About Us',
          link:'/about-us'
        },
        {
          title:'Help Center',
          link:'/help-center'
        },
        {
          title:'Join Now',
          link:'/join-now'
        },
      ]
    },
    {
      title:'Company',
      isTarget:false,
      data:[
        {
          title:'Media',
          link:'#'
        },
        {
          title:'Jobs',
          link:'#'
        },
        {
          title:'Privacy Policy',
          link:'/page/privacy-policy'
        },
        {
          title:'Terms of Service',
          link:'/page/terms-of-service'
        },
      ]
    },
    {
      title:'Resources',
      isTarget:false,
      data:[
        {
          title:'Press Kit',
          link:'#'
        },
        {
          title:'Co-marketing Guide',
          link:'#'
        },
      ]
    },
    {
      title:'Social',
      isTarget:true,
      data:[
        {
          title:'Telegram',
          link:'https://t.me/qandrlive'
        },
        {
          title:'Twitter',
          link:'https://x.com/QnRTrivia3'
        },
        {
          title:'Binance',
          link:'https://www.binance.com/en/live/u/26915384'
        },
      ]
    }
  ])

  return (<footer id={"footer"}>
    <Container size={"xl"}>
      <Grid>
        <Grid.Col lg={3}>
          <Link to={'/'} className={"footer-a"}>
            <Image src={'/img/logo.png'} width={148} height={104} fit={"contain"}/>
          </Link>
          <Text mt={24} fz={14} fw={400} color={"#fff"} lh={"18px"}>Q&R is a Web3 gaming platform that offers users a unique gameplay experience.</Text>

          <Group spacing={20} mt={30}>
             <Link to={"/"} target={"_blank"} className={"store-link"}>
               <Image src={'/img/app-store.png'} height={46.58} fit={"contain"} width={128}/>
             </Link>

             <Link to={"/"} target={"_blank"} className={"store-link"}>
               <Image src={'/img/google-play.png'} height={46.58} fit={"contain"} width={128}/>
             </Link>
          </Group>

          <Text fz={13.48} fw={500} color={"#fff"} mt={36} className={"copyright"}>Ⓒ Q&R WEB3 GAMING - ALL RIGHTS RESERVED.</Text>
        </Grid.Col>
        <Grid.Col lg={9} pl={90}  className={"footer-right"}>
          <Grid>
            {data.map((item,index) => (
              <Grid.Col lg={3} span={6}>
                <FooterList isTarget={item.isTarget} title={item.title} data={item.data}  />
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  </footer>)

}

export default Footer;
