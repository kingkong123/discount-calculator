const styles = theme => ({
  formControl: {
    margin: 0
  },
  textField: {
    margin: 0,
    width: 64,
    [theme.breakpoints.down('md')]: {
      width: 48
    }
  }
});

export default styles;
