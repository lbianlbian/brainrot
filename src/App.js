import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import LandingPage from "./components/landing";
import Quiz from './components/quiz';
import TopBar from './components/topbar';
// maybe add music later import Music from "./components/music";
import './App.css';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const mintAddr = "H7N32aQTRGDHTJGKx56ZTT5NdYy4HuTayJD9DmWomhtS";

//function App(){
export const App = () => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => "https://devnet.helius-rpc.com/?api-key=2be97c7b-0edf-4b14-9a19-236bc6c87135", [network]);

  const wallets = useMemo(
      () => [],  // empty array means only show wallets that user has installed
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [network]
  );

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const [page, setPage] = React.useState("landing");

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                  <TopBar setPage={setPage}/>
                  {page == "landing" ? 
                    <LandingPage mintAddr={mintAddr} setPage={setPage} /> : 
                    <Quiz mintAddr={mintAddr} />
                  }
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};
export default App;