import { Component } from 'react';
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
    TextField,
    InputAdornment,
    SvgIcon,
    Button,
    Grid,


} from '@material-ui/core';
import { Trash, Edit } from "react-feather";
import ModifierAdmin from "src/pages/ModifierAdmin"

class AdminListResults extends Component {

    constructor() {
        super()
        this.state = {
            limit: 10,
            page: 0,
            start: 0,
            end: 10,
            admins: [],
            ModalShow: false,
            passedAdmin: null
        }

    }
    RefleshList() {
        fetch(
            "http://localhost:63938/api/admin/"
        ).then(response => response.json()).then(data => { this.setState({ admins: data }); })

    };
    componentDidMount(event) { this.RefleshList(); }
    handlePageChange = (event, newPage) => {
        setPage(newPage);

    };
    Delete(id) {
        if (window.confirm('voulez vous supprimer cet admin  !')) {
            fetch('http://localhost:63938/api/admin/' + id, {

                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            }).then((Response) => Response.json())
                .then((Result) => {
                    window.location.reload(true);
                })

        }

    }
    Toggle() {
        var temp = this.refs.typepass;
        if (temp.type === "password") {
            temp.type = "text";
        }
        else {
            temp.type = "password";
        }
    }


    render() {
        let closeModal = () => { this.setState({ ModalShow: false }) }
        return (
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
                                        placeholder="Chercher un admin"
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
                                        Nom
                </TableCell>
                                    <TableCell>
                                        Prenom
                </TableCell>
                                    <TableCell>
                                        Agence
                </TableCell>
                                    <TableCell>
                                        Email
                </TableCell>
                                    <TableCell>
                                        Tel
                </TableCell>
                                    <TableCell>
                                        Adresse
                </TableCell>
                                    <TableCell>
                                        Login
                </TableCell>
                                    <TableCell>
                                        Password
                </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.admins.slice(this.state.start, this.state.end).map((admin) => (
                                    <TableRow
                                        hover
                                        key={admin.id}
                                    >
                                        <TableCell padding="checkbox">
                                        </TableCell>
                                        <TableCell>{admin.admin.nom}</TableCell>
                                        <TableCell>{admin.admin.prenom}</TableCell>
                                        <TableCell><Avatar alt="Cindy Baker" src={admin.agence.logo} style={{ width: "50px", height: "50px" }} />{admin.agence.nom}</TableCell>
                                        <TableCell>{admin.admin.email}</TableCell>
                                        <TableCell>{admin.admin.tel}</TableCell>
                                        <TableCell>{admin.admin.ville + ": " + admin.admin.adresse}</TableCell>
                                        <TableCell>{admin.admin.login}</TableCell>
                                        <TableCell ><input type="password"
                                            value={admin.admin.password} id={admin.admin.id} onMouseEnter={ ()=>document.getElementById(admin.admin.id).type = 'text'}
                                            onMouseLeave={ ()=>document.getElementById(admin.admin.id).type = 'password'}/></TableCell>
                                            <TableCell>
                                                <Grid >
                                                    <Grid container item style={{ margin: "2px" }}>
                                                        <Button variant="contained" color="secondary" style={{ minWidth: "150px" }} onClick={() => this.Delete(admin.admin.id)}><Trash />Supprimer</Button>
                                                    </Grid>
                                                    <Grid container item style={{ margin: "2px" }}>
                                                        <Button onClick={() => { this.setState({ passedAdmin: admin }); this.setState({ ModalShow: true }) }} variant="contained" style={{ minWidth: "150px" }} ><Edit />Modifier</Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
                    <TablePagination
                        component="div"
                        count={this.state.admins.length}
                        onPageChange={(event, newPage) => {
                            this.setState({ page: newPage });
                            if (event.target.dataset.testid == 'KeyboardArrowRightIcon') {
                                this.setState({ start: this.state.start + this.state.limit });
                                this.setState({ end: this.state.end + this.state.limit });

                            } else {
                                this.setState({ start: this.state.start - this.state.limit });
                                this.setState({ end: this.state.end - this.state.limit });
                            }

                        }}
                        onRowsPerPageChange={(event) => {
                            this.setState({ limit: event.target.value });
                            this.setState({ end: event.target.value });
                        }}
                        page={this.state.page}
                        rowsPerPage={this.state.limit}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                    <ModifierAdmin onHide={closeModal} admin={this.state.passedAdmin} show={this.state.ModalShow} />
    </Card>


    )

  };
};



export default AdminListResults;
