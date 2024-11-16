import {ProductsDao} from "../dao/products.dao.js";


class ProductsService{
    constructor(dao){
        this.dao=dao
    }

    async getAllProducts(filter = {}, config = {}) {
        return await this.dao.getAll(filter, config)
    }

    async getProductById(id) {
        return await this.dao.findById(id);
    }

    async getProductByFilter(filter = {}) {
        return await this.dao.findOne(filter)
    }

    async addProduct(product) {
        return await this.dao.create(product);

    }

    async updateProduct(id, updatedFields) {
        return await this.dao.findByIdAndUpdate(id, { $set: updatedFields });
    }

    async deleteProduct(id) {
        return await this.dao.findByIdAndDelete(id);
    }

}

export const productService = new ProductsService(ProductsDao)