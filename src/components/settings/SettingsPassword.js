import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';

const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const changePassword=() =>{
    if(values.password == values.confirm && (values.password !='' && values.password != '')){
      
      fetch('http://localhost:63938/api/admin/'+localStorage.getItem('idAdmin')).then((Response) => Response.json()).then(result=> {
        result.password = values.password;
        console.log(result)
        fetch('http://localhost:63938/api/admin/'+localStorage.getItem('idAdmin'), {
           
         method: 'PUT',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           id:result.id,
           idAgence:result.idAgence,
           nom:result.nom,
           prenom:result.prenom,
           email:result.email,
           tel:result.tel,
           ville:result.ville,
           adresse:result.adresse,
           login:result.login,
           password:result.password
         })
       }).then((Response) => Response.json())
         .then(
           alert('le mot de passe est changé avec succés')
        )
      })

    }else{
      alert("erreur");
    }
  };
  

  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button onClick={changePassword}
            color="primary"
            variant="contained"
          >
            Appliquer
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default SettingsPassword;
