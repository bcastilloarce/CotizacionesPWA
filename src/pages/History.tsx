import { Typography, Box } from '@mui/material';
import { QuoteList } from '../components/quotes/QuoteList';

export const History = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Historial de Cotizaciones
      </Typography>
      <QuoteList />
    </Box>
  );
};