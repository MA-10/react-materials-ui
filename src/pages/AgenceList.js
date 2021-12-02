import { Helmet } from 'react-helmet';
import { Box, Container ,Button} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import AjouterAgence from './AjouterAgence';
import AgenceListResults from 'src/components/customer/AgenceListResult';


const AgenceList = () =>{
  const navigate = useNavigate();

 return (
  
  
    <>
      <Helmet>
        <title>Agences | TuniLoc</title>
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
      
      <Button onClick={(event) => {navigate('/app/AjouteAgence', { replace: true });}}
        color="primary"
        variant="contained"
      >
        Ajouter une agence
      </Button>
    </Box>
    
  </Box>
          <Box sx={{ pt: 3 }}>
            <AgenceListResults  />
          </Box>
        </Container>
      </Box>
    </>
  )
}
  

   ;

export default AgenceList;
