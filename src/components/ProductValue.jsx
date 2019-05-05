import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';

import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import styles from '../styles/productValueStyle';

class ProductValue extends PureComponent {
  constructor(props) {
    super(props);

    this.handleArrowUpClick = this.handleArrowUpClick.bind(this);
    this.handleArrowDownClick = this.handleArrowDownClick.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleArrowUpClick() {
    const { productId, value, handleItemChange } = this.props;

    handleItemChange(productId, parseInt(value, 10) + 1);
  }

  handleArrowDownClick() {
    const { productId, value, handleItemChange } = this.props;

    handleItemChange(productId, parseInt(value, 10) - 1);
  }

  handleValueChange(event) {
    const { productId, handleItemChange } = this.props;

    handleItemChange(productId, parseInt(event.target.value, 10));
  }

  render() {
    const { classes, value } = this.props;

    return (
      <Fragment>
        <IconButton aria-label="Down" onClick={this.handleArrowDownClick}>
          <ArrowDropDown />
        </IconButton>
        <FormControl className={classes.formControl}>
          <TextField
            id="outlined-bare"
            className={classes.textField}
            value={value}
            margin="dense"
            variant="outlined"
            onChange={this.handleValueChange}
          />
        </FormControl>
        <IconButton className={classes.button} aria-label="Up" onClick={this.handleArrowUpClick}>
          <ArrowDropUp />
        </IconButton>
      </Fragment>
    );
  }
}

ProductValue.propTypes = {
  classes: PropTypes.object.isRequired,
  productId: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  handleItemChange: PropTypes.func.isRequired
};

export default withStyles(styles)(ProductValue);
