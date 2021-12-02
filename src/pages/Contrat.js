import React, { Component } from 'react';
import Modal from 'react-modal';
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

class Contrat extends Component{
     
    constructor(props){
        super(props);
        this.state={
            customStyles : {
                content : {
                  top                   : '20%',
                  left                  : '20%',
                  right                 : '15%',
                  bottom                :"auto",
                  marginLeft            : '20%',
                  marginTop             :'3%',
                  transform             : 'translate(-20%, -20%)'
                }
              },
              diag:[]
        }
        

    }
    

    GetDiagnostic(idVoiture){
        fetch("http://localhost:63938/api/diagnostic/depart/"+idVoiture)
        .then(result => result.json())
        .then(data => this.setState({diag :data }))

    }

    render() {
        
            if(this.props.reservation!=null){
                if(this.props.show){
                    this.GetDiagnostic(this.props.reservation.reservation.idVoiture);
                    var date1 = new Date(this.props.reservation.reservation.dateDepart);
                    var date2 = new Date(this.props.reservation.reservation.dateRetour);
                    var time_diff = date2.getTime() - date1.getTime();
                    var days_Diff = time_diff / (1000 * 3600 * 24);
                    var prix = days_Diff * parseFloat(this.props.reservation.voiture.prix); /*+ 
                             parseFloat(this.props.reservation.reservation.km)*parseFloat(this.props.reservation.voiture.tarifKm);*/
                }



            return (
                <Modal isOpen={this.props.show}
                    style={this.state.customStyles}>
                 <Card >
                     <CardContent>
                              
                    <Card >
                    <CardHeader  style={{background:"#00FFFF",textAlign: 'center' }}
                    title={"Contrat de location de voiture Numéro : "}
                    subheader={"Numero : "+this.props.reservation.reservation.id}
                    />
                    
                    <CardContent>
                          <div style={{width:"300px",height:"150px",float:"left"}}>

                                <img src={this.props.reservation.agence.logo} style={{width:"300px",height:"150px"}}/>
                          </div>
                          <div style={{width:"500",height:"80px",marginLeft:"500px", textAlign:'center',marginBottom:"50px"}}>
                            <h4 style={{margin:"10px",color:"gray"}}>{"Nom de l'agence : "+this.props.reservation.agence.nom}</h4>
                            <h4  style={{margin:"10px",color:"gray"}}>{"Adresse : "+this.props.reservation.agence.ville + " "+ this.props.reservation.agence.adresse }</h4>
                            <h4  style={{margin:"10px",color:"gray"}}>{"Tel : "+this.props.reservation.agence.tel}</h4> 
                            <h4  style={{margin:"10px",color:"gray"}}>{"Email : "+this.props.reservation.agence.email}</h4> 
                            <h4  style={{margin:"10px",color:"gray"}}>{"Site Web : "+this.props.reservation.agence.siteWeb}</h4> 
                          </div>   
                        
                     </CardContent>
                     </Card>
                    <table>
                        <tr>
                            <td>
                            <Card style={{width:"500px"}}>
                            <CardHeader  style={{background:"#DCDCDC    ",textAlign: 'center' }}
                            title={"Les informations du locataire"}
                   
                            />
                            <Divider />
                            <CardContent>
                          <div style={{width:"200px",height:"150px",float:"left"}}>
                            <h4 style={{margin:"10px",color:"gray"}}>{"Nom de loueur : "}</h4>
                            <h4  style={{margin:"10px",color:"gray"}}>{"Adresse : "}</h4>
                            <h4  style={{margin:"10px",color:"gray"}}>{"Tel : "}</h4> 
                            <h4  style={{margin:"10px",color:"gray"}}>{"Numéro de la CIN : "}</h4> 
                            <h4  style={{margin:"10px",color:"gray"}}>{"Numéro de la Carte Visa : "}</h4>  
                          </div>
                          <div style={{width:"200px",height:"150px",float:"left"}}>
                            <h4 style={{margin:"10px"}}>{this.props.reservation.user.nom+" "+ this.props.reservation.user.prenom}</h4>
                            <h4  style={{margin:"10px"}}>{this.props.reservation.user.ville + " "+ this.props.reservation.user.adresse }</h4>
                            <h4  style={{margin:"10px"}}>{this.props.reservation.user.tel}</h4> 
                            <h4  style={{margin:"10px"}}>{this.props.reservation.user.nCin}</h4> 
                            <h4  style={{margin:"10px"}}>{this.props.reservation.user.nCarteVisa}</h4> 
                          </div>            
                        </CardContent>
                        <div>
                          <div style={{width:"250px",height:"150px",float:"left"}}>
                             <img src={this.props.reservation.user.cin} style={{width:"240px",height:"150px"}}/>
                          </div>
                          <div  style={{width:"250px",height:"150px",float:"left"}}>
                             <img src={this.props.reservation.user.carteVisa} style={{width:"240px",height:"150px"}}/>
                          </div>            
                        </div>
                        </Card>

                            </td>
                            <td>
                            <Card style={{width:"500px"}}>
                            <CardHeader  style={{background:"#DCDCDC",textAlign: 'center' }}
                            title={"Les informations de la voiture"}
                            />

                            <CardContent>
                          <div style={{width:"200px",height:"150px",float:"left"}}>
                            <h4 style={{margin:"10px",color:"gray"}}>{"Matricule : "}</h4>
                            <h4 style={{margin:"10px",color:"gray"}}>{"Marque : "}</h4>
                            <h4  style={{margin:"10px",color:"gray"}}>{"Modele : "}</h4>
                            <h4  style={{margin:"10px",color:"gray"}}>{"Catégorie loué : "}</h4> 
                            <h4  style={{margin:"10px",color:"gray"}}>{"Assurance : "}</h4> 
                            
                          </div>
                          <div style={{width:"200px",height:"150px",float:"left"}}>
                            <h4 style={{margin:"10px"}}>{this.props.reservation.voiture.matricule}</h4>
                            <h4  style={{margin:"10px"}}>{this.props.reservation.ficheTechnique.marque }</h4>
                            <h4  style={{margin:"10px"}}>{this.props.reservation.ficheTechnique.modele}</h4> 
                            <h4  style={{margin:"10px"}}>{this.props.reservation.ficheTechnique.categorie}</h4> 
                            <h4  style={{margin:"10px"}}>{this.props.reservation.voiture.assurance}</h4> 
                          </div> 
                          <div style={{width:"400px",height:"170px",float:"right"}}>
                             <img src={this.props.reservation.voiture.carteGris} style={{width:"240px",height:"150px",float:"center"}}/>
                          </div>

                            </CardContent>
                            </Card>

                            </td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td>
                            <Card style={{width:"500px"}}>
                            <CardHeader  style={{background:"#DCDCDC",textAlign: 'center' }}
                            title={"Les informations de la réservations"}
                            />

                            <CardContent>
                          <div style={{width:"180px",height:"200px",float:"left"}}>
                            <h4 style={{margin:"10px",color:"gray"}}>{"Date de départ : "}</h4>
                            <h4 style={{margin:"10px",color:"gray"}}>{"Date d'arrivée : "}</h4>
                            <h4  style={{margin:"10px",color:"gray"}}>{"Niveau de Carburant : "}</h4> 
                            <h4  style={{margin:"10px",color:"gray"}}>{"Km de départ : "}</h4>
                            <Divider/>
                            <h4  style={{margin:"10px",color:"gray"}}>{"Prix Total : "}</h4>  
                            
                          </div>
                          <div style={{width:"250px",height:"200px",float:"left"}}>
                            <h4 style={{margin:"10px"}}>{this.props.reservation.reservation.dateDepart.slice(0,10)}</h4>
                            <h4  style={{margin:"10px"}}>{this.props.reservation.reservation.dateRetour.slice(0,10) }</h4>

                            <h4  style={{margin:"10px"}}>{
                                    (this.props.reservation.voiture.nCarburant == 0.25) && "1/4"||
                                    (this.props.reservation.voiture.nCarburant == 0.5) && "1/2"||
                                    (this.props.reservation.voiture.nCarburant == 0.75) && "3/4"||
                                    (this.props.reservation.voiture.nCarburant == 1) && "Plein"||
                                    (this.props.reservation.voiture.nCarburant == 0) && "Vide"
                                    }</h4> 
                            <h4  style={{margin:"10px"}}>{this.props.reservation.voiture.km + " km"}</h4>
                            <Divider/>
                            <h4  style={{margin:"10px"}}>{prix + " DT"}</h4> 
                          </div>

                            </CardContent>
                            </Card>

                            </td>
                            <td>
                            <Card style={{width:"500px"}}>
                            <CardHeader  style={{background:"#DCDCDC",textAlign: 'center' }}
                            title={"Les pannes de la voiture "}
                            />
                            <CardContent>
                            <Table  >
                                    <TableHead><TableRow >
                                            <TableCell style={{textAlign:'center'}}>Code</TableCell>
                                            <TableCell style={{textAlign:'center'}}>Description</TableCell>
                                            <TableCell style={{textAlign:'center'}}>Catégorie</TableCell>
                                            
                                    </TableRow></TableHead>
                                    <TableBody>
                                            {this.state.diag.map((panne) =>(
                                                <TableRow>
                                                <TableCell style={{textAlign:'center'}}>{panne.code}</TableCell>
                                                <TableCell style={{textAlign:'center'}}>{panne.description}</TableCell>
                                                <TableCell style={{textAlign:'center'}}>{panne.type}</TableCell>
                                                </TableRow>                                               
                                            ))}
                                            
                                        
                                    </TableBody>
                                </Table> 

                            </CardContent>

                            </Card>

                            </td>
                        </tr>
                    </table>




                          <p style={{marginTop:"50px",backgroundColor:"#DCDCDC", textIndent:"3ch",display:"inline",fontSize:"18px"}}>Je soussigné(e), {this.props.reservation.user.nom + " " + this.props.reservation.user.nom }, ai examiné attentivement et dans un lieu suffisamment éclairé l'état du véhicule, et confirme qu'il est fidélement décrit ci-
                          dessus. Je prends la responsabilité du véhicule pendant la location et m'engage à le restituer dans l'état initial, à l'heure indiquée sur ce contract, et à l'adresse ou il m'a été
                          remis. J'autorise irrévocablement l'agence {this.props.reservation.agence.nom } à prélever sur ma carte bancaire toute somme au titre des conditions générales du site et des réparations.</p> 



                            <Divider/>
                            <Table style={{marginBottom: "0px"}} >
                                    <TableHead><TableRow >
                                            <TableCell style={{textAlign:'center'}}>Signature du locataire</TableCell>
                                            <TableCell style={{textAlign:'center'}}>Signature du chef d'agence</TableCell>
                                            
                                    </TableRow></TableHead>
                                    
                                </Table> 
                            <Button onClick={this.props.onHide}
                            color="primary"
                            variant="contained"
                            >
                             Fermer
                            </Button>
                        </CardContent>
                    </Card>

                  </Modal>
                
               );
        }else {
            return (
                <Modal isOpen={this.props.show}
                    style={this.state.customStyles}>
                    <Card>
                    <CardHeader
                    title={"NONE"}
                    />
                    <Divider />
                    </Card>
                  </Modal>
                
               );
        }
        
    }
}

export default Contrat;