import { Helmet } from 'react-helmet';
import { Box, Container ,Button} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import FactureListResult from 'src/components/customer/FactureListResult'


const FactureList = () =>{
  const navigate = useNavigate();

 return (
  
  
    <>
      <Helmet>
        <title>Factures | TuniLoc</title>
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
      
      <Button onClick={(event) => {navigate('/app/AjouterFacture', { replace: true });}}
        color="primary"
        variant="contained"
      >
        Ajouter une facture
      </Button>
    </Box>
    
  </Box>
          <Box sx={{ pt: 3 }}>
            <FactureListResult/>
          </Box>
        </Container>
      </Box>
    </>
  )
}
  

   ;

export default FactureList;
