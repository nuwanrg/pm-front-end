import React from "react";
import './searchBoxComponent.css';
import Tab from "@material-ui/core/Tab";
import Tabs from "react-bootstrap/Tabs";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import * as classes from "react-dom/test-utils";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    card: {
        background: 'linear-gradient(45deg, #FF8E53 30%, #fae3d7 90%)'

}
}));

function SearchBoxComponent() {

    const classes = useStyles();

    return (
        <div className="wrapper wrapper--w900">
            <div className="card card-4">
                <div className={classes.card} >
                    < Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab className="search-tab" eventKey="home" title="Buy">
                            <Paper component="form" className={classes.root}>
                                <IconButton className={classes.iconButton} aria-label="menu">
                                    <MenuIcon/>
                                </IconButton>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Type or Select Location"
                                    inputProps={{'aria-label': 'Type or Select Location'}}
                                />
                                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                    <SearchIcon/>
                                </IconButton>
                            </Paper>
                        </Tab>
                        <Tab eventKey="profile" title="Rent">
                            <Paper component="form" className={classes.root}>
                                <IconButton className={classes.iconButton} aria-label="menu">
                                    <MenuIcon/>
                                </IconButton>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Type or Select Location"
                                    inputProps={{'aria-label': 'Type or Select Location'}}
                                />
                                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                    <SearchIcon/>
                                </IconButton>
                            </Paper>
                        </Tab>
                    </Tabs>
                    <div className="tab-content">
                    </div>
                </div>
            </div>
        </div>);
}

export default SearchBoxComponent;