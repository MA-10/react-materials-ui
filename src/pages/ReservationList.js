import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ReservationListResults from 'src/components/customer/ReservationListResult';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';



const UserList = () =>{
  

 return (
  
  
    <>
      <Helmet>
        <title>Reservation | TuniLoc</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <ReservationListResults  />
          </Box>
        </Container>
      </Box>
    </>
  )
}
  

   ;

export default UserList;
