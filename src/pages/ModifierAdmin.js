import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Modal from 'react-modal';


import {
    Box,
    Container,
    Grid,
    Button,
    Card, CardHeader, TextField,
    CardContent,
    Divider,
    FormControl,
    InputLabel, Select, MenuItem
} from '@material-ui/core';


class ModifierAdmin extends Component {

    constructor() {
        super();
        this.state = {
            customStyles: {
                content: {
                    top: '20%',
                    left: '20%',
                    right: '5%',
                    bottom: 'auto',
                    marginLeft: '20%',
                    marginTop: '3%',
                    transform: 'translate(-20%, -20%)'
                }
            },
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


    UpdateAdmin() {
        if (this.state.nom == '') this.setState({ nom: this.props.admin.admin.nom })
        if (this.state.prenom == '') this.setState({ prenom: this.props.admin.admin.prenom })
        if (this.state.login == '') this.setState({ login: this.props.admin.admin.login })
        if (this.state.email == '') this.setState({ email: this.props.admin.admin.email })
        if (this.state.tel == '') this.setState({ tel: this.props.admin.admin.tel })
        if (this.state.ville == '') this.setState({ ville: this.props.admin.admin.ville })
        if (this.state.adresse == '') this.setState({ adresse: this.props.admin.admin.adresse })
        if (this.state.password == '') this.setState({ password: this.props.admin.admin.password })
        if (this.state.idAgence == 0) this.setState({ idAgence: this.props.admin.admin.idAgence })
        if (this.state.nom != '' && this.state.prenom != '' && this.state.login != '' && this.state.email != '' && this.state.tel != '' &&
            this.state.ville != '' && this.state.adresse != '' && this.state.password != '' && this.state.idAgence != 0) {
            fetch('http://localhost:63938/api/admin/' + this.props.admin.admin.id, {

                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.props.admin.admin.id,
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
                if (Result.ok) { alert('success'); window.location.reload(true);}
                else alert('erreur ! ')


            }
            )

        }


    }
    render() {
        if (this.props.admin == null) {
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
            )
        }
        return ( <Modal isOpen={this.props.show}
            style={this.state.customStyles}>

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
                                                defaultValue={this.props.admin.admin.nom}
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
                                                defaultValue={this.props.admin.admin.prenom}
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
                                                defaultValue={this.props.admin.admin.ville}
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
                                                defaultValue={this.props.admin.admin.adresse}
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
                                                defaultValue={this.props.admin.admin.email}
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
                                                defaultValue={this.props.admin.admin.tel}
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
                                                    defaultValue={this.props.admin.admin.id}
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
                                                defaultValue={this.props.admin.admin.login}
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
                                                defaultValue={this.props.admin.admin.password}
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
                                        <Button onClick={(event) => this.UpdateAdmin()}
                                            color="primary"
                                            variant="contained"
                                        >
                                            Appliquer
          </Button>


                                        <Button onClick={(event) => window.location.reload(true)}
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

        </Modal>
        );
    }
}

export default ModifierAdmin;