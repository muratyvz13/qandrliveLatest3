import { Container, Grid, Title } from '@mantine/core';
import { useState } from 'react';
import PartnerItem from './components';

export const Partners = () => {

  const [data, setData] = useState([
    {
      title: 'tuNNCay',
      img: {
        src:'ref-1.png',
        width:271,
        height:88.78
      }
    },
    {
      title: 'CryptOps',
      img: {
        src: 'ref-2.png',
        width:271,
        height:88.78
      }
    },
   
    {
      title: 'Castrum Capital',
      img: {
        src: 'ref-4.png',
        width:271,
        height:88.78
      }
    },
    {
      title: 'Opbnb',
      img: {
        src: 'ref-5.png',
        width:271,
        height:88.78
      }
    },
    {
      title: 'Visionarie Labs',
      img: {
        src: 'ref-6.png',
        width:271,
        height:120
      }
    },
    {
      title: 'AiTech',
      img: {
        src: 'ref-7.png',
        width:271,
        height:88.78
      }
    },
    {
      title: 'ChainGpt',
      img: {
        src: 'ref-8.png',
        width:271,
        height:88.78
      }
    },
    {
      title: 'Coinvestor',
      img: {
        src: 'ref-9.png',
        width:271,
        height:88.78
      }
    },
    {
      title: 'Decubate',
      img: {
        src: 'ref-10.png',
        width:271,
        height:88.78
      }
    }
  ]);

  return (<div id="partners">
    <Container size={1170} mt={140} mb={184} className={"partner-container"}>
      <Title style={{ letterSpacing: '-1.92px' }} ta={"center"} mb={65} className={"grotesk-bold partner-title"} lh={"64px"} fz={64} fw={800}>Partners & Backers & Sponsors</Title>
      <Grid gutter={12}>
        {data.map((item, index) => (
          <Grid.Col lg={4} span={6} key={`partner-${index}`}>
            <PartnerItem item={item}/>
          </Grid.Col>

        ))}
      </Grid>
    </Container>
  </div>)
}

export default Partners;
