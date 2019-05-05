import React from 'react';

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
    flexWrap: 'wrap'
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <ProductForm />
  </MuiThemeProvider>
);

export default withStyles(styles)(App);
