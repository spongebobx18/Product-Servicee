const sequelize = require('./connection');
const Product = require('./models/Product');

const products = [
  {
    name: 'Samsung Galaxy S23',
    desc: '6.1-inch AMOLED display, Snapdragon 8 Gen 2, 128GB storage',
    img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
    type: 'Electronics',
    stock: 30,
    price: 899.99,
    available: true,
    seller: 1
  },
  {
    name: 'Bose QuietComfort 45',
    desc: 'Wireless noise-cancelling headphones with 24-hour battery life',
    img: 'https://images.unsplash.com/photo-1606327053524-60f5f4afdb9d?w=500',
    type: 'Electronics',
    stock: 40,
    price: 329.99,
    available: true,
    seller: 1
  },
  {
    name: 'Adidas Ultraboost 22',
    desc: 'Performance running shoes with responsive cushioning',
    img: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500',
    type: 'Fashion',
    stock: 50,
    price: 179.99,
    available: true,
    seller: 2
  },
  {
    name: 'Ray-Ban Aviator Sunglasses',
    desc: 'Classic gold frame with polarized lenses',
    img: 'https://images.unsplash.com/photo-1578317843199-190dba59bf6e?w=500',
    type: 'Fashion',
    stock: 80,
    price: 149.99,
    available: true,
    seller: 2
  },
  {
    name: 'Nespresso Vertuo Plus',
    desc: 'Single-serve coffee and espresso maker',
    img: 'https://images.unsplash.com/photo-1586503568985-6a0896880f23?w=500',
    type: 'Home and Kitchen',
    stock: 25,
    price: 199.99,
    available: true,
    seller: 3
  },
  {
    name: 'Roomba i7 Robot Vacuum',
    desc: 'Smart vacuum with auto-empty bin feature',
    img: 'https://images.unsplash.com/photo-1574096829197-447f2b70b812?w=500',
    type: 'Home and Kitchen',
    stock: 15,
    price: 599.99,
    available: true,
    seller: 3
  },
  {
    name: 'Dyson Supersonic Hair Dryer',
    desc: 'Fast-drying with intelligent heat control',
    img: 'https://images.unsplash.com/photo-1605380640383-558f55f0472b?w=500',
    type: 'Beauty and Cosmetics',
    stock: 20,
    price: 399.99,
    available: true,
    seller: 4
  },
  {
    name: 'The Ordinary Skincare Set',
    desc: 'Hyaluronic acid, niacinamide, and vitamin C serum',
    img: 'https://images.unsplash.com/photo-1626015365107-232281d796ed?w=500',
    type: 'Beauty and Cosmetics',
    stock: 60,
    price: 49.99,
    available: true,
    seller: 4
  },
  {
    name: 'PlayStation 5',
    desc: 'Next-gen gaming console with ultra-fast SSD',
    img: 'https://images.unsplash.com/photo-1606146481135-6a5d91b0561f?w=500',
    type: 'Electronics',
    stock: 20,
    price: 499.99,
    available: true,
    seller: 1
  },
  {
    name: 'Garmin Forerunner 945',
    desc: 'GPS running smartwatch with music and training insights',
    img: 'https://images.unsplash.com/photo-1603794191471-312677a885e2?w=500',
    type: 'Sports and Outdoors',
    stock: 25,
    price: 499.99,
    available: true,
    seller: 5
  },
  {
    name: 'Theragun Elite Massage Gun',
    desc: 'Deep muscle treatment for recovery and relaxation',
    img: 'https://images.unsplash.com/photo-1622099766360-412c994d7153?w=500',
    type: 'Sports and Outdoors',
    stock: 30,
    price: 399.99,
    available: true,
    seller: 5
  }
];

const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.destroy({ where: {} });
    console.log('Cleared existing products');

    // Insert new products
    await Product.bulkCreate(products);
    console.log('Products seeded successfully!');

    // Close the connection
    await sequelize.close();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Run the seed function
seedProducts();
