import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import { Constants } from '../../utils/constants';
import { VehicleUtils } from '../../data/vehicleData';
import { QuoteProduct } from '../../utils/types';
import { saveQuote } from '../../store/quoteSlice';
import { AppDispatch } from '../../store/store';

const QuoteForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    clientName: '',
    brand: '',
    model: '',
    year: '',
    licensePlate: '',
    availability: '',
    duration: '',
    untilStockLasts: false,
    date: new Date().toISOString().split('T')[0],
  });

  const [products, setProducts] = useState<QuoteProduct[]>([]);
  const [availableModels, setAvailableModels] = useState<{ id: string; name: string; }[]>([]);

  useEffect(() => {
    if (formData.brand) {
      const models = VehicleUtils.getModelsByBrandId(formData.brand);
      setAvailableModels(models);
    } else {
      setAvailableModels([]);
    }
  }, [formData.brand]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'brand') {
      setFormData(prev => ({ ...prev, model: '' }));
    }
  };

  const addProduct = () => {
    setProducts(prev => [...prev, {
      name: '',
      quantity: 1,
      price: 0,
      total: 0
    }]);
  };

  const updateProduct = (index: number, updates: Partial<QuoteProduct>) => {
    setProducts(prev => prev.map((product, i) => {
      if (i === index) {
        const updated = { ...product, ...updates };
        updated.total = updated.quantity * updated.price;
        return updated;
      }
      return product;
    }));
  };

  const removeProduct = (index: number) => {
    setProducts(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const quote = {
      ...formData,
      duration: formData.untilStockLasts ? `${formData.duration} o hasta agotar stock` : formData.duration,
      products,
      total: products.reduce((sum, product) => sum + product.total, 0)
    };
    
    try {
      await dispatch(saveQuote(quote)).unwrap();
      navigate('/history');
    } catch (error) {
      console.error('Failed to save quote:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Nueva Cotización
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Cliente"
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Marca"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
            >
              {VehicleUtils.getAllBrandNames().map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Modelo"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              disabled={!formData.brand}
            >
              {availableModels.map((model) => (
                <MenuItem key={model.id} value={model.id}>
                  {model.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Año"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
            >
              {Constants.YearPicker.years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Patente"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Disponibilidad"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box>
              <TextField
                fullWidth
                select
                label="Duración"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
              >
                {Constants.GUI.duracionOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <Box sx={{ mt: 1 }}>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.untilStockLasts}
                    onChange={(e) => setFormData(prev => ({ ...prev, untilStockLasts: e.target.checked }))}
                    style={{ marginRight: '8px' }}
                  />
                  Hasta agotar stock
                </label>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fecha"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              type="date"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Productos
          </Typography>
          
          {products.map((product, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre del Producto"
                  value={product.name}
                  onChange={(e) => updateProduct(index, { name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  type="number"
                  label="Cantidad"
                  value={product.quantity}
                  onChange={(e) => updateProduct(index, { quantity: Number(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  type="number"
                  label="Precio"
                  value={product.price}
                  onChange={(e) => updateProduct(index, { price: Number(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={() => removeProduct(index)}
                >
                  Eliminar
                </Button>
              </Grid>
            </Grid>
          ))}

          <Button
            variant="outlined"
            onClick={addProduct}
            sx={{ mt: 2 }}
          >
            Agregar Producto
          </Button>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={products.length === 0}
          >
            Guardar Cotización
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default QuoteForm;