import { Grid, Text, Image, Group } from "@mantine/core";
import { useState,useEffect } from 'react';
import QuizProfileItem from './profileItem';
import QuizHeader from './header';
import FormButton from '../../../../lib/components/Form/button';
import { TextInput } from '@mantine/core';
import { useWeb3Modal,useWeb3ModalProvider, useWeb3ModalAccount  } from '@web3modal/ethers5/react'
import axios from 'axios';
import { Store } from 'react-notifications-component';
interface Props {
  onClick: (index: number) => void;
  userMail?:string | undefined;
  username: string;
  setUsername:React.Dispatch<React.SetStateAction<string>>;
}

interface QuizHistory {
  quiz_result_id: number;
  quiz_id: number;
  user_id: number;
  quiz_score: number; // quiz_score özelliğinin tanımlandığı yer
  quiz_result :string;
  quiz: {
    quizName: string;
    // quiz ile ilgili diğer özellikler de buraya eklenebilir
  };
}
export const QuizProfile = ({ username,setUsername,onClick,userMail }: Props) => {
  const { open } = useWeb3Modal()
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  
  const [userId, setUserId] = useState("0");
  const [usernameText, setUsernameText] = useState("0");
  const [changeUsernames, setChangeUsernames] = useState(0);
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
  const [quizHistories, setQuizHistories] = useState<QuizHistory[]>([]); // QuizHistory tipinde bir dizi olarak tanımla

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameText(event.currentTarget.value); // username state'ini güncelle
    setChangeUsernames(1); // changeUsername state'ini 1 olarak ayarla
  };
  const fetchUserQuizHistory = async () => {
    try {
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/get-user-quiz-history', {
        user_id: userId, // userId state'ten veya başka bir yoldan alınmalı
      });
   
      setQuizHistories(response.data); // Gelen veriyi state'e kaydet
    } catch (error) {
      console.error('Error fetching quiz history:', error);
    }
  };



  const checkUsernameMail = async () => {
    try {
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/get-username', {
        user_mail: userMail,
      });
      
      // Burada bir değer döndürülüyor olmalı
     
      setUsername(response.data.user_username);
      
      return response.data.user_username;
    } catch (error) {
      console.error('Error:', error);
  
      // Hata durumunda bir değer döndürülüyor
      return false;
    }
  };

  const checkUsernameWallet = async () => {
    try {
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/get-username', {
        user_walletAddress: address,
      });
      
      // Burada bir değer döndürülüyor olmalı
      
      setUsername(response.data.user_username);
      setUsernameText(response.data.user_username);
      return response.data.user_username;
    } catch (error) {
      console.error('Error:', error);
  
      // Hata durumunda bir değer döndürülüyor
      return false;
    }
  };
  const fetchUserId = async () => {
    try {
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/get-user-id', {
        user_username: username,
      });
      setUserId(response.data.user_id); // Kullanıcı ID'sini state'e kaydet
     
    } catch (error) {
      console.error('An error occurred while fetching the user ID:', error);
      setUserId('User not found');
    }
  };
  const changeUserNameMail = async () => {
    
    try {
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/update-username', {
        user_mail: userMail,
        new_username:usernameText
      });
      Store.addNotification({
        title: "Succesful!",
        message: `Your new username is ${username} `,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true
        }
      });
    
      return response.data;
    } catch (error) {
      Store.addNotification({
        title: "Failed!",
        message: `Username already exists`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 10000,
          onScreen: true
        }
      });
      console.error('Error:', error);
  
      // Hata durumunda bir değer döndürülüyor
      return false;
    }
  };

  const changeUserNameWallet = async () => {
    
    try {
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/update-username', {
        user_walletAddress: address,
        new_username:usernameText
      });
      Store.addNotification({
        title: "Succesful!",
        message: `Your new username is ${username} `,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true
        }
      });
    
      return response.data;
    } catch (error) {
      Store.addNotification({
        title: "Failed!",
        message: `Username already exists`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 10000,
          onScreen: true
        }
      });
      console.error('Error:', error);
  
      // Hata durumunda bir değer döndürülüyor
      return false;
    }
  };

  const updateUsernameWithmail = async () => {
    try {
      const response = await axios.post('https://qandrlivebackend-jet.vercel.app/update-username', {
        user_mail: userMail,
      });

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      // Hata durumunda bir değer döndürülüyor
      return false;
    }
  };

  useEffect(() => {
    if(changeUsernames == 0)
    {
      fetchUserId();
      
    }
    
  }, [username]);
  useEffect(() => {
    if(username !=="" || username!== null)
    {
      fetchUserQuizHistory();
    }
    
  }, [userId]);
  
  useEffect(() => {
    
    if(address !== null )
    {
      checkUsernameWallet();
     
    }
    if(userMail !== null &&  userMail!== "")
    {
      checkUsernameMail();

    }

  }, [address,userMail]);
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
                        <Image width={75} height={75} src={'/img/ppicon.png'} fit={"cover"} radius={50} />
                  </Grid.Col>
                  
                  <Grid.Col lg={8} pl={22} className={"profile-right"}>
                    <Text fz={11.468} color={"#000"} fw={700} className={"grotesk-bold"} lh={"17.8px"} lts={-0.3}></Text>
                      <div style={{width:"34%",margin:"auto"}}>
                  {/* Label */}
                  
                  {/*
                  <TextInput
        label=""
        placeholder=""
        value={username}
        onChange={(event) => setUsername(event.currentTarget.value)}  // TextInput bileşeninin değerini durum değişkeni ile bağlayın
        // Kullanıcı girişini usernameText durumuna güncelleyin
      />
       <br />
      
                  {username}
                  <FormButton title={"Save"} onClick={() => console.log('selam')} />
  */}
                 
                </div>
                <TextInput
        label=""
        placeholder="username"
        className={"username_input"}
        
        value={usernameText}
        onChange={handleUsernameChange}  // TextInput bileşeninin değerini durum değişkeni ile bağlayın
        // Kullanıcı girişini usernameText durumuna güncelleyin
      />
                
                    <Text fz={13} color={"#000"} fw={400} lts={-0.3}  className={"rubik-regular"}>{userMail!=="" ? (userMail):(address)} {'\n'} </Text>
                    <FormButton className={"form-button-pc"} title={"Save"} onClick={() => userMail !== "" ? changeUserNameMail() : changeUserNameWallet()} />
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

               
               {quizHistories.map((quizHistory) => (
          <QuizProfileItem
            key={quizHistory.quiz_result_id} // Her elemanın benzersiz bir key'i olmalı
            title={quizHistory.quiz.quizName} // Quiz adını quiz ilişkisinden al
            result={`${quizHistory.quiz_result}`} // Quiz skorunu direkt olarak kullan
          />
        ))}
             </div>
           </Grid.Col>
         </Grid>
       </div>
      </div>
    </div>
  )

}

export default QuizProfile;
