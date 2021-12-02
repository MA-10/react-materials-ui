import {Component} from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { Search as SearchIcon } from 'react-feather';

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField,
  InputAdornment ,
  SvgIcon, 
  Button,
  
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import {XCircle} from 'react-feather'
class UsersListResults extends Component {
  
  constructor(){
    super()
    this.state={
      limit:10,
      page:0,
      users:[],
      start:0,
      end:10
    }
  }
  RefleshList(){
    fetch(
      "http://localhost:63938/api/user"
    ).then(response =>response.json()).then(data =>{this.setState({users:data})})    
  };
  Supprimer(id){
    if(window.confirm('voulez vous supprimer cette utilisateur !')){
      fetch('http://localhost:63938/api/user/'+id, {
           
         method: 'DELETE',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
         
       }).then((Response) => Response.json())
         .then((Result) => {window.location.reload(true);
         })

    }
  }
  componentDidMount(event){this.RefleshList();}
   handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  render() {
    return(
      
      <Card>
      <PerfectScrollbar>
      <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search customer"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
    
                </TableCell>
                <TableCell>
                  Nom
                </TableCell>
                <TableCell>
                  Prenon
                </TableCell>
                <TableCell>
                  Ville
                </TableCell>
                <TableCell>
                  Telephone
                </TableCell>
                <TableCell>
                  Adresse
                </TableCell>
                <TableCell>
                  Num CIN
                </TableCell>
                <TableCell>
                  Num Carte Visa
                </TableCell>
                <TableCell>
                  Photo de CIN
                </TableCell>
                <TableCell>
                  Photo de Carte VISA
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.users.slice(this.state.start, this.state.end).map((user) => (
                <TableRow
                  hover
                  key={user.id}
                >
                  <TableCell padding="checkbox">
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={user.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(user.nom)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {user.nom}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.prenom}
                  </TableCell>
                  <TableCell>
                  {user.ville}
                  </TableCell>
                  <TableCell>
                    {user.tel}
                  </TableCell>
                  <TableCell>
                  {user.adresse}
                  </TableCell>
                  <TableCell>
                  {user.nCin}
                  </TableCell>
                  <TableCell>
                  {user.nCarteVisa}
                  </TableCell>
                  <TableCell>
                  <img  src={user.cin}  style= {{width:"100px", height:"80px"}}/>
                  
                  </TableCell>
                  <TableCell>
                    
                  <img  src={user.carteVisa}  style= {{width:"100px", height:"80px"}}/>
                  </TableCell>
                  {(localStorage.getItem('role') == 'super') && <Button id="act" onClick={() => {this.Supprimer(user.id)}}
                   variant="contained" color="secondary" style={{minWidth:"130px",marginTop : "50px"}} ><XCircle/>supprimer</Button>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={this.state.users.length}
        onPageChange={ (event, newPage) => {
          this.setState({page:newPage});
          if(event.target.dataset.testid=='KeyboardArrowRightIcon'){
            this.setState({start:this.state.start+this.state.limit});
            this.setState({end:this.state.end+this.state.limit});

          }else{
            this.setState({start:this.state.start-this.state.limit});
            this.setState({end:this.state.end-this.state.limit});
        }
          
        }}
        onRowsPerPageChange={(event) => {
          this.setState({limit :event.target.value});
          this.setState({end :event.target.value});
        }}
        page={this.state.page}
        rowsPerPage={this.state.limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>

    )
    
  };
};



export default UsersListResults;
