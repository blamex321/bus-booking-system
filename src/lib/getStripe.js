import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51N2Z2dSA6f1HGrBbTfa4jN4y57omYLXnt13OfQbeJeIyN8SeAoIFyB24a8fRfHJKj3ACOie9ZeDjOxiw0SMMKBYv002KHg9E6p");
  }
  return stripePromise;
};


export default getStripe;