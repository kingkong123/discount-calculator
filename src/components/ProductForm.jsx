import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { find as _find } from 'lodash';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import products from '../data/products.json';
import discounts from '../data/discounts.json';

import ProductValue from './ProductValue';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

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
        // console.log();
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
    const {
      classes
    } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <Grid container spacing={16} alignItems="center" alignContent="center">
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
                <Grid item xs={4}>{product.name}</Grid>
                <Grid item xs={4}>
                  <ProductValue
                    productId={product.id}
                    value={quantities[product.id]}
                    onQuantityChange={this.onQuantityChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  $
                  {product.price}
                </Grid>
              </Fragment>
            ))
          }

          <Grid item xs={8}>
            Total:
            &nbsp;
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
