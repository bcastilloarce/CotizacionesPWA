import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cotizaciones
        </Typography>

        <Button
          color="inherit"
          startIcon={<AddIcon />}
          onClick={() => navigate('/new-quote')}
        >
          Nueva
        </Button>
        
        <Button
          color="inherit"
          startIcon={<HistoryIcon />}
          onClick={() => navigate('/history')}
        >
          Historial
        </Button>
      </Toolbar>
    </AppBar>
  );
};