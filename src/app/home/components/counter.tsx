import { Center, Text } from "@mantine/core";

interface Props {
  item: {
    count: number;
    title: string
  }
}

export const CounterItem = ({ item }: Props) => {
  return (<Center h={"100%"}>
    <div>
      <Text className={"grotesk-bold count-title"} ta={"center"} fz={72} lh={"72px"} fw={700}>+{item.count}</Text>
      <Text className={"grotesk-medium count-text"} mt={10} ta={"center"} fz={36} lh={"36px"} fw={500}>{item.title}</Text>
    </div>
  </Center>)
}

export default CounterItem;
