import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import * as React from 'react';
import { useMediaQuery } from 'react-responsive';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const TWITTER_URL = "https://twitter.com/MemesBrainrot";
const PURCHASE_URL = "https://photon-sol.tinyastro.io/en/lp/EhBPjWztDbzUrwZW2AYGudRWF9XdP3nrNPhCGQevwE5t";

function TopBar({setPage}) {

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function openTwitter(){
    window.open(TWITTER_URL, "_blank")
  }

  function openPurchase(){
    window.open(PURCHASE_URL, "_blank");
  }

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const walletStyle = isMobile ? {padding: '0px'} : {};

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop title  */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={() => {setPage("landing")}}
          >
            Memes Brainrot
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* mobile menu */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem key="twitter" onClick={openTwitter}>
                <Typography sx={{ textAlign: 'center' }}>Twitter/X</Typography>
              </MenuItem>
              <MenuItem key="quiz" onClick={() => {setPage("quiz")}}>
                <Typography sx={{ textAlign: 'center' }}>Play Trivia</Typography>
              </MenuItem>
              <MenuItem key="buy" onClick={openPurchase}>
                <Typography sx={{ textAlign: 'center' }}>Buy MBR</Typography>
              </MenuItem>
              <MenuItem key="wiki" onClick={() => {setPage("wiki")}}>
                <Typography sx={{ textAlign: 'center' }}>Wiki</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* mobile title */}
          <Typography
            variant="string"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={() => {setPage("landing")}}
          >
            Memes Brainrot
          </Typography>
          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key="twitterDesktop"
              sx={{ my: 2, color: 'white', display: 'block' }}
              onClick={openTwitter}
            >
              Twitter/X
            </Button>
            <Button
              key="quizDesktop"
              sx={{ my: 2, color: 'white', display: 'block' }}
              onClick={() => {setPage("quiz")}}
            >
              Play Trivia
            </Button>
            <Button
              key="buyDesktop"
              sx={{ my: 2, color: 'white', display: 'block' }}
              onClick={openPurchase}
            >
              Buy MBR
            </Button>
            <Button
              key="wikiDesktop"
              sx={{ my: 2, color: 'white', display: 'block' }}
              onClick={() => {setPage("wiki")}}
            >
              Wiki
            </Button>
          </Box>
          <WalletMultiButton style={walletStyle}/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopBar;