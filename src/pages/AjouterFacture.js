import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  TextField,FormControl,InputLabel,Select,TextareaAutosize,Table,TableHead,TableBody,TableRow,TableCell
} from '@material-ui/core';
import React, { Component } from 'react';
import FactureList from './FactureList';
import {Link} from "react-router-dom";



class AjouterFacture extends Component {
  constructor(){
    super();
    this.state={
       rep:0,
       num :0,
       date :'' ,
       km:0,
       nCarburant:0,
       remarque:'', 
       montant :0,
       reservation:[],pannes:[],reservations:[]
    }
    this.GetIdContrat();

  }


  montant(){
  let res ={};

   this.state.reservations.forEach((element) => {
    if(element.reservation.id == this.state.num){
      res = element
      console.log(res , element)
    }
     
   }); 
    let kmSupp = 0
    let nCarburantSupp = 0 ;
    /*if((this.state.km - (res.reservation.km + res.voiture.km)) > 0) kmSupp=this.state.km - (res.reservation.km + res.voiture.km) ;*/
    if((res.voiture.nCarburant - this.state.nCarburant) > 0) nCarburantSupp=res.voiture.nCarburant - this.state.nCarburant;
    var date1 = new Date(res.reservation.dateRetour);
    var date2 = new Date(this.state.date);
    var time_diff = date2.getTime() - date1.getTime();
    var days_Diff = Math.round(time_diff / (1000 * 3600 * 24));
    var m = Math.round(this.state.rep + /*kmSupp*res.voiture.tarifKm +*/ nCarburantSupp * 100 +days_Diff * res.voiture.prix);
    console.log(days_Diff)
    
    return m;
    


  }

    
    GetIdContrat () {
      fetch("http://localhost:63938/api/reservation/"+localStorage.getItem('idAgence')).then(result => result.json()).then(
          data =>{ 
            this.setState({reservations : data})
              let res = [];
              data.forEach(element => {
                if(element.reservation.status == "acceptée"){
                    res.push(element.reservation.id);
                  }
              });
              this.setState({
                  reservation : res,
              })
          }
      )
  }
   GetPannes  (idRes){
    let id = 0 ; 
    fetch("http://localhost:63938/api/reservation/"+localStorage.getItem('idAgence')).then(result => result.json()).then(
          data =>{
              data.forEach(element => {
                if(element.reservation.id == idRes){
                    id = element.reservation.idVoiture;
                  }
              });
              fetch("http://localhost:63938/api/diagnostic/diff/"+id).then(result => result.json()).then(data =>this.setState( {pannes : data}))
          }
      )
    
  }
  AddFacture  (){
    let body ={
      nContrat:this.state.num,
      date:this.state.date,
      km:this.state.km,
      nCarburant:this.state.nCarburant,
      remarque:this.state.remarque,
      status:'en cours',
      montant:this.montant(),
      montantRep : this.state.rep

    }
    fetch("http://localhost:63938/api/facture/",{
         
      method: 'POST',mode: 'cors',
      headers: {
      
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(resultat => {
        if(resultat.ok) this.refs.annuler.click();
        else alert("erreur !")
    })
}
componentDidUpdate(event){
  this.GetPannes(this.state.num);
}
  render(){

  
  return (<>
    
  <Box
    sx={{
      backgroundColor: 'background.default',
      minHeight: '100%',width:"50%", marginLeft:"20px",
      py: 3
    }}
  >
    <form
      autoComplete="off"
      noValidate
      
    >
      <Card>
        <CardHeader
          subheader="Entrer ces informations SVP"
          title="Nouvelle facture"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <FormControl variant="outlined" style={{width:"100%"}} >
                <InputLabel >Numéro du contrat</InputLabel>
                    <Select
                    label="Numéro du contrat"
                     labelId="c"
                     name="num"
                     
                     onChange={(event)=>{this.setState({num:parseInt(event.target.value)});}}
                    >
                    <MenuItem value="0"></MenuItem>
                    {this.state.reservation.map((res)=>(
                        <MenuItem value={res}>{res}</MenuItem>
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
                fullWidth
                type="date"
                label="Date de retour"
                name="date"
                onChange={(event) => {this.setState({date :  event.target.value}) }}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
              type="number"
                fullWidth
                label="km de retour"
                name="km"
                onChange={(event) =>{this.setState({km :  parseFloat(event.target.value)}) }}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <FormControl variant="outlined" style={{width:"100%"}} >
                <InputLabel >Niveau de Carburant</InputLabel>
                    <Select
                    label="Niveau de Carburant"
                     labelId="c"
                     id="c"
                        onChange={(event) => {this.setState({nCarburant:parseFloat(event.target.value)})} } 
                    >
                    <MenuItem value="">
                    </MenuItem>
                    <MenuItem value={"0"} >Vide</MenuItem>
                    <MenuItem value={"0.25"} >1/4</MenuItem>
                    <MenuItem value={"0.5"} >1/2</MenuItem>
                    <MenuItem value={"0.75"} >3/4</MenuItem>
                    < MenuItem  value={"1"}>Plein</MenuItem>
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
                label="Remarques"
                onChange={(event) => {this.setState({remarque :  event.target.value}) }}
                required
                variant="outlined"
                multiline={true}
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
                        <Card>
                  <CardHeader
                    subheader="les pannes commités par le locataire"
                    title="Les nouveaux pannes"
                  />
                  <Divider />
                  <CardContent>
                                <Table  >
                                    <TableHead><TableRow >
                                            <TableCell style={{textAlign:'center'}}>Code</TableCell>
                                            <TableCell style={{textAlign:'center'}}>Description</TableCell>
                                            <TableCell style={{textAlign:'center'}}>Catégorie</TableCell>
                                            
                                    </TableRow></TableHead>
                                    <TableBody>
                                            {this.state.pannes.map((panne) =>(
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
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
              type="number"
                fullWidth
                label="Prix de réparation"
                onChange={(event) =>{this.setState({rep :  parseFloat(event.target.value)}) ;}}
                required
                variant="outlined"
              />
            </Grid>
            
            
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
          <Button
            color="primary"
            variant="contained"
            onClick={() => {this.AddFacture()}}
          >
            Ajouter
          </Button>
          <Link
                    component={FactureList}
                    to="/app/facture"
                    hidden
                    ref='annuler'
                  >
                    Annuler
                  </Link>
          
       
          <Button
          onClick={(event)=>this.refs.annuler.click()}
            color="secondary"
            variant="contained"
          >
            Annuler
          </Button>
        </Box>
      </Card>
    </form>
    </Box>
    </>
  );}
};

export default AjouterFacture;
