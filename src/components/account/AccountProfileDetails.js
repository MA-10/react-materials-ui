import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      
    >
      <Card>
        <CardHeader
          subheader="Entrer ces informations SVP"
          title="Nouvelle Voiture"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Impoter la fiche technique"
                label="Impoter la fiche technique"
                name="FicheTechnique"
                onChange={handleChange}
                required
                value={"chemin de la fiche technique"}
                variant="outlined"
              />
            </Grid>
            
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Prix de location"
                name="prix"
                onChange={handleChange}
                required
                value={"69.66"}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Diponible"
                name="status"
                onChange={handleChange}
                required
                value={"Oui / Non"}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Agence"
                name="agence"
                onChange={handleChange}
                
                value={"SIX"}
                variant="outlined"
              />
            </Grid>
            
            
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Ajouter
          </Button>
          <Button
            color="secondary"
            variant="contained"
          >
            Annuler
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
