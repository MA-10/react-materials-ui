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
  Chip,
  Grid,
  
  
} from '@material-ui/core';
import {Trash,Edit,Clipboard} from "react-feather";
import { Link } from 'react-router-dom';
import DetailsVoiture from 'src/pages/DetailsVoiture';
import ModifierVoiture from 'src/pages/ModifierVoiture';

class VoitureListResults extends Component {
  
  constructor(){
    super()
    this.state={
      limit:10,
      page:0,
      voitures:[],
      start:0,
      end:10,
      etat:{true:["success","Disponible"],
        false:["secondary","Non disponible"]},
        carteGris:[{ source: './CIN.jpg' }],
        detailsModalShow :false,modifierModalShow:false,
        passVoiture:{agence:{
          adresse: "sss",email: "six@gmail.com", id: 1,logo: null,nom: "six",siteWeb: "six.com",tel: "+21623028369",ville: "sfax"},
           voiture: {carteGris: null,diagnostics: [],etatDispo: true,id: 2,idAgence: 1, idFicheTech: 25473,image: null,matricule: "125-TUNIS-2212",prix: 69.99},
            ficheTechnique: {abs: true,airbags: true,antiDerap: true,capteurRecul: true,carrosserie: "CFV",categorie: "Small",climat: true,energie: "Essence",
            id: 25473,marque: "Volswagen", modele: "Golf 7", nCylindres: 4,nPlaces: 5,nPortes: 4,nRapports: 6,puissance: 100,transmission: "Auto"}},
    }
    
  }
  RefleshList(){
    fetch(
      "http://localhost:63938/api/voiture/"+localStorage.getItem('idAgence')
    ).then(response =>response.json()).then(data =>{this.setState({voitures:data});console.log("idAgence=",localStorage.getItem('idAgence')," data",data)})

  };
  componentDidMount(event){this.RefleshList();}
 /* componentDidUpdate(event){this.RefleshList();}*/
   handlePageChange = (event, newPage) => {
    setPage(newPage);
    
  };
  Delete (idv){
    if(window.confirm('voulez vous supprimer cette voiture du parc !')){
      fetch('http://localhost:63938/api/voiture/'+idv, {
           
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
    let closeDetailsModal = ()=>{this.setState({detailsModalShow : false})}
    let closeModifierModal = ()=>{this.setState({modifierModalShow : false})}
    
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
              placeholder="Chercher une voiture"
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
                  Image
                </TableCell>
                <TableCell>
                  Modèle
                </TableCell>
                <TableCell>
                  Matricule
                </TableCell>
                <TableCell>
                  Prix (dt/jour)
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.voitures.slice(this.state.start, this.state.end).map((voiture) => (
                <TableRow
                  hover
                  key={voiture.voiture.id}
                >
                  <TableCell padding="checkbox">
                  </TableCell>
                 
                  <TableCell>
                    <img src={voiture.voiture.image} style= {{width:"100px", height:"80px"}} />
                  </TableCell>
                  <TableCell>
                    {voiture.ficheTechnique.marque}
                    <br/>
                    {voiture.ficheTechnique.modele}
                  </TableCell>
                  <TableCell>

                  {voiture.voiture.matricule}
                  </TableCell>
                  <TableCell>
                    {voiture.voiture.prix}
                  </TableCell>
                  <TableCell>
                      {  
                        <Chip
                        color={this.state.etat[voiture.voiture.etatDispo][0]}
                        label={this.state.etat[voiture.voiture.etatDispo][1]}
                        size="large"
                      />   
                          
                      }
                  
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" 
                    onClick={()=>{this.setState({detailsModalShow : true,passVoiture:voiture})}}><Clipboard/>Détails</Button>
                    
                    
                    
                  </TableCell>
                  <TableCell>
                  <Grid >
                    <Grid container item >
                    <Button variant="contained" color="secondary" style={{minWidth:"150px"}} onClick={()=>this.Delete(voiture.voiture.id)}><Trash/>Supprimer</Button>
                    </Grid>
                    <Grid container item >
                    <Button onClick={()=>{this.setState({passVoiture:voiture});this.setState({modifierModalShow : true})}} variant="contained" style={{minWidth:"150px"}} ><Edit/>Modifier</Button>
                     </Grid>
                    
                    </Grid>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={this.state.voitures.length}
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
      <DetailsVoiture  onHide={closeDetailsModal}voiture={this.state.passVoiture} show={this.state.detailsModalShow} />
      <ModifierVoiture  onHide={closeModifierModal}voiture={this.state.passVoiture} show={this.state.modifierModalShow} />
    </Card>
    

    )
    
  };
};



export default VoitureListResults;
