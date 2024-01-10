import { Grid, Text, Image, Group } from "@mantine/core";
import { useState } from 'react';
import QuizProfileItem from './profileItem';
import QuizHeader from './header';

interface Props {
  onClick: (index: number) => void;
}


export const QuizProfile = ({ onClick }: Props) => {

  const [stats,setStats] = useState([
    {
      id:1,
      count:340,
      img:{
        width: 15.625,
        height: 17.5,
        src:'/img/trofeu.png'
      }
    },
    {
      id:2,
      count:32,
      img:{
        width: 16.385,
        height: 16.385,
        src:'/img/medalha.png'
      }
    },
    {
      id:3,
      count:54,
      img:{
        width: 15.823,
        height: 15.824,
        src:'/img/medalha.png'
      }
    }
  ]);

  return (
    <div>
      <div className={"quiz-area"}>
        <div className={"profile-header"}>
          <QuizHeader title={"PROFILE"} onClick={(index) => onClick && onClick(index)}/>

        </div>
       <div className={"profile-container"}>
         <Grid>
           <Grid.Col lg={5} pr={0} pl={0} >
             <div className={"quiz-profile-box"} style={{paddingLeft:24,paddingRight:24,paddingTop:20}}>
                <Grid h={"100%"} align={"center"}>
                  <Grid.Col lg={4} className={"profile-image"}>
                        <Image width={75} height={75} src={'/img/user-profile.png'} fit={"cover"} radius={50} />
                  </Grid.Col>
                  <Grid.Col lg={8} pl={22} className={"profile-right"}>
                    <Text fz={11.468} color={"#000"} fw={700} className={"grotesk-bold"} lh={"17.8px"} lts={-0.3}>LiqerMurat</Text>
                    <Text fz={10} color={"#000"} fw={400} lts={-0.3}  className={"rubik-regular"}>0x2343423923492394292 {'\n'} 434234234234</Text>
                  </Grid.Col>
                </Grid>
             </div>
             <div className={"quiz-profile-box mt-quiz"} style={{height:102,marginTop:6,paddingLeft:26,paddingRight:26}}>
               <Group spacing={8} align={"center"}>
                 <Text className={"quiz-profile-title grotesk-bold"}>Stats</Text>
                  <Image src={'/img/stats.png'} width={8.736} height={13.636} fit={"contain"}/>
               </Group>
              <Group spacing={5} mt={13}>
                {stats.map((item,index) => (
                  <div className={"stat-view"} style={index === 2 ? {backgroundColor:'rgba(223, 255, 103, 0.50)'} : {}}>
                    <Text style={{flex:1}} fz={10} color={"#000"} fw={700} lh={"10px"} lts={-0.3} className={"grotesk-bold"}>{item.count}</Text>
                    <Image fit={"contain"} {...item.img}/>
                  </div>
                ))}
              </Group>

             </div>
           </Grid.Col>
           <Grid.Col lg={7} className={"pd-view-grid"}>
             <div className={"quiz-profile-box"} style={{ height: 227 }}>
               <Text className={"quiz-profile-title grotesk-bold"}>Recent Quizes</Text>
               <Grid mt={-4}>
                 <Grid.Col span={10}>
                   <Text fz={8} lh={"17.5px"} lts={-0.2} color={"#000"} fw={400} className={"grotesk-regular"}>Quiz</Text>
                 </Grid.Col>
                 <Grid.Col span={2}>
                   <Text fz={8} lh={"17.5px"} lts={-0.2} color={"#000"} fw={400} className={"grotesk-regular"}>Result</Text>
                 </Grid.Col>
               </Grid>

               <QuizProfileItem title={"Truefeedback Blockchain quiz"} result={"4/12"}/>
               <QuizProfileItem title={"BitCoin Big Quiz Challange - OKX"} result={"8/14"}/>
               <QuizProfileItem title={"Limited blockchain capacity to process transactions"} result={"2/20"}/>
               <QuizProfileItem title={"BitCoin Big Quiz Challange - OKX"} result={"8/14"}/>
             </div>
           </Grid.Col>
         </Grid>
       </div>
      </div>
    </div>
  )

}

export default QuizProfile;
