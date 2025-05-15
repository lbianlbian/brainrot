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
const PURCHASE_URL = "https://jup.ag/swap/USDC-FT6vNHhWAbmpsnqwm9zhJLvbqLQXtqWmXJjESQpuvdPs";
const TELEGRAM_URL = "https://t.me/+b85GXLBnM6oyMmU5";
const MINIGAMES_URL = "https://minigames.memesbrainrot.com"

function TopBar({setPage}) {
  const topbarElements = [
    {name: "Buy MBR", onclick: () => {window.open(PURCHASE_URL, "_blank")}},
    {name: "Play Trivia", onclick: () => {setPage("quiz")}},
    {name: "Wiki", onclick: () => {setPage("wiki")}},
    {name: "Whitepaper", onclick: () => {window.open("whitepaper.pdf", "_blank")}},
    {name: "Minigames", onclick: () => {window.open(MINIGAMES_URL, "_blank")}}
  ]

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
              {topbarElements.map((topbarEl) => (
                <MenuItem key={topbarEl.name} onClick={topbarEl.onclick}>
                  <Typography sx={{ textAlign: 'center' }}>{topbarEl.name}</Typography>
                </MenuItem>
              ))}
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
            {topbarElements.map((topbarEl) => (
              <Button
                key={`${topbarEl.name}Desktop`}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={topbarEl.onclick}
              >
                {topbarEl.name}
              </Button>
            ))}
          </Box>
          <WalletMultiButton style={walletStyle}/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopBar;