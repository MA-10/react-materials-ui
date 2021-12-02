import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import UsersListResults from 'src/components/customer/UserListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
//import users from 'src/__mocks__/users';



const UserList = () =>{
  

 return (
  
  
    <>
      <Helmet>
        <title>Users | TuniLoc</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ pt: 3 }}>
            <UsersListResults  />
          </Box>
        </Container>
      </Box>
    </>
  )
}
  

   ;

export default UserList;
