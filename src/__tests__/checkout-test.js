import products from '../data/products.json';
import discounts from '../data/discounts.json';
import { checkout } from '../util/checkout';

const testCases = [
  {
    customer: 'default ID',
    items: [
      { id: 'classic', value: 1 },
      { id: 'standout', value: 1 },
      { id: 'premium', value: 1 }
    ],
    expectedResult: {
      total: '987.97',
      subTotal: '987.97',
      discount: '0.00'
    }
  },
  {
    customer: 'UNILEVER',
    items: [
      { id: 'classic', value: 3 },
      { id: 'premium', value: 1 }
    ],
    expectedResult: {
      total: '934.97',
      subTotal: '1204.96',
      discount: '269.99'
    }
  },
  {
    customer: 'APPLE',
    items: [
      { id: 'standout', value: 3 },
      { id: 'premium', value: 1 }
    ],
    expectedResult: {
      total: '1294.96',
      subTotal: '1363.96',
      discount: '69.00'
    }
  },
  {
    customer: 'NIKE',
    items: [
      { id: 'premium', value: 4 }
    ],
    expectedResult: {
      total: '1519.96',
      subTotal: '1579.96',
      discount: '60.00'
    }
  }
];

it('checkout function', async () => {
  await Promise.all(testCases.map(async (data) => {
    const { customer, items, expectedResult } = data;

    await expect(checkout(customer, items, products, discounts)).toEqual(expectedResult);
  }));
});
