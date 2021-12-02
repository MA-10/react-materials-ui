import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Paper from '@material-ui/core/Paper';
import {
  Box,
  Container,
  Grid,
  Button,
  Card, CardHeader, TextField,
  CardActions,
  CardContent,
  Divider,
  Typography,
  FormControl,
  InputLabel, Select, MenuItem
} from '@material-ui/core';
import { Download } from 'react-feather';
import * as XLSX from "xlsx";
import VoituresList from './VoituresList';


class AjouterVoiture extends Component {

  constructor() {
    super();
    this.state = {
      i: 0,
      etat: true,
      status: 'Oui',
      file: '',
      image: null,
      image1: null,
      image2: null,
      image3: null,
      carte: null,
      prix: 0,
      fiche: [{ name: "modele", valeur: "Golf 7", __rowNum__: 1 }],
      fichejs: {
        modele: "", marque: "", categorie: "", carrosserie: "", nPlaces: 0, nPortes: 0, nCylindres: 0, energie: "",
        puissance: 0, transmission: "", nRapports: 0, abs: true, airbags: true, antiDerap: true, capteurRecul: true, climat: true
      },
      idFiche: 0,
      idAgence: parseInt(localStorage.getItem('idAgence')),
      matricule: '',
      assurance: '',
      nCarburant: 0,
      km: 0,
      fiche: []
    }

  }
  componentDidMount(event) { this.ImportFiche(); }
  componentDidUpdate(event) { this.ImportFiche(); }
  AddCar() {
    fetch('http://localhost:63938/api/voiture', {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idAgence: this.state.idAgence,
        idFicheTech: this.state.idFiche,
        prix: this.state.prix,
        etatDispo: this.state.etat,
        carteGris: this.state.carte,
        matricule: this.state.matricule,
        image: this.state.image,
        image1: this.state.image1,
        image2: this.state.image2,
        image3: this.state.image3,
        assurance: this.state.assurance,
        nCarburant: this.state.nCarburant,
        km: this.state.km,

      })
    }).then((Response) => {
      console.log(Response)
      if (Response.ok || Response.status == 500) {
        alert("succés")
        this.refs.annuler.click()
      } else alert("echec")
    })


  }
  UploadFiche() {


    fetch('http://localhost:63938/api/ficheTechnique', {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.fichejs)
    }).then((Response) => Response.json())
      .then((Result) => {
        this.setState({ idFiche: Result.id });
      })

  }
  ImportFiche() {
    fetch(
      "http://localhost:63938/api/ficheTechnique/"
    ).then(response => response.json()).then(data => { this.setState({ fiche: data }) })
  }
  readValues() {
    let copy = JSON.parse(JSON.stringify(this.state.fichejs));

    this.state.fiche.map((element) => {
      switch (element.name) {
        case "modele": copy["modele"] = element.valeur;
        case "marque": copy["marque"] = element.valeur
        case "categorie": copy["categorie"] = element.valeur
        case "carrosserie": copy["carrosserie"] = element.valeur
        case "nombre de places": copy["nPlaces"] = element.valeur
        case "nombre de portes": copy["nPortes"] = element.valeur
        case "nombre de cylindres": copy["nCylindres"] = element.valeur
        case "energie": copy["energie"] = element.valeur
        case "puissance": copy["puissance"] = element.valeur
        case "transmission": copy["transmission"] = element.valeur
        case "nombre rapports": copy["nRapports"] = element.valeur
        case "abs": { if (element.valeur == "non") { copy["abs"] = false } }
        case "airbags": { if (element.valeur == "non") { copy["airbags"] = false } }
        case "anti derapage": { if (element.valeur == "non") { copy["antiDerap"] = false } }
        case "capteur recule": { if (element.valeur == "non") { copy["capteurRecul"] = false } }
        case "climatiseur": { if (element.valeur == "non") { copy["climat"] = false } }
      }

    });
    this.setState({ fichejs: copy })
    console.log(this.state.fichejs)
    this.UploadFiche();
  }
  readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;


        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);
        this.setState({ fiche: data });
        this.readValues();
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });


  };
  AddImage(image) {
    switch (this.state.i) {
      case 0: this.ReadImage(image); this.setState({ i: 1 }); break;
      case 1: this.ReadImage1(image); this.setState({ i: 2 }); break;
      case 2: this.ReadImage2(image); this.setState({ i: 3 }); break;
      case 3: this.ReadImage3(image); this.setState({ i: 4 }); break;
      default: alert('vous ne pouvez pas ajouter une autre image'); break;
    }
  }
  ReadImage(image) {
    const reader = new FileReader();
    reader.onloadend = () => {

      this.setState({ image: reader.result })
      console.log(this.state.image)

    }
    reader.readAsDataURL(image)

  }
  ReadImage1(image) {
    const reader = new FileReader();
    reader.onloadend = () => {

      this.setState({ image1: reader.result })
      console.log(this.state.image)

    }
    reader.readAsDataURL(image)

  }
  ReadImage2(image) {
    const reader = new FileReader();
    reader.onloadend = () => {

      this.setState({ image2: reader.result })
      console.log(this.state.image)

    }
    reader.readAsDataURL(image)

  }
  ReadImage3(image) {
    const reader = new FileReader();
    reader.onloadend = () => {

      this.setState({ image3: reader.result })
      console.log(this.state.image)

    }
    reader.readAsDataURL(image)

  }
  ReadCarte(image) {
    const reader = new FileReader();
    reader.onloadend = () => {

      this.setState({ carte: reader.result })

    }
    reader.readAsDataURL(image)

  }
  handleChange(event) {
  }

  render() {
    return (<>


      <Helmet>
        <title>Ajouter Voiture | TuniLoc</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >

        <Container>

          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <Card>
                <CardContent>
                  
                    <div>
                      <Grid container spacing={3}>
                        <Grid container item xs={12} spacing={3}>
                          <Grid item xs={6}>
                            <Paper  style={{
                                height: "150px",
                                width: "150px"
                              }} >{this.state.image && (<img
                              src={this.state.image}
                              style={{
                                height: "140px",
                                width: "140px"
                              }}


                            />)}</Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper style={{
                                height: "150px",
                                width: "150px"
                              }} >{this.state.image1 && (<img
                              src={this.state.image1}
                              style={{
                                height: "140px",
                                width: "140px"
                              }}

                            />)}</Paper>
                          </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                          <Grid item xs={6}>
                            <Paper style={{
                                height: "150px",
                                width: "150px"
                              }} >{this.state.image2 && (<img
                              src={this.state.image2}
                              style={{
                                height: "140px",
                                width: "140px"
                              }}

                            />)}</Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper style={{
                                height: "150px",
                                width: "150px"
                              }} >{this.state.image3 && (<img
                              src={this.state.image3}
                              style={{
                                height: "140px",
                                width: "140px"
                              }}

                            />)}</Paper>
                          </Grid>
                        </Grid>

                      </Grid>
                    </div>



                 
                </CardContent>
                <Divider />
                <CardActions>
                  <input hidden id="image" ref="imageInput" type="file" accept="image/*" onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      this.AddImage(file)
                    }
                  }} />
                  <Button onClick={() => this.refs.imageInput.click()}
                    color="primary"
                    fullWidth
                    variant="text"
                  >
                    ajouter une photo de la voiture
                        </Button>

                </CardActions>
              </Card>

            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <form
                autoComplete="off"
                noValidate

              >

                <Card>
                  <CardHeader
                    subheader="Entrer ces informations SVP"
                    title="Nouvelle Voiture"
                  />
                  <Divider />
                  <CardContent>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        aria-readonly='true'
                        fullWidth
                        helperText=" "
                        label="Matricule"
                        name="Matricule"
                        required
                        value={this.state.matricule}
                        variant="outlined"
                        onChange={(event) => this.setState({ matricule: event.target.value })}
                      />
                    </Grid>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid
                        item
                        md={11}
                        xs={12}
                      >
                        <FormControl variant="outlined" style={{ width: "100%" }} >
                          <InputLabel >Fiche Technique</InputLabel>

                          <Select
                            label="Fiche Technique"
                            labelId="fiche"
                            id="fiche"
                            value={this.state.idFiche}
                            onChange={(event) => { this.setState({ idFiche: parseInt(event.target.value) }) }}

                          >
                            <MenuItem value=""></MenuItem>
                            {
                              this.state.fiche.map((fiche) => (
                                <MenuItem value={fiche.id}>{fiche.marque + "_" + fiche.modele}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item
                        md={1}
                        xs={12}>
                        <div>
                          <Download onClick={() => this.refs.fileInput.click()} style={{ height: "50px" }} />
                          <input id='fiche' hidden accept=".xls,.xlsx" ref="fileInput" type="file" onChange={(e) => {
                            const file = e.target.files[0];
                            this.readExcel(file);
                          }} />
                        </div>

                      </Grid>


                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <TextField

                          fullWidth
                          label="Prix de location"
                          name="prix"
                          onChange={(event) => { this.setState({ prix: parseFloat(event.target.value) }); console.log(this.state.prix) }}
                          required
                          variant="outlined"
                        />
                      </Grid>

                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <FormControl variant="outlined" style={{ width: "100%" }} >
                          <InputLabel >Disponible</InputLabel>

                          <Select
                            label="Disponible"
                            labelId="status"
                            id="status"
                            value={this.state.status}
                            onChange={(event) => {
                              this.setState({ status: event.target.value });
                              if (event.target.value == 'Non') { this.setState({ etat: false }) }
                              if (event.target.value == 'Oui') { this.setState({ etat: true }) }
                              console.log(this.state.status + "+" + this.state.etat)
                            }

                            }

                          >
                            <MenuItem value="">
                            </MenuItem>
                            <MenuItem value={"Oui"} >Oui</MenuItem>
                            < MenuItem value={"Non"}>Non</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Assurance"
                          name="assurence"
                          onChange={(event) => this.setState({ assurance: event.target.value })}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <FormControl variant="outlined" style={{ width: "100%" }} >
                          <InputLabel >Niveau de Carburant</InputLabel>
                          <Select
                            label="Niveau de Carburant"
                            labelId="c"
                            id="c"
                            value={this.state.nCarburant}
                            onChange={(event) => { this.setState({ nCarburant: parseFloat(event.target.value) }); }}
                          >
                            <MenuItem value="">
                            </MenuItem>
                            <MenuItem value={"0"} >Vide</MenuItem>
                            <MenuItem value={"0.25"} >1/4</MenuItem>
                            <MenuItem value={"0.5"} >1/2</MenuItem>
                            <MenuItem value={"0.75"} >3/4</MenuItem>
                            < MenuItem value={"1"}>Plein</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Km"
                          name="Km"
                          onChange={(event) => this.setState({ km: parseFloat(event.target.value) })}
                          variant="outlined"
                        />
                      </Grid>


                    </Grid>
                  </CardContent>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        {this.state.carte && <img
                          src={this.state.carte}
                          style={{
                            height: "200px",
                            width: "350px"
                          }}

                        />}


                        <Typography
                          color="textPrimary"
                          gutterBottom
                          variant="h3"
                        >
                          Carte Grise
        </Typography>

                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <input hidden id="carte" ref="carteInput" type="file" onChange={(event) => {
                        const file = event.target.files[0];
                        if (file) {
                          this.ReadCarte(file)
                        }
                      }} />
                      <Button onClick={() => this.refs.carteInput.click()}
                        color="primary"
                        variant="text"
                        fullWidth

                      >
                        Upload picture
      </Button>

                    </CardActions>
                  </Card>
                  <Divider />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      p: 2
                    }}
                  >
                    <button ></button>
                    <Button onClick={(event) => this.AddCar()}
                      color="primary"
                      variant="contained"
                    >
                      Ajouter
          </Button>

                    <Link
                      component={VoituresList}
                      to="/app/voitures"
                      hidden
                      ref='annuler'
                    >
                      Annuler
                  </Link>

                    <Button onClick={(event) => this.refs.annuler.click()}
                      color="secondary"
                      variant="contained"
                    >Annuler
          </Button>
                  </Box>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </>
    );
  }
}

export default AjouterVoiture;