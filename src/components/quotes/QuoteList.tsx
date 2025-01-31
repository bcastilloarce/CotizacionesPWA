import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { PictureAsPdf, Edit } from '@mui/icons-material';

// Mock data for demonstration
const mockQuotes = [
  {
    id: 1,
    clientName: 'Juan Pérez',
    date: '2025-01-30',
    amount: 150000,
  },
  {
    id: 2,
    clientName: 'María González',
    date: '2025-01-29',
    amount: 75000,
  },
];

export const QuoteList = () => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(amount);
  };

  return (
    <Paper sx={{ mt: 3 }}>
      <List>
        {mockQuotes.map((quote) => (
          <ListItem key={quote.id} divider>
            <ListItemText
              primary={quote.clientName}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    {formatAmount(quote.amount)}
                  </Typography>
                  {' — '}
                  {new Date(quote.date).toLocaleDateString()}
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="download pdf">
                <PictureAsPdf />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};