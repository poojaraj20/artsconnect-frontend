import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

function Adminheader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#9e085dff" }}>
        <Toolbar>
          <img
            src="https://media.tenor.com/L56-Q-vBCxEAAAAC/art.gif"
            alt="Logo"
            className="mr-3 h-8 w-8 sm:h-10"
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Art Connect
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Adminheader;
