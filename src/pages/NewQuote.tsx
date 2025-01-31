import { Typography, Box } from '@mui/material';
import { QuoteForm } from '../components/quotes/QuoteForm';

export const NewQuote = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Nueva Cotización
      </Typography>
      <QuoteForm />
    </Box>
  );
};