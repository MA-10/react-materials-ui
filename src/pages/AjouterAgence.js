import React, { Component } from 'react';
import { Link } from "react-router-dom";
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
import AgenceList from 'src/pages/AgenceList'


class AjouterAgence extends Component {

    constructor() {
        super();
        this.state = {
            image: null,
            nom: '',
            siteWeb: '',
            email: '',
            tel: '',
            ville: '',
            adresse: ''

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
    AddAgence() {
        fetch('http://localhost:63938/api/agence', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom: this.state.nom,
                logo: this.state.image,
                email: this.state.email,
                tel: this.state.tel,
                ville: this.state.ville,
                adresse: this.state.adresse,
                siteWeb: this.state.siteWeb

            })
        }).then((Result) => {
            if (Result.ok) { alert('success'); this.refs.annuler.click(); }
            else alert('erreur ! ')


        }
        )
    }
    render() {
        return (<>


            <Helmet>
                <title>Ajouter une agence | TuniLoc</title>
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
                                        {this.state.image && (<img
                                            src={this.state.image}
                                            style={{
                                                height: "300px",
                                                width: "400px"
                                            }}

                                        />)}

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
                                        Logo
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
                                        title="Nouvelle agence"
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
                                                label="Nom de l'agence"
                                                required
                                                variant="outlined"
                                                onChange={(event) => { this.setState({ nom: event.target.value }) }}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <TextField
                                                aria-readonly='true'
                                                fullWidth
                                                helperText=" "
                                                label="Ville"
                                                required
                                                variant="outlined"
                                                onChange={(event) => { this.setState({ ville: event.target.value }) }}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <TextField
                                                aria-readonly='true'
                                                fullWidth
                                                helperText=" "
                                                label="Adresse"
                                                required
                                                variant="outlined"
                                                onChange={(event) => { this.setState({ adresse: event.target.value }) }}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <TextField
                                                aria-readonly='true'
                                                fullWidth
                                                helperText=" "
                                                label="Site web"
                                                required
                                                variant="outlined"
                                                onChange={(event) => { this.setState({ siteWeb: event.target.value }) }}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <TextField
                                                type="email"
                                                aria-readonly='true'
                                                fullWidth
                                                helperText=" "
                                                label="Email"
                                                required
                                                variant="outlined"
                                                onChange={(event) => { this.setState({ email: event.target.value }) }}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <TextField
                                                aria-readonly='true'
                                                fullWidth
                                                helperText=" "
                                                label="Numéro de téléphone"
                                                required
                                                variant="outlined"
                                                onChange={(event) => { this.setState({ tel: event.target.value }) }}
                                            />
                                        </Grid>
                                    </CardContent>

                                    <Divider />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            p: 2
                                        }}
                                    >
                                        <button ></button>
                                        <Button onClick={(event) => this.AddAgence()}
                                            color="primary"
                                            variant="contained"
                                        >
                                            Ajouter
          </Button>

                                        <Link
                                            component={AgenceList}
                                            to="/app/agences"
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

export default AjouterAgence;