import React, { Component } from 'react';
import Modal from 'react-modal';
import './details.css'
import {
    Box,
    Container,
    Grid,
    Button,TableCell,Table,TableRow,TableHead,TableBody,
      Card,CardHeader,TextField,
      CardActions,
      CardContent,
      Divider,
      Typography,
      FormControl,
      InputLabel,Select,MenuItem,
      TextArea
  } from '@material-ui/core';

class DetailsVoiture extends Component{
     
    constructor(props){
        super(props);
        this.state={
            customStyles : {
                content : {
                  top                   : '20%',
                  left                  : '20%',
                  right                 : 'auto',
                  bottom                : 'auto',
                  marginLeft            : '20%',
                  marginTop             :'3%',
                  transform             : 'translate(-20%, -20%)'
                }
              },
              
        }
       

    }
    render() {
    let status = "Disponible";
    if(this.props.voiture.voiture.etatDispo == false) {status = "Non Disponible"}
    let car ={abs:'Oui',airbags:'Oui',capteurRecul:'Oui',climat:'Non'};
    if(this.props.voiture.ficheTechnique.abs == false) {car.abs = "Non"}
    if(this.props.voiture.ficheTechnique.airbags == false) {car.airbags = "Non"}
    if(this.props.voiture.ficheTechnique.capteurRecul == false) {car.capteurRecul = "Non"}
    if(this.props.voiture.ficheTechnique.climat == false) {car.climat = "Non"}
        return (<Modal isOpen={this.props.show}
            style={this.state.customStyles}>
            <Card>
                
                
                        <CardContent>
                        <Box sx={{alignItems: 'center', display: 'flex',flexDirection: 'column'  }} >
                            <table>
                                <tr>
                                    <td><img src={this.props.voiture.voiture.image} style={{height: "300px",width: "400px" }}/></td>
                                    <td>
                                    <Divider />
                                    <CardHeader 
                                     subheader={"Matricule  :  "+ this.props.voiture.voiture.matricule}
                                     title={this.props.voiture.ficheTechnique.marque+ "  "+ this.props.voiture.ficheTechnique.modele}
                                    /><Divider />
                                   
                                    </td>
                                </tr>
                            </table>
                            
                        </Box>
                        </CardContent>
                        <Card>
                        <CardContent>
                          
                        <Table >
                                    <TableHead><TableRow >
                                            <TableCell>Prix de location</TableCell>
                                            <TableCell>Disponibilité</TableCell>
                                            <TableCell>Carte Grise</TableCell>
                                    </TableRow></TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{this.props.voiture.voiture.prix+ " DT/Jour"}</TableCell>
                                            <TableCell>{status}</TableCell>
                                            <TableCell><img src={this.props.voiture.voiture.carteGris} style={{width:"200px",height:"150px"}} /></TableCell>
                                        </TableRow>
                                    </TableBody>
                                    </Table>
                                    <Table >
                                    <TableHead><TableRow >
                                            <TableCell>Niveau de Carburant</TableCell>
                                            <TableCell>Km</TableCell>
                                    </TableRow></TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{this.props.voiture.voiture.nCarburant}</TableCell>
                                            <TableCell>{this.props.voiture.voiture.km}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    </Table>
                        <CardHeader 
                                     title="Fiche Technique"
                                    /><Divider />
                        <Box sx={{display: 'flex',flexDirection: 'column'  }} >
                        <Divider />
<table classeName='ft'>
    <tr>
        <td>
        <table  >
  <tbody>
    <tr>
      <th >Carrosserie</th>
      <td>{this.props.voiture.ficheTechnique.carrosserie}</td>
    </tr>
    <tr>
      <th>Energie</th>
      <td>{this.props.voiture.ficheTechnique.energie}</td>
    </tr>
    <tr>
      <th>Puissance</th>
      <td>{this.props.voiture.ficheTechnique.puissance}</td>
    </tr>
    <tr>
      <th>Transmission</th>
      <td>{this.props.voiture.ficheTechnique.transmission}</td>
    </tr>
    <tr>
      <th>Nombre de rapports</th>
      <td>{this.props.voiture.ficheTechnique.nRapports}</td>
    </tr>
    <tr>
      <th>Nombre de cylindres</th>
      <td>{this.props.voiture.ficheTechnique.nCylindres}</td>
    </tr>
  </tbody>
</table>
        </td>
        <td>
        <table >
  <tbody>
    <tr>
      <th>Nombre de places</th>
      <td>{this.props.voiture.ficheTechnique.nPlaces}</td>
    </tr>
    <tr>
      <th>Nombre de portes</th>
      <td>{this.props.voiture.ficheTechnique.nPortes}</td>
    </tr>
    <tr>
      <th>abs</th>
      <td>{car.abs}</td>
    </tr>
    <tr>
      <th>airbags</th>
      <td>{car.airbags}</td>
    </tr>
    <tr>
      <th>Caméra de recule</th>
      <td>{car.capteurRecul}</td>
    </tr>
    <tr>
      <th>climatiseur</th>
      <td>{car.climat}</td>
    </tr>
  </tbody>
</table>
        </td>
    </tr>
    
</table>                       


                        </Box>
                        </CardContent>  
                        </Card>
                        
                        <Divider />
                        <CardActions>
                        <input hidden id="image"  ref="imageInput"   type="file" o/>
                        <Button onClick={this.props.onHide}
                            color="primary"
                            variant="contained"
                        >
                             Fermer
                        </Button>
                        
                        </CardActions>
        </Card>
          </Modal>
        
       );
    }
}

export default DetailsVoiture;