import { Container, Grid, Text, Title } from '@mantine/core';
import { useDocumentTitle, useScrollIntoView } from '@mantine/hooks';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


export const StaticPage = () => {

  useDocumentTitle('Qandr Live - Privacy Policy');

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: -45,
  });


  useEffect(() => {
    scrollIntoView();
  }, []);


  return (<Container size={1200} mt={60} style={{minHeight:300}}>
    <Grid mt={15} mb={150}>
      <Grid.Col lg={2}>
        <Text fz={21} c={"#212121"} fw={700} mb={18}>Legal</Text>
        <ul className={"sidebar-ul"}>
          <li><Link to={'/page/example-page'}>Privacy Policy</Link></li>
          <li><Link to={'/page/example-page'}>Terms of Service</Link></li>
        </ul>
      </Grid.Col>
      <Grid.Col lg={10} pl={45} className={"pl-item"}>
        <Title order={1} c={"#212121"} fw={700} fz={42}>Privacy Policy</Title>
        <Text mb={30} c={"#3E3E59"} fw={400} lh={"28px"} fz={17.5}>Version 1.0 — August 2023</Text>
        <Text c={"#000"} fz={17.5} fw={14} lh={"28px"}>
          Contracts will be added soon.
        </Text>

      </Grid.Col>
    </Grid>
  </Container>)
}

export default StaticPage;
