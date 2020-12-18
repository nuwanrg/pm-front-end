import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SearchBox from "./searchBox";
import { green, red } from "@material-ui/core/colors";
import PropertyCard from "./common/propertyCard";

class Buy extends Component {
  useStyles = {
    root: {
      flexGrow: 20,
      color: red,
    },
    paper: {
      padding: 1,
      textAlign: "right",
      backgroundColor: "green",
    },
  };

  state = { test: "" };

  render() {
    const { searchQuery } = this.state;
    return (
      <div style={this.useStyles.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper style={(this.useStyles.paper, { backgroundColor: "red" })}>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper style={this.useStyles.paper}></Paper>
            <PropertyCard />
          </Grid>
          <Grid item xs={4}>
            <Paper style={this.useStyles.paper}>xs=6</Paper>
          </Grid>
          {/*           <Grid item xs={3}>
            <Paper className={this.useStyles.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={this.useStyles.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={this.useStyles.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={this.useStyles.paper}>xs=3</Paper>
          </Grid> */}
        </Grid>
      </div>
    );
  }
}
export default Buy;
