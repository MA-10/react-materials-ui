import {Component} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Search as SearchIcon } from 'react-feather';

import {
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
  Divider,
  Chip,
  Button,
  Grid,
  FormControl,FormLabel,RadioGroup,FormControlLabel,Radio
  
} from '@material-ui/core';
import Facture from 'src/pages/Facture';



class FactureListResult extends Component {
  
  constructor(){
    super()
    this.state={
    limit:10,
    page:0,
    start:0,
    end:10,
    facture:[],passedFacture:null,passedReservation:null,
    ModalShow:false   
    }
  }
  RefleshList(){
    fetch("http://localhost:63938/api/facture/"+localStorage.getItem('idAgence')).then(result => result.json()).then(data => {this.setState({facture: data}); console.log(this.state.facture)})
  };
  componentDidMount(event){this.RefleshList();}

   handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  Termine(facture){
    facture.status = "payée"
    fetch('http://localhost:63938/api/facture/'+facture.id, {
           
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(facture)
      })
      window.location.reload(true)

  }
  GetReservation(id){
        
    fetch("http://localhost:63938/api/reservation/"+localStorage.getItem('idAgence')).then(resultat =>resultat.json()).then(data => {
        data.forEach(element => {
            if(element.reservation.id == id){
               this.setState({passedReservation : element})
            }
        });

    })
}


  
  render() {
    let closeModal = ()=>{this.setState({ModalShow : false})}
    return(
      
      <Card>
         
      <PerfectScrollbar>
     
        <Box sx={{ minWidth: 1050 }}>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
    
                </TableCell>
                <TableCell>
                  Numéro de facture
                </TableCell>
                <TableCell>
                  Numéro de contrat
                </TableCell>
                <TableCell>
                  date
                </TableCell>
                <TableCell>
                  Etat
                </TableCell>
                <TableCell>
                  Montant
                </TableCell>
                <TableCell>
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {this.state.facture.map((facture=> (
                <TableRow  hover
                key={this.state.facture.id}>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell >{facture.id}</TableCell>
                  <TableCell>{facture.nContrat}</TableCell>
                  <TableCell>{facture.date.slice(0,10)}</TableCell>
                  <TableCell>{(facture.status == "en cours") && 
                        <Chip
                        color="primary"
                        label='en cours'
                        size="large"
                      /> }
                      {(facture.status == "payée") && 
                        <Chip
                        color="success"
                        label='payée'
                        size="large"
                      /> }
                    </TableCell>
                    <TableCell>{facture.montant +  " DT"}</TableCell>
                    <TableCell><Button onClick={() =>{this.GetReservation(facture.nContrat); this.setState({passedFacture : facture , ModalShow : true } ) ; } }
                     variant="contained" color="primary" style={{minWidth:"130px",margin:"5px"}} >Voir facture</Button></TableCell>
                     <TableCell>{facture.status=='en cours' &&  <Button onClick={() => this.Termine(facture)}
                     variant="contained" color="success" style={{minWidth:"130px",margin:"5px"}} >Terminer</Button>}
                    </TableCell>


                </TableRow>
              )))}
              
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={this.state.facture.length}
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
      <Facture  onHide={closeModal}facture ={this.state.passedFacture} res={this.state.passedReservation} show={this.state.ModalShow} />
    </Card>

    )
    
  };
};



export default FactureListResult;
