import { Container, Image } from '@mantine/core';

interface Props{
  img:string;
}

export const Banner = ({img}:Props) => {
  return(
    <Container size={"xl"}>
      <div id="banner-box">
        <Image src={'/img/banner.png'} fit={"cover"} width={'100%'} height={'100%'} />
      </div>
    </Container>
  )
}

export default Banner;
