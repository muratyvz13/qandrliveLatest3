import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from '@mantine/modals';
import React from "react";
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import StaticPage from './app/page';

// pages
import Home from './app/home';
import Live from './app/live';
import Homeexp from './app/homeexp';

import Content from "./lib/components/Content"
import { store } from "./store";

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { PlenaWalletProvider } from "plena-connect-dapp-sdk";
import { WagmiProvider } from 'wagmi' 
import { config } from './config'
// 1. Get projectId
const projectId = '5e7d9af89e3d6e55686814bde64fc394'

// 2. Set chains
const mainnet2 = {
  chainId: 56,
  name: 'Bep 20',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrl: 'https://bsc.drpc.org'
}

// 3. Create modal
const metadata = {
  name: 'Qandr',
  description: 'Qandr Live Quiz',
  url: 'https://www.qandr.live',
  icons: ['https://www.qandr.live/img/logo.png']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet2],
  projectId
})
const plenaconfig = {
  dappToken:
    "91651531fc0ff6f89808b72c7ca0fcda6a9816a225e33f4b226e5bfdadccf776007dee0a61aa8bfd8f32ceed5c3374da4b820f51b1dd1829c441aaa4eee83891",
  dappId: "cm61ds5dotv8m80olbig",
  bridgeUrl: "connect.plena.finance",
};

function App() {

  return (

    <Provider store={store}>
      <GoogleOAuthProvider clientId="43295896312-4ilu3i6jqlbuh44ct3fmpbf1n57p6jhp.apps.googleusercontent.com">
      <PlenaWalletProvider config={plenaconfig}>
      <MantineProvider  withGlobalStyles withNormalizeCSS  theme={{
        components: {
          Container: {
            defaultProps: {
              sizes: {
                xs: 540,
                sm: 720,
                md: 960,
                lg: 1000,
                xl: 1578,
              },
            },
          },
        },
      }} >
        <ReactNotifications />
        <WagmiProvider config={config}> 
        <ModalsProvider>
          <Content>
            <Routes>
              <Route path={"/"} element={<Home/>}/>
              <Route path={"/live"} element={<Live/>}/>
              <Route path={"/homeexp"} element={<Homeexp/>}/>
              <Route path={"/page/:id"} element={<StaticPage/>}/>
            </Routes>
          </Content>
        </ModalsProvider>
        </WagmiProvider> 
      </MantineProvider>
      </PlenaWalletProvider>
      </GoogleOAuthProvider>,
    </Provider>


  );
}

export default App;
