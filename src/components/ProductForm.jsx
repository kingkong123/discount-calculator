import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { find as _find, indexOf as _indexOf } from 'lodash';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import products from '../data/products.json';
import discounts from '../data/discounts.json';
import customers from '../data/mockCustomers.json';

import styles from '../styles/productFormStyle';
import ProductValue from './ProductValue';

import { checkout } from '../util/checkout';

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);

    this.state = this.getInitState();
  }

  componentDidMount() {

  }

  getInitState() {
    return {
      customer: '',
      items: []
    };
  }

  getQuantityById(id) {
    const { items } = this.state;

    const item = _find(items, { id });

    if (item) {
      return item.value;
    }

    return 0;
  }

  handleCustomerChange(event) {
    this.setState({ customer: event.target.value });
  }

  handleItemChange(id, value) {
    const { items } = this.state;

    const item = _find(items, { id });

    if (item) {
      const index = _indexOf(items, item);
      items.splice(index, 1, { id, value });
    } else {
      items.push({ id, value });
    }

    this.setState({ items });
  }

  render() {
    const {
      customer, items
    } = this.state;
    const { classes } = this.props;

    const { total, subTotal, discount } = checkout(customer, items, products, discounts);

    return (
      <form className={classes.root} autoComplete="off">
        <Grid className={classes.formBody} container spacing={16} alignItems="center" alignContent="center">
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Customer</InputLabel>
              <Select
                value={customer}
                onChange={this.handleCustomerChange}
                inputProps={{
                  name: 'customer',
                  id: 'customer-id'
                }}
              >
                {
                  customers.map(c => (<MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>))
                }
              </Select>
            </FormControl>
          </Grid>

          {
            products.map(product => (
              <Fragment key={product.id}>
                <Grid item xs={12} md={5}>
                  <Typography className={classes.boldText} variant="body1" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="subtitle2">
                    {product.description}
                  </Typography>
                </Grid>
                <Grid className={classes.productValueContainer} item xs={6} md={3}>
                  <ProductValue
                    productId={product.id}
                    value={this.getQuantityById(product.id)}
                    handleItemChange={this.handleItemChange}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  $
                  {product.price}
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Fragment>
            ))
          }
        </Grid>

        <Grid className={classes.formTotal} container spacing={16} alignItems="center" justify="flex-end">
          <Grid item xs={6} md={2}>
            <Typography className={classes.boldText} variant="body1">
              Sub-Total:
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            $
            {subTotal}
          </Grid>
        </Grid>
        {discount > 0
          && (
            <Grid container spacing={16} alignItems="center" justify="flex-end">
              <Grid item xs={6} md={2}>
                <Typography className={classes.boldText} variant="body1">
                  Discount:
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                - $
                {discount}
              </Grid>
            </Grid>
          )
        }
        <Grid container spacing={16} alignItems="center" justify="flex-end">
          <Grid item xs={6} md={2}>
            <Typography className={classes.boldText} variant="body1">
              Total:
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            $
            {total}
          </Grid>
        </Grid>
      </form>
    );
  }
}

ProductForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductForm);
