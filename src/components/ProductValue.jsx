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

    this.onArrowUpClick = this.onArrowUpClick.bind(this);
    this.onArrowDownClick = this.onArrowDownClick.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  onArrowUpClick() {
    const { productId, value, onQuantityChange } = this.props;

    onQuantityChange(productId, parseInt(value, 10) + 1);
  }

  onArrowDownClick() {
    const { productId, value, onQuantityChange } = this.props;

    onQuantityChange(productId, parseInt(value, 10) - 1);
  }

  onValueChange(event) {
    const { productId, onQuantityChange } = this.props;

    onQuantityChange(productId, parseInt(event.target.value, 10));
  }

  render() {
    const { classes, value } = this.props;

    return (
      <Fragment>
        <IconButton aria-label="Down" onClick={this.onArrowDownClick}>
          <ArrowDropDown />
        </IconButton>
        <FormControl className={classes.formControl}>
          <TextField
            id="outlined-bare"
            className={classes.textField}
            value={value}
            margin="dense"
            variant="outlined"
            onChange={this.onValueChange}
          />
        </FormControl>
        <IconButton className={classes.button} aria-label="Up" onClick={this.onArrowUpClick}>
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
  onQuantityChange: PropTypes.func.isRequired
};

export default withStyles(styles)(ProductValue);
