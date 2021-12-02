import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import { Helmet } from 'react-helmet';
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


class ModifierVoiture extends Component {

  constructor(props) {
    super(props);
    this.state = {

      customStyles: {
        content: {
          top: '20%',
          left: '20%',
          right: 'auto',
          bottom: 'auto',
          marginLeft: '20%',
          marginTop: '3%',
          transform: 'translate(-20%, -20%)'
        }
      },
      etat: this.props.voiture.voiture.etatDispo,
      status: 'Oui',
      file: this.props.voiture.ficheTechnique.marque + '_' + this.props.voiture.ficheTechnique.modele,
      image: this.props.voiture.voiture.image,
      carte: this.props.voiture.voiture.carteGris,
      prix: this.props.voiture.voiture.prix,
      agence: this.props.voiture.agence.nom,
      fiche: [{ name: "modele", valeur: "Golf 7", __rowNum__: 1 }],
      fichejs: {
        modele: "", marque: "", categorie: "", carrosserie: "", nPlaces: 0, nPortes: 0, nCylindres: 0, energie: "",
        puissance: 0, transmission: "", nRapports: 0, abs: true, airbags: true, antiDerap: true, capteurRecul: true, climat: true
      },
      idFiche: this.props.voiture.ficheTechnique.id,
      idAgence: this.props.voiture.voiture.idAgence,
      matricule: this.props.voiture.voiture.matricule,
      assurance: this.props.voiture.voiture.assurance,
      nCarburant: this.props.voiture.voiture.nCarburant,
      km: this.props.voiture.voiture.km,
      fiche: []
    }
    if (this.state.etat == false) { this.setState({ status: 'Non' }) }


  }
  componentDidMount(event) { this.ImportFiche(); }
  /*componentDidUpdate(event){this.ImportFiche();}*/
  AddCar() {
    fetch('http://localhost:63938/api/voiture/' + this.props.voiture.voiture.id, {

      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.props.voiture.voiture.id,
        idAgence: this.state.idAgence,
        idFicheTech: this.state.idFiche,
        prix: this.state.prix,
        etatDispo: this.state.etat,
        carteGris: this.state.carte,
        matricule: this.state.matricule,
        image: this.state.image,
        assurance: this.state.assurance,
        nCarburant: this.state.nCarburant,
        km: this.state.km

      })
    }).then((Response) => Response.json())
      .then((Result) => { this.props.onHide; }
      )
    window.location.reload(true);

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
    this.ImportFiche();
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
  ReadImage(image) {
    const reader = new FileReader();
    reader.onloadend = () => {

      this.setState({ image: reader.result })
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


  render() {
    return (<Modal isOpen={this.props.show}
      style={this.state.customStyles}>



      <Helmet>
        <title>Modifier une voiture | TuniLoc</title>
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
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <img
                      src={this.props.voiture.voiture.image}
                      style={{
                        height: "300px",
                        width: "400px"
                      }}

                    />

                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <input hidden id="image" ref="imageInput" type="file" accept="image/*" onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      this.ReadImage(file)
                    }
                  }} />
                  <Button onClick={() => this.refs.imageInput.click()}
                    color="primary"
                    fullWidth
                    variant="text"
                  >
                    photo de la voiture
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
                    title="Modifier une Voiture"
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
                            value={this.state.file}
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
                          value={this.state.prix}
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
                            labelId="status"
                            id="status"
                            value={this.state.status}
                            onChange={(event) => {
                              this.setState({ status: event.target.value });
                              if (this.state.status == 'Non') { this.setState({ etat: false }) }
                              else { this.setState({ etat: true }) }
                            }}
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
                          value={this.state.assurance}
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
                          value={this.state.km}
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
                        <img
                          src={this.props.voiture.voiture.carteGris}
                          style={{
                            height: "200px",
                            width: "350px"
                          }}

                        />


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
                      Appliquer
          </Button>


                    <Button onClick={this.props.onHide}
                      color="secondary"
                      variant="contained"
                    >
                      Annuler
          </Button>
                  </Box>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </Modal>
    );
  }
}

export default ModifierVoiture;