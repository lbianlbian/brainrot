import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Paper } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import Quiz from './components/quiz';
import TopBar from './components/topbar';
// maybe add music later import Music from "./components/music";
import './App.css';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

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

  const [errmsg, setErrmsg] = React.useState("");

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                {/*<Paper
                  sx={{
                      minHeight: '100vh',
                      display: 'flex',
                      flexDirection: 'column',
                  }}
                >*/}
                  <Box
                    component="div"
                    sx={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100vw',
                      height: '100vh',
                      zIndex: -1,
                      backgroundImage: 'url(/logo.png)',
                      backgroundRepeat: 'repeat',          // repeat the image
                      backgroundPosition: 'top left',     // start from top left
                      backgroundSize: 'auto',              // default size, no scaling
                      backgroundAttachment: 'fixed',      // optional: fixes image 
                    }}
                  />
                  <TopBar />
                  <Quiz setErrmsg={setErrmsg} />
                  {errmsg == "" ? 
                    (<></>) : 
                    (<Alert severity="error" variant="filled">{errmsg}</Alert>)
                  }
                {/*</Paper>*/}
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};
export default App;