import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
console.disableYellowBox = true;
const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().max(255).required('login is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values) => {
              var succes =false;
              fetch('http://localhost:63938/api/admin')
              .then(response => response.json())
              .then(data => {
                data.forEach(element => {
                if(values.password === element.admin.password && values.email === element.admin.login) {
                    localStorage.setItem('loginAdmin', element.admin.nom + " "+ element.admin.prenom);
                    localStorage.setItem('idAgence', element.admin.idAgence);
                    localStorage.setItem('idAdmin', element.admin.id);
                    localStorage.setItem('role', 'admin');

                     succes = true;
                     navigate('/app/dashboard', { replace: true });
                }
                
                
            });
            if(!succes) {alert("Adresse ou Mot de Passe Invalide ")
            console.log(succes) }
            
        });

            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Espace administrateur
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Log in
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Login"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Log in
                  </Button>
                </Box>
                
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
