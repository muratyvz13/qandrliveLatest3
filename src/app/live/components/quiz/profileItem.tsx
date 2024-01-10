import { Grid, Text } from "@mantine/core";

interface Props{
  title:string;
  result:string;
}

export const QuizProfileItem = ({title,result}:Props) => {

  return(<Grid className={"quiz-profile-item"}>
    <Grid.Col span={10}>
      <Text style={{position:'relative',zIndex:2}} pr={30} fz={10} color={"#000"} fw={500} lts={-0.3} className={"rubik-medium"}>{title}</Text>
    </Grid.Col>
    <Grid.Col span={2}>
      <Text  style={{position:'relative',zIndex:2}} fz={10} color={"#000"} fw={700}  pl={2} lts={-0.3} className={"rubik-bold"}>{result}</Text>

    </Grid.Col>
  </Grid>)

}

export default QuizProfileItem;
