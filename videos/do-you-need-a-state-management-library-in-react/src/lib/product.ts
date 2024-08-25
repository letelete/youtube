export interface Product {
  id: string;
  name: string;
  price: string;
  thumbnail: {
    src: string;
    alt: string;
  };
}

export const products = [
  {
    id: '1',
    name: 'Brand new thing',
    price: '8.55$',
    thumbnail: {
      src: 'https://m.media-amazon.com/images/I/51VkwBCSCsL._AC_SL1500_.jpg',
      alt: ' Mechanical Kitchen Timer, Cute Animal Timer for Kids, Wind Up 60 Minutes Manual Countdown Timer for Classroom, Home, Study and Cooking (Beige Wolf)',
    },
  },
];
