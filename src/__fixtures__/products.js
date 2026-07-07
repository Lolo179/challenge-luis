export const mockProducts = [
  {
    id: '1',
    brand: 'Apple',
    model: 'iPhone 14',
    price: '999',
    imgUrl: 'https://example.com/1.jpg',
  },
  {
    id: '2',
    brand: 'Samsung',
    model: 'Galaxy S22',
    price: '899',
    imgUrl: 'https://example.com/2.jpg',
  },
  {
    id: '3',
    brand: 'Apple',
    model: 'iPad Pro',
    price: '1099',
    imgUrl: 'https://example.com/3.jpg',
  },
]

export const mockProductDetail = {
  id: '1',
  brand: 'Apple',
  model: 'iPhone 14',
  price: '999',
  imgUrl: 'https://example.com/1.jpg',
  cpu: 'A16 Bionic',
  ram: '6GB',
  os: 'iOS 16',
  displayResolution: '2532x1170',
  battery: '3279mAh',
  cameras: '12MP + 12MP',
  dimentions: '146.7 x 71.5 x 7.8 mm',
  weight: '172g',
  options: {
    storages: [
      { code: 1000, name: '128GB' },
      { code: 2000, name: '256GB' },
    ],
    colors: [
      { code: 1000, name: 'Black' },
      { code: 1001, name: 'White' },
    ],
  },
}
