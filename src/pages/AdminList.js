import { Helmet } from 'react-helmet';
import { Box, Container ,Button} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import AjouterVoiture from './AjouterAgence';
import AdminListResults from 'src/components/customer/AdminListResults';


const AdminList = () =>{
  const navigate = useNavigate();

 return (
  
  
    <>
      <Helmet>
        <title>Administrateurs | TuniLoc</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
        <Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      
      <Button onClick={(event) => {navigate('/app/ajouteradmin', { replace: true });}}
        color="primary"
        variant="contained"
      >
        Ajouter un administrateur
      </Button>
    </Box>
    
  </Box>
          <Box sx={{ pt: 3 }}>
            <AdminListResults  />
          </Box>
        </Container>
      </Box>
    </>
  )
}
  

   ;

export default AdminList;
