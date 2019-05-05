import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { find as _find } from 'lodash';

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

import styles from '../styles/productFormStyle';
import ProductValue from './ProductValue';

const customers = [
  {
    name: 'Customer A',
    id: 'CUSTOMERA'
  },
  {
    name: 'Unilever',
    id: 'UNILEVER'
  },
  {
    name: 'Apple',
    id: 'APPLE'
  },
  {
    name: 'Nike',
    id: 'NIKE'
  },
  {
    name: 'Ford',
    id: 'FORD'
  }
];

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.onCustomerChange = this.onCustomerChange.bind(this);
    this.onQuantityChange = this.onQuantityChange.bind(this);

    this.state = this.getInitState();
  }

  componentDidMount() {

  }

  onCustomerChange(event) {
    this.setState({ customer: event.target.value });
  }

  onQuantityChange(id, value) {
    const { quantities } = this.state;

    quantities[id] = (value >= 0) ? value : 0;
    this.setState({ quantities });
  }

  getInitState() {
    const state = {
      customer: '',
      quantities: {}
    };

    products.forEach((p) => {
      state.quantities[p.id] = 0;
    });

    return state;
  }

  get subTotal() {
    let total = 0;
    const { quantities } = this.state;

    products.forEach((p) => {
      if (quantities[p.id] && quantities[p.id] > 0) {
        total += p.price * quantities[p.id];
      }
    });

    return total.toFixed(2);
  }

  get discounts() {
    let rawTotal = 0;
    const { quantities } = this.state;

    products.forEach((p) => {
      if (quantities[p.id] && quantities[p.id] > 0) {
        rawTotal += p.price * quantities[p.id];
      }
    });

    if (rawTotal > this.total) {
      return (rawTotal - this.total).toFixed(2);
    }

    return 0;
  }

  get total() {
    let total = 0;
    const { customer, quantities } = this.state;

    products.forEach((p) => {
      if (quantities[p.id] && quantities[p.id] > 0) {
        const discount = _find(discounts, { customer, adType: p.id });

        if (discount) {
          total += this.calculateDiscount(discount, quantities[p.id], p.price);
        } else {
          total += p.price * quantities[p.id];
        }
      }
    });

    return total.toFixed(2);
  }

  xForYDiscount(quantity, price, x, y) {
    if (quantity >= x) {
      const remain = quantity % x;
      const discountedQty = quantity - remain;

      return (discountedQty / x * y * price) + (remain * price);
    }

    return (quantity * price);
  }

  calculateDiscount(discount, quantity, originalPrice) {
    const { min, price, discountType } = discount;

    switch (discountType) {
      case '3for2':
        return this.xForYDiscount(quantity, originalPrice, 3, 2);

      case '5for4':
        return this.xForYDiscount(quantity, originalPrice, 5, 4);

      case 'priceCut':
        if (min && price) {
          if (quantity >= min) {
            return quantity * price;
          }
        } else if (price) {
          return quantity * price;
        }
        break;

      default:
    }

    return quantity * originalPrice;
  }

  render() {
    const {
      customer, quantities
    } = this.state;
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <Grid className={classes.formBody} container spacing={16} alignItems="center" alignContent="center">
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Customer</InputLabel>
              <Select
                value={customer}
                onChange={this.onCustomerChange}
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
                    value={quantities[product.id]}
                    onQuantityChange={this.onQuantityChange}
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
            {this.subTotal}
          </Grid>
        </Grid>
        {this.discounts > 0
          && (
            <Grid container spacing={16} alignItems="center" justify="flex-end">
              <Grid item xs={6} md={2}>
                <Typography className={classes.boldText} variant="body1">
                  Discounts:
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                - $
                {this.discounts}
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
            {this.total}
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
