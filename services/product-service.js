const ProductRepository = require("../database/repository/product-repository");
const { FormatData } = require("../utils");

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  async CreateProduct(productInputs) {
    try {
      const productResult = await this.repository.CreateProduct(productInputs);
      return FormatData(productResult);
    } catch (err) {
      console.error('Error in CreateProduct service:', err);
      throw err;
    }
  }

  async GetProducts() {
    try {
      const products = await this.repository.Products();

      let categories = {};

      products.map(({ type }) => {
        categories[type] = type;
      });

      return FormatData({
        products,
        categories: Object.keys(categories),
      });
    } catch (err) {
      console.error('Error in GetProducts service:', err);
      throw err;
    }
  }

  async UpdateProduct(productId, updatedData) {
    try {
      const updatedProduct = await this.repository.UpdateProduct(productId, updatedData);
      return FormatData(updatedProduct);
    } catch (err) {
      console.error('Error in UpdateProduct service:', err);
      throw err;
    }
  }

  async GetProductDescription(productId) {
    try {
      const product = await this.repository.FindById(productId);
      return FormatData(product);
    } catch (err) {
      console.error('Error in GetProductDescription service:', err);
      throw err;
    }
  }

  async GetProductsByCategory(category) {
    try {
      const products = await this.repository.FindByCategory(category);
      return FormatData(products);
    } catch (err) {
      console.error('Error in GetProductsByCategory service:', err);
      throw err;
    }
  }

  async GetSelectedProducts(selectedIds) {
    try {
      const products = await this.repository.FindSelectedProducts(selectedIds);
      return FormatData(products);
    } catch (err) {
      console.error('Error in GetSelectedProducts service:', err);
      throw err;
    }
  }

  async GetProductPayload(userId, { productId, amount }, event) {
    try {
      const product = await this.repository.FindById(productId);
      console.log("FROM PRODUCT PAYLOAD TO BE SENT?????????", product);

      if (product) {
        const payload = {
          event: event,
          data: { userId, product, amount },
        };

        return FormatData(payload);
      } else {
        return FormatData({ error: "No product Available" });
      }
    } catch (err) {
      console.error('Error in GetProductPayload service:', err);
      throw err;
    }
  }

  async reduceStock(data) {
    try {
      console.log('REDUCING STOCK??????')
      for (let i = 0; i < data.length; i++) {
        const product = await this.repository.FindById(data[i].productId);
        product.stock = product.stock - data[i].productAmountBought;
        if (product.stock === 0) {
          product.available = false;
        }
        await product.save()
      }
    } catch (err) {
      console.error('Error in reduceStock service:', err);
      throw err;
    }
  }

  async SubscribeEvents(payload) {
    try {
      payload = JSON.parse(payload);
      console.log("PAYLOAD IN SUBSCRIBING TO PRODUCT SERVICE");
      console.log(payload);
      const { event, data } = payload;

      switch (event) {
        case "REDUCE_PRODUCT_STOCK":
          this.reduceStock(data);
          break;
      }
    } catch (err) {
      console.error('Error in SubscribeEvents service:', err);
      throw err;
    }
  }
}

module.exports = ProductService;
