import { Helmet } from 'react-helmet';
import { Box, Container ,Button} from '@material-ui/core';
import VoitureListResults from 'src/components/customer/VoitureListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { useNavigate } from 'react-router-dom';
import AjouterVoiture from './AjouterVoiture';


const VoituresList = () =>{
  const navigate = useNavigate();

 return (
  
  
    <>
      <Helmet>
        <title>Voitures | TuniLoc</title>
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
      
      <Button onClick={(event) => {navigate('/app/AjouterVoiture', { replace: true });}}
        color="primary"
        variant="contained"
      >
        Ajouter une voiture
      </Button>
    </Box>
    
  </Box>
          <Box sx={{ pt: 3 }}>
            <VoitureListResults  />
          </Box>
        </Container>
      </Box>
    </>
  )
}
  

   ;

export default VoituresList;
