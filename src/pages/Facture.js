import React, { Component } from 'react';
import Modal from 'react-modal';
import {
  Box,
  Container,
  Grid,
  Button, TableCell, Table, TableRow, TableHead, TableBody,
  Card, CardHeader, TextField,
  CardActions,
  CardContent,
  Divider,
  Typography,
  FormControl,
  InputLabel, Select, MenuItem,
  TextArea
} from '@material-ui/core';

class Facture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customStyles: {
        content: {
          top: '20%',
          left: '20%',
          right: 'auto',
          bottom: "auto",
          marginLeft: '20%',
          marginTop: '3%',
          transform: 'translate(-20%, -20%)'
        }
      },
      diag: []
    }



  }
  GetDiagnostic(idVoiture) {
    fetch("http://localhost:63938/api/diagnostic/diff/" + idVoiture)
      .then(result => result.json())
      .then(data => this.setState({ diag: data }))

  }
  JoursRetard() {
    var date1 = new Date(this.props.res.reservation.dateRetour);
    var date2 = new Date(this.props.facture.date);
    var time_diff = date2.getTime() - date1.getTime();
    var days_Diff = time_diff / (1000 * 3600 * 24);
    return days_Diff;
  }
  /*KmSupp() {
    if (  this.props.facture.km-(this.props.res.reservation.km + this.props.res.voiture.km) > 0) return this.props.facture.km-(this.props.res.reservation.km + this.props.res.voiture.km)
    else return 0;
  }*/
  nCarburantSupp() {
    if ((this.props.res.voiture.nCarburant - this.props.facture.nCarburant) > 0) return this.props.res.voiture.nCarburant - this.props.facture.nCarburant;
    else return 0

  }
  Total() {
    return this.JoursRetard() * this.props.res.voiture.prix
      /*+ this.KmSupp() * this.props.res.voiture.tarifKm*/
      + this.nCarburantSupp() * 100
      + this.props.facture.montantRep
  }




  render() {

    if (this.props.facture != null && this.props.res) {
      this.GetDiagnostic(this.props.res.reservation.idVoiture)




      return (
        <Modal isOpen={this.props.show}
          style={this.state.customStyles}>
          <Card >
            <CardContent>

              <Card >
                <CardHeader style={{ background: "#00FFFF", textAlign: 'center' }}
                  title={"Facture de retour de la voiture numéro : " + this.props.facture.id}
                  subheader={"Contrat : " + this.props.facture.nContrat}
                />

                <CardContent>
                  <div style={{ width: "300px", height: "150px", float: "left" }}>

                    <img src={this.props.res.agence.logo} style={{ width: "300px", height: "150px" }} />
                  </div>
                  <div style={{ width: "500", height: "80px", marginLeft: "500px", textAlign: 'center', marginBottom: "50px" }}>
                    <h4 style={{ margin: "10px", color: "gray" }}>{"Nom de l'agence : " + this.props.res.agence.nom}</h4>
                    <h4 style={{ margin: "10px", color: "gray" }}>{"Adresse : " + this.props.res.agence.ville + " " + this.props.res.agence.adresse}</h4>
                    <h4 style={{ margin: "10px", color: "gray" }}>{"Tel : " + this.props.res.agence.tel}</h4>
                    <h4 style={{ margin: "10px", color: "gray" }}>{"Email : " + this.props.res.agence.email}</h4>
                    <h4 style={{ margin: "10px", color: "gray" }}>{"Site Web : " + this.props.res.agence.siteWeb}</h4>
                  </div>

                </CardContent>
              </Card>
              <table>
                <tr>
                  <td>
                    <Card style={{ width: "500px" }}>
                      <CardHeader style={{ background: "#DCDCDC    ", textAlign: 'center' }}
                        title={"Les informations du locataire"}

                      />
                      <Divider />
                      <CardContent>
                        <div style={{ width: "200px", height: "150px", float: "left" }}>
                          <h4 style={{ margin: "10px", color: "gray" }}>{"Nom de loueur : "}</h4>
                          <h4 style={{ margin: "10px", color: "gray" }}>{"Adresse : "}</h4>
                          <h4 style={{ margin: "10px", color: "gray" }}>{"Tel : "}</h4>
                          <h4 style={{ margin: "10px", color: "gray" }}>{"Numéro de la CIN : "}</h4>
                          <h4 style={{ margin: "10px", color: "gray" }}>{"Numéro de la Carte Visa : "}</h4>
                        </div>
                        <div style={{ width: "200px", height: "150px", float: "left" }}>
                          <h4 style={{ margin: "10px" }}>{this.props.res.user.nom + " " + this.props.res.user.prenom}</h4>
                          <h4 style={{ margin: "10px" }}>{this.props.res.user.ville + " " + this.props.res.user.adresse}</h4>
                          <h4 style={{ margin: "10px" }}>{this.props.res.user.tel}</h4>
                          <h4 style={{ margin: "10px" }}>{this.props.res.user.nCin}</h4>
                          <h4 style={{ margin: "10px" }}>{this.props.res.user.nCarteVisa}</h4>
                        </div>
                      </CardContent>
                      <div>
                        <div style={{ width: "250px", height: "150px", float: "left" }}>
                          <img src={this.props.res.user.cin} style={{ width: "240px", height: "150px" }} />
                        </div>
                        <div style={{ width: "250px", height: "150px", float: "left" }}>
                          <img src={this.props.res.user.carteVisa} style={{ width: "240px", height: "150px" }} />
                        </div>
                      </div>
                    </Card>

                  </td>
                  <td>
                    <Card style={{ width: "500px" }}>
                      <CardHeader style={{ background: "#DCDCDC", textAlign: 'center' }}
                        title={"Les informations de la voiture"}
                      />

                      <CardContent>
                        <div style={{ width: "200px", height: "150px", float: "left" }}>
                          <h4 style={{ margin: "10px", color: "gray" }}>{"Matricule : "}</h4>
                          <h4 style={{ margin: "10px", color: "gray" }}>{"Marque : "}</h4>
                          <h4 style={{ margin: "10px", color: "gray" }}>{"Modele : "}</h4>
                          <h4 style={{ margin: "10px", color: "gray" }}>{"Catégorie loué : "}</h4>
                          <h4 style={{ margin: "10px", color: "gray" }}>{"Assurance : "}</h4>

                        </div>
                        <div style={{ width: "200px", height: "150px", float: "left" }}>
                          <h4 style={{ margin: "10px" }}>{this.props.res.voiture.matricule}</h4>
                          <h4 style={{ margin: "10px" }}>{this.props.res.ficheTechnique.marque}</h4>
                          <h4 style={{ margin: "10px" }}>{this.props.res.ficheTechnique.modele}</h4>
                          <h4 style={{ margin: "10px" }}>{this.props.res.ficheTechnique.categorie}</h4>
                          <h4 style={{ margin: "10px" }}>{this.props.res.voiture.assurance}</h4>
                        </div>
                        <div style={{ width: "400px", height: "170px", float: "right" }}>
                          <img src={this.props.res.voiture.carteGris} style={{ width: "240px", height: "150px", float: "center" }} />
                        </div>

                      </CardContent>
                    </Card>

                  </td>
                </tr>
              </table>
              <table>
                <tr>
                  <td>
                    <Card style={{ width: "500px" }}>
                      <CardHeader style={{ background: "#DCDCDC", textAlign: 'center' }}
                        title={"Les informations de la réservations"}
                      />

                      <CardContent>
                        <div style={{ width: "250px", height: "200px", float: "left" }}>
                          <h4 style={{ margin: "10px", color: "gray" }}>{"Jours en retard : "}</h4>
                          <h4 style={{ margin: "10px", color: "gray" }}>{"Niveau de carburant manquant: "}</h4>
                          <h4 style={{ margin: "10px", color: "gray" }}>{"Montant de réparation : "}</h4>

                          <Divider />
                          <h4 style={{ margin: "10px", color: "gray" }}>{"Montant Total : "}</h4>

                        </div>
                        <div style={{ width: "200px", height: "200px", float: "left" }}>
                          <h4 style={{ margin: "10px" }}>{Math.round(this.JoursRetard()) + " jours * " + this.props.res.voiture.prix + " DT"}</h4>
                          <h4 style={{ margin: "10px" }}>{
                            (this.nCarburantSupp() == 0.25) && "1/4 " ||
                            (this.nCarburantSupp() == 0.5) && "1/2 " ||
                            (this.nCarburantSupp() == 0.75) && "3/4 " ||
                            (this.nCarburantSupp() == 1) && "Plein " ||
                            (this.nCarburantSupp() == 0) && "0"
                          }</h4>
                          <h4 style={{ margin: "10px" }}>{this.props.facture.montantRep + " DT"}</h4>
                          <Divider />
                          <h4 style={{ margin: "10px" }}>{this.Total() + " DT"}</h4>
                        </div>

                      </CardContent>
                    </Card>

                  </td>
                  <td>
                    <Card style={{ width: "500px" }}>
                      <CardHeader style={{ background: "#DCDCDC", textAlign: 'center' }}
                        title={"Les pannes commités par le locataire "}
                      />
                      <CardContent>
                        <Table  >
                          <TableHead><TableRow >
                            <TableCell style={{ textAlign: 'center' }}>Code</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>Description</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>Catégorie</TableCell>

                          </TableRow></TableHead>
                          <TableBody>
                            {this.state.diag.map((panne) => (
                              <TableRow>
                                <TableCell style={{ textAlign: 'center' }}>{panne.code}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{panne.description}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{panne.type}</TableCell>
                              </TableRow>
                            ))}


                          </TableBody>
                        </Table>

                      </CardContent>

                    </Card>

                  </td>
                </tr>
              </table>




              <p style={{ marginTop: "50px", backgroundColor: "#DCDCDC", textIndent: "3ch", display: "inline", fontSize: "18px" }}>{this.props.facture.remarque}</p>



              <Divider />
              <Table style={{ marginBottom: "0px" }} >
                <TableHead><TableRow >
                  <TableCell style={{ textAlign: 'center' }}>Signature du locataire</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>Signature du chef d'agence</TableCell>

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
    } else {
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

export default Facture;