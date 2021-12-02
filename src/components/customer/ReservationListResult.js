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
import {XCircle,CheckCircle,File} from "react-feather";
import Contrat from 'src/pages/Contrat';


class ReservationListResults extends Component {
  
  constructor(){
    super()
    this.state={
    filter:'All',
    limit:10,
    page:0,
    start:0,
    end:10,
    reservation:[],
    etat:{"acceptée":["success","Acceptée"],
        "refusée":["secondary","Refusée"],"en attente":["primary","En Attente"]},
    reservationModalShow :false,
    passedReservation:null
        
    }
  }
  RefleshList(){
    fetch(
      "http://localhost:63938/api/reservation/"+localStorage.getItem('idAgence')
    ).then(response =>response.json()).then(data =>{
        if(this.state.filter == 'All'){
            this.setState({reservation:data});
        }
        else{
            let dataFiltered =[];
            data.forEach(element => {
                if(element.reservation.status == this.state.filter){
                    dataFiltered.push(element)
                }
            });
            this.setState({reservation:dataFiltered})
        }
    })
  };
  componentDidMount(event){this.RefleshList();}

   handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  AcceptReservation(reservation){
      reservation.status = 'acceptée';
    fetch('http://localhost:63938/api/reservation/'+reservation.id, {
           
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
      })
      window.location.reload(true)
  };
  RefuseReservation(reservation){
    reservation.status = 'refusée';
  fetch('http://localhost:63938/api/reservation/'+reservation.id, {
         
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservation)
    })
    window.location.reload(true)
};
  render() {
    let closeReservationModal = ()=>{this.setState({reservationModalShow : false})}
    return(
      
      <Card>
         <FormControl style={{marginLeft:"10px"}} component="fieldset">
    <RadioGroup row aria-label="filter" name="filter" onChange={(event)=>{this.setState({filter:event.target.value});this.RefleshList()}} >
    <FormControlLabel value='All' control={<Radio />} label="All" />
    <FormControlLabel value="en attente" control={<Radio />} label="En attente" />
    <FormControlLabel value="acceptée" control={<Radio />} label="Acceptée" />
    <FormControlLabel value="refusée"  control={<Radio />} label="Refusée" />
  </RadioGroup>
</FormControl>
<Divider/>
      <PerfectScrollbar>
     
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
    
                </TableCell>
                <TableCell>
                  Demandeur
                </TableCell>
                <TableCell>
                  CIN
                </TableCell>
                <TableCell>
                  Voiture
                </TableCell>
                <TableCell>
                  Matricule
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Date de départ
                </TableCell>
                <TableCell>
                  Date de retour
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Contrat
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.reservation.slice(this.state.start, this.state.end).map((reservation) => (
                <TableRow
                  hover
                  key={reservation.reservation.id}
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
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {reservation.user.nom+"  " +reservation.user.prenom }
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {reservation.user.nCin}
                  </TableCell>
                  <TableCell>
                  {reservation.ficheTechnique.marque + "__" +reservation.ficheTechnique.modele }
                  </TableCell>
                  <TableCell>
                    {reservation.voiture.matricule}
                  </TableCell>
                  <TableCell>
                  {reservation.reservation.ville+'  : '+reservation.reservation.adresse}
                  </TableCell>
                  <TableCell>
                  {reservation.reservation.dateDepart}
                  </TableCell>
                  <TableCell>
                  {reservation.reservation.dateRetour}
                  </TableCell>
                  <TableCell>
                  { 
                        <Chip
                        color={this.state.etat[reservation.reservation.status][0]}
                        label={this.state.etat[reservation.reservation.status][1]}
                        size="large"
                      />   
                          
                      }
                  </TableCell>
                  <TableCell> 
                      {reservation.reservation.status != "refusée" && <div>
                    <Grid container item >
                    <Button id="act" onClick={()=>{this.setState({reservationModalShow: true,passedReservation:reservation})}} variant="contained" color="primary" style={{minWidth:"130px",margin:"5px"}} ><File/>contrat</Button>
                     </Grid>
                      </div> }     
                  </TableCell>
                  <TableCell> 
                      {reservation.reservation.status == "en attente" && <div>
                      
                    <Grid container item >
                    <Button id="act" onClick={()=>this.AcceptReservation(reservation.reservation)} variant="contained" color="success" style={{minWidth:"130px",margin:"5px"}} ><CheckCircle/>accepter</Button>
                     </Grid>
                     <Grid container item >
                    <Button id="act" onClick={()=>this.RefuseReservation(reservation.reservation)}  variant="contained" color="secondary" style={{minWidth:"130px",margin:"5px"}} ><XCircle/>refuser</Button>
                    </Grid>

                      </div> }
                      
                    
                     
                    
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={this.state.reservation.length}
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
   <Contrat  onHide={closeReservationModal}reservation ={this.state.passedReservation} show={this.state.reservationModalShow} />
    </Card>

    )
    
  };
};



export default ReservationListResults;
