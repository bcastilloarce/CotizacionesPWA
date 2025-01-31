import { Container, Paper, Typography, Box } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';

export const Login = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Cotizaciones PWA
          </Typography>
          <LoginForm />
        </Paper>
      </Box>
    </Container>
  );
};