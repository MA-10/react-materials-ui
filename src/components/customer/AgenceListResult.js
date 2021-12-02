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
  TextField,
  InputAdornment ,
  SvgIcon, 
  Button,
  Grid,
  
  
} from '@material-ui/core';
import {Trash,Edit} from "react-feather";
import ModifierAgence from "src/pages/ModifierAgence"

class AgenceListResults extends Component {
  
  constructor(){
    super()
    this.state={
      limit:10,
      page:0,
      start:0,
      end:10,
      agences :[],
      ModalShow : false,
      passedAgence:{logo: null,
        nom: '',
        siteWeb: '',
        email: '',
        tel: '',
        ville: '',
        adresse: ''}
    }
    
  }
  RefleshList(){
    fetch(
      "http://localhost:63938/api/agence/"
    ).then(response =>response.json()).then(data =>{this.setState({agences:data});})

  };
  componentDidMount(event){this.RefleshList();}
   handlePageChange = (event, newPage) => {
    setPage(newPage);
    
  };
  Delete (id){
    if(window.confirm('voulez vous supprimer cette agence  !')){
      fetch('http://localhost:63938/api/agence/'+id, {
           
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

  
  render() {
    let closeModal = ()=>{this.setState({ModalShow : false})}
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
              placeholder="Chercher une agence"
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
                  Logo
                </TableCell>
                <TableCell>
                  Nom
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Site web
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Tel
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.agences.slice(this.state.start, this.state.end).map((agence) => (
                <TableRow
                  hover
                  key={agence.id}
                >
                  <TableCell padding="checkbox">
                  </TableCell>
                  <TableCell>
                  <Avatar alt="Cindy Baker" src={agence.logo} style={{width:"100px",height:"60px"}} />
                  </TableCell>
                  <TableCell>{agence.nom}</TableCell>
                  <TableCell>{agence.ville +": "+ agence.adresse}</TableCell>
                  <TableCell><a  target="_blank" href={agence.siteWeb}>{agence.siteWeb}</a></TableCell>
                  <TableCell>{agence.email}</TableCell>
                  <TableCell>{agence.tel}</TableCell>
                  <TableCell>
                  <Grid >
                    <Grid container item style={{margin:"2px"}}>
                    <Button variant="contained" color="secondary" style={{minWidth:"150px"}} onClick={()=>this.Delete(agence.id)}><Trash/>Supprimer</Button>
                    </Grid>
                    <Grid container item  style={{margin:"2px"}}>
                    <Button onClick={()=>{this.setState({passedAgence:agence});this.setState({ModalShow : true})}} variant="contained" style={{minWidth:"150px"}} ><Edit/>Modifier</Button>
                     </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={this.state.agences.length}
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
      <ModifierAgence onHide={closeModal}agence ={this.state.passedAgence} show={this.state.ModalShow}/>
    </Card>
    

    )
    
  };
};



export default AgenceListResults;
