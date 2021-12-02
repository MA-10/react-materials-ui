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
import AdminList from 'src/pages/AdminList'


class AjouterAgence extends Component {

    constructor() {
        super();
        this.state = {
            nom: '',
            prenom: '',
            login: '',
            email: '',
            tel: '',
            ville: '',
            adresse: '',
            password: '',
            idAgence: 0,
            agences: []
        }
        this.GetAgences();

    }
    GetAgences() {
        fetch(
            "http://localhost:63938/api/agence/"
        ).then(response => response.json()).then(data => { this.setState({ agences: data }); })
    }


    AddAdmin() {
        fetch('http://localhost:63938/api/admin', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom: this.state.nom,
                prenom: this.state.prenom,
                login: this.state.login,
                email: this.state.email,
                tel: this.state.tel,
                ville: this.state.ville,
                adresse: this.state.adresse,
                password: this.state.password,
                idAgence: this.state.idAgence,

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
                <title>Ajouter un admin  | TuniLoc</title>
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
                                        subheader="Remplir ces informations SVP"
                                        title="Nouveau administrateur"
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
                                                label="Nom de l'admin"
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
                                                label="Prenom de l'admin"
                                                required
                                                variant="outlined"
                                                onChange={(event) => { this.setState({ prenom: event.target.value }) }}
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
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <FormControl variant="outlined" style={{ width: "100%" }} >
                                                <InputLabel >Agence</InputLabel>
                                                <Select
                                                    label="Agence"
                                                    labelId="c"
                                                    name="num"

                                                    onChange={(event) => { this.setState({ idAgence: parseInt(event.target.value) }); }}
                                                >
                                                    <MenuItem value="0"></MenuItem>
                                                    {this.state.agences.map((agence) => (
                                                        <MenuItem value={agence.id}>{agence.nom}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
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
                                                label="Login"
                                                required
                                                variant="outlined"
                                                onChange={(event) => { this.setState({ login: event.target.value }) }}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <TextField
                                                type='password'
                                                aria-readonly='true'
                                                fullWidth
                                                helperText=" "
                                                label="Mot de passe"
                                                required
                                                variant="outlined"
                                                onChange={(event) => { this.setState({ password: event.target.value }) }}
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
                                        <Button onClick={(event) => this.AddAdmin()}
                                            color="primary"
                                            variant="contained"
                                        >
                                            Ajouter
          </Button>

                                        <Link
                                            component={AdminList}
                                            to="/app/admins"
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