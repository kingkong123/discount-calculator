import { find as _find } from 'lodash';

const xForYDiscount = (quantity, price, x, y) => {
  if (quantity >= x) {
    const remain = quantity % x;
    const discountedQty = quantity - remain;

    return (discountedQty / x * y * price) + (remain * price);
  }

  return (quantity * price);
};

const priceCut = (originalPrice, min, price, quantity) => {
  if (min && price) {
    if (quantity >= min) {
      return quantity * price;
    }
  } else if (price) {
    return quantity * price;
  }

  return quantity * originalPrice;
};

const getDiscountedTotal = (discount, quantity, originalPrice) => {
  const { min, price, discountType } = discount;

  switch (discountType) {
    case '3for2':
      return xForYDiscount(quantity, originalPrice, 3, 2);

    case '5for4':
      return xForYDiscount(quantity, originalPrice, 5, 4);

    case 'priceCut':
      return priceCut(originalPrice, min, price, quantity);

    default:
  }

  return quantity * originalPrice;
};

const checkout = (customer, items, products, discounts) => {
  let total = 0;
  let subTotal = 0;

  products.forEach((p) => {
    const item = _find(items, { id: p.id });
    if (item && item.value > 0) {
      const discount = _find(discounts, { customer, adType: p.id });

      if (discount) {
        total += getDiscountedTotal(discount, item.value, p.price);
      } else {
        total += p.price * item.value;
      }

      subTotal += p.price * item.value;
    }
  });

  return {
    total: total.toFixed(2),
    subTotal: subTotal.toFixed(2),
    discount: (subTotal - total).toFixed(2)
  };
};

export { checkout, getDiscountedTotal };
