import React from 'react';
import PropTypes from 'prop-types';

import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import ProductForm from './components/ProductForm';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '8px 16px'
  }
});

const App = (props) => {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <ProductForm />
      </div>
    </MuiThemeProvider>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
