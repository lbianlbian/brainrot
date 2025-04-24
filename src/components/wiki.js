import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { alpha } from '@mui/material/styles';

import {info} from "./characters";

export default function Wiki() {
  return (
    <Box sx={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        px: "3%", // horizontal padding (left/right
      }}>
      <ImageList 
        variant="masonry" 
        cols={3} 
        gap={8}
        sx={{
            '&::-webkit-scrollbar': { display: 'none' },
            padding: 2,
            borderRadius: 4,
            background: `linear-gradient(to right, ${alpha('#ffffff', 0.8)}, ${alpha('#f8f9fa', 0.9)})`,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            backdropFilter: 'blur(4px)'
          }}
        >
        {info.map((item) => (
          <ImageListItem 
            key={item.picture}
            sx={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                  /*'& .MuiImageListItemBar-title': {
                    color: 'primary.main'
                  } this makes it look like you can click it*/
                }
              }}
            >
            <img
              srcSet={`pics/${item.picture}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`pics/${item.picture}?w=248&fit=crop&auto=format`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar 
                position="below" 
                title={item.name} 
                sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 600,
                    //fontSize: isMobile ? '0.9rem' : '1.1rem', 
                    padding: 1,
                    '& .MuiImageListItemBar-title': {
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      textAlign: 'center',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)',
                      padding: '4px 0',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                      lineHeight: 1.3
                    }
                  }}
                />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}