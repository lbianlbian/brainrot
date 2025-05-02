
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
typography: {
fontFamily: [
'Orbitron',
'Arial',
'sans-serif',
].join(','),
h1: {
fontWeight: 900,
letterSpacing: '0.1em',
},
},
});

const iconLinks = [
{ href: 'https://www.geckoterminal.com/solana/pools/EhBPjWztDbzUrwZW2AYGudRWF9XdP3nrNPhCGQevwE5t', src: 'logos/coingecko.png', alt: 'Icon 1' },
{ href: 'https://dexscreener.com/solana/ehbpjwztdbzurwzw2aygudrwf9xdp3nrnphcgqevwe5t', src: 'logos/dexscreener.png', alt: 'Icon 2' },
{ href: 'https://coinmarketcap.com/dexscan/en/solana/EhBPjWztDbzUrwZW2AYGudRWF9XdP3nrNPhCGQevwE5t/', src: 'logos/coinmarketcap.png', alt: 'Icon 3' },
{ href: 'https://www.youtube.com/@MemesBrainrot-US', src: 'logos/youtube.png', alt: 'Icon 4' },
{ href: 'https://x.com/MemesBrainrot', src: 'logos/x.png', alt: 'Icon 5' },
{ href: 'https://t.me/memesbrainrot_EN', src: 'logos/telegram.png', alt: 'Icon 6' },
{ href: 'https://www.instagram.com/memes._.brainrot/', src: 'logos/instagram.png', alt: 'Icon 7' },
{ href: 'https://www.tiktok.com/@memes._.brainrot', src: 'logos/tiktok.png', alt: 'Icon 8' },
];

const LandingPage = ({ mintAddr, setPage }) => {
return (
<ThemeProvider theme={theme}>
<Box
  sx={{
    height: '95vh', // fix height to viewport height
    backgroundImage: 'url(logo.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // space between top content and bottom icons
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1,
    },
  }}
>
<Box
  sx={{
    position: 'relative',
    zIndex: 2,
    p: 2,
    width: '100%',
    maxWidth: '95vw',
    boxSizing: 'border-box',
    //flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    }}
>
<Typography
variant="h1"
sx={{
fontSize: { xs: '2rem', sm: '3rem', md: '4.5rem' },
fontWeight: 900,
mb: 2,
textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
letterSpacing: '0.1em',
wordBreak: 'break-word',
px: 1,
}}
>
Memes Brainrot
</Typography>

<Typography
variant="subtitle1"
sx={{
fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
mb: 4,
textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
maxWidth: '800px',
mx: 'auto',
px: 2,
wordBreak: 'break-word',
}}
>
MBR: The Universe of Memes!
</Typography>

<Button
  variant="contained"
  size="large"
  sx={{
  py: 2,
  px: 4,
  fontSize: { xs: '0.9rem', sm: '1.1rem' },
  borderRadius: '50px',
  bgcolor: theme.palette.secondary.main,
  '&:hover': {
  bgcolor: theme.palette.secondary.dark,
  transform: 'scale(1.05)',
  },
  transition: 'all 0.3s ease',
  boxShadow: 4,
  width: { xs: '90%', sm: 'auto' },
  maxWidth: '100%',
  alignSelf: 'center',
  }}
  onClick={() => {
  setPage('quiz');
  }}
>
Play Trivia
</Button>
</Box>

{/* Icons container */}
<Box
sx={{
position: 'relative',
zIndex: 2,
display: 'flex',
justifyContent: 'center',
gap: 3,
flexWrap: 'wrap',
py: 3,
px: 2,
backgroundColor: 'white',//'rgba(208, 202, 202, 0.3)', // subtle background for icons
opacity:'50%',
width: '100%',
maxWidth: '95vw',
boxSizing: 'border-box',
borderRadius: 2,
//mt: 4,
}}
>
{iconLinks.map(({ href, src, alt }, index) => (
<Box
key={index}
component="a"
href={href}
target="_blank"
rel="noopener noreferrer"
sx={{
display: 'inline-block',
width: { xs: 40, sm: 50, md: 60 },
height: { xs: 40, sm: 50, md: 60 },
transition: 'transform 0.3s ease',
'&:hover': {
transform: 'scale(1.2)',
}
}}
>
<Box
component="img"
src={src}
alt={alt}
sx={{
width: '60%', // smaller to fit nicely inside circle
height: '60%',
objectFit: 'contain',
filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.7))',
}}
/>
</Box>
))}
</Box>
</Box>
</ThemeProvider>
);
};

export default LandingPage;