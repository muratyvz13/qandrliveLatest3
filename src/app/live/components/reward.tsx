import { Center, Text } from "@mantine/core";

export const Reward = () => {
  return (<>
    <Center>
      <div>
        <Text mb={5} fz={36} lh={"53px"} style={{ letterSpacing: -1 }} className={"grotesk-medium reward-title"} fw={500}
              ta={"center"}>REWARD POOL:</Text>
        <div className={"box-reward"}>
          <Text fw={700} fz={64} lh={"64px"} className={"grotesk-bold usd-title"} color={"#000"}>50 USDT</Text>
        </div>
      </div>
    </Center>
    <div className="box-line">
      <Text className={"answer-title"} mt={92} color={"#fff"} lh={"53px"} fz={"32px"} style={{letterSpacing:-0.9}} fw={500} >Answer the most questions in the shortest time to win.</Text>
    </div>
  </>)
}

export default Reward;
