import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import { PublicKey } from '@solana/web3.js';

const BRAINROT_MINT = new PublicKey("SMUSDBKt1cydTsvZmSHBS2CWAoi32FWPdFD7u9SwH3w");

function Info(){
    return (
    <Box sx={{
        background: 'linear-gradient(135deg, #121212 30%, #1e3a8a 90%)',
        borderRadius: 4,
        p: 4,
        boxShadow: 24,
        maxWidth: 600,
        mx: 'auto',
        border: '1px solid rgba(255,255,255,0.12)'
      }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: '100%',
            fontSize: 'clamp(2rem, 10vw, 2.15rem)',
            fontWeight: 700,
            textAlign: 'center',
            mb: 3,
            color: theme => theme.palette.mode === 'dark' ? '#fff' : '#1e3a8a',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: 1.1
          }}
        >
          Brainrot Trivia Game
        </Typography>
      
        <List sx={{
          py: 2,
          '& .MuiListItem-root': {
            py: 1.5,
            borderBottom: '1px solid rgba(255,255,255,0.08)'
          }
        }}>
          <ListItem>
            <ListItemIcon sx={{ color: '#f59e0b', minWidth: 40 }}>
              <LocalFireDepartmentIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Burn 100 $BRAINROT to start"
              primaryTypographyProps={{
                variant: 'body1',
                sx: { fontWeight: 500, color: '#f8fafc' }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: '#10b981', minWidth: 40 }}>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText 
              primary="10 sec per question"
              primaryTypographyProps={{
                variant: 'body1',
                sx: { fontWeight: 500, color: '#f8fafc' }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: '#8b5cf6', minWidth: 40 }}>
              <WorkspacePremiumIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Get 15 right to win a Brainrot NFT!"
              primaryTypographyProps={{
                variant: 'body1',
                sx: { fontWeight: 500, color: '#f8fafc' }
              }}
            />
          </ListItem>
        </List>
      
        <Box sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderLeft: '4px solid #3b82f6'
        }}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, color: '#9ca3af' }}>
            Contract Address
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              fontFamily: 'monospace',
              color: '#3b82f6',
              wordBreak: 'break-all',
              fontSize: '0.85rem'
            }}
          >
            {BRAINROT_MINT.toBase58()}
          </Typography>
        </Box>
      </Box>
    );
}

export default Info;
