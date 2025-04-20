import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
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

const LandingPage = ({mintAddr, setPage}) => {
  //const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
        <Box
        sx={{
            minHeight: '100vh',
            backgroundImage: 'url(logo.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
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
        <Box sx={{ position: 'relative', zIndex: 2, p: 3 }}>
            <Typography
            variant="h1"
            sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 900,
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                letterSpacing: '0.1em',
            }}
            >
            Memes Brainrot
            </Typography>
            
            <Typography
            variant="subtitle1"
            sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                maxWidth: '800px',
                mx: 'auto',
            }}
            >
            MBR: {mintAddr}
            </Typography>
            
            <Button
            variant="contained"
            size="large"
            sx={{
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                borderRadius: '50px',
                bgcolor: theme.palette.secondary.main,
                '&:hover': {
                bgcolor: theme.palette.secondary.dark,
                transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
                boxShadow: 4,
            }}
            onClick={() => {setPage("quiz")}}
            >
            Play Trivia
            </Button>
        </Box>
        </Box>
        </ThemeProvider>
    );
};

export default LandingPage;
