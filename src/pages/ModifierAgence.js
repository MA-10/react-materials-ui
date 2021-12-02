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
    CardActions,
    CardContent,
    Divider,

} from '@material-ui/core';
import AgenceList from 'src/pages/AgenceList'


class ModifierVoiture extends Component {

    constructor(props) {
        super(props);
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


    ModifierAgence() {
        if (this.state.nom == '') this.setState({ nom: this.props.agence.nom })
        if (this.state.ville == '') this.setState({ ville: this.props.agence.ville })
        if (this.state.adresse == '') this.setState({ adresse: this.props.agence.adresse })
        if (this.state.email == '') this.setState({ email: this.props.agence.email })
        if (this.state.tel == '') this.setState({ tel: this.props.agence.tel })
        if (this.state.image == null) this.setState({ image: this.props.agence.logo })
        if (this.state.siteWeb == '') this.setState({ siteWeb: this.props.agence.siteWeb })
        if (this.state.nom != '' && this.state.ville != '' && this.state.adresse != ''
            && this.state.email != '' && this.state.tel != '' && this.state.image != null && this.state.siteWeb != '') {
            fetch('http://localhost:63938/api/agence/' + this.props.agence.id, {

                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.props.agence.id,
                    nom: this.state.nom,
                    logo: this.state.image,
                    email: this.state.email,
                    tel: this.state.tel,
                    ville: this.state.ville,
                    adresse: this.state.adresse,
                    siteWeb: this.state.siteWeb

                })
            }).then((Result) => {
                if (Result.ok) { alert('success'); window.location.reload(true); }
                else alert('erreur ! ')
                console.log(Result)


            }
            )
        }
    }
    render() {
        if (this.props.agence == null) {
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



        return (
            <Modal isOpen={this.props.show}
                style={this.state.customStyles}>


                <Helmet>
                    <title>Modifier une agence | TuniLoc</title>
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
                                            {(<img
                                                src={(this.state.image == null) && this.props.agence.logo || this.state.image}
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
                                            subheader={" Nom d'agence :"}
                                            title="Modifier les informations d'une agence"
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
                                                    defaultValue={this.props.agence.nom}
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
                                                    defaultValue={this.props.agence.ville}
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
                                                    defaultValue={this.props.agence.adresse}
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
                                                    defaultValue={this.props.agence.siteWeb}
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
                                                    defaultValue={this.props.agence.email}
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
                                                    defaultValue={this.props.agence.tel}
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
                                            <Button onClick={(event) => this.ModifierAgence()}
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

        )



    }
}

export default ModifierVoiture;