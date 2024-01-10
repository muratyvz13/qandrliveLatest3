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
      title: 'Coin Vestor',
      img: {
        src: 'ref-3.png',
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
      title: 'Ethereum',
      img: {
        src: 'ref-5.png',
        width:271,
        height:88.78
      }
    },
    {
      title: 'Polygon',
      img: {
        src: 'ref-6.png',
        width:271,
        height:88.78
      }
    }
  ]);

  return (<div id="partners">
    <Container size={1170} mt={140} mb={184} className={"partner-container"}>
      <Title style={{ letterSpacing: '-1.92px' }} ta={"center"} mb={65} className={"grotesk-bold partner-title"} lh={"64px"} fz={64} fw={800}>PARTNERS</Title>
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
