import {ProductsDao} from "../dao/products.dao.js";


class ProductsService{
    constructor(dao){
        this.dao=dao
    }

    async getAllProducts(filter = {}, config = {}) {
        return await this.dao.getAllProducts(filter, config)
    }

    async getProductById(id) {
        return await this.dao.getProductById(id);
    }

    async getProductByFilter(filter = {}) {
        return await this.dao.getProductByFilter(filter)
    }

    async addProduct(product) {
        await this.dao.addProduct(product);
        return await this.dao.getProductByFilter({ code: product.code })
    }

    async updateProduct(id, updatedFields) {
        productUpdated= await this.dao.updateProduct(id, { updatedFields });
        return await this.dao.getProductByFilter({ _id: productUpdated._id })
    }

    async deleteProduct(id) {
        return await this.dao.deleteProduct(id);
    }

}

export const productService = new ProductsService(ProductsDao)