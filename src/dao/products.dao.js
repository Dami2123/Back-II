import productModel from './models/product.model.js'

export class ProductsDao {
    
    static async getAllProducts(filter = {}, config = {}) {
        return await productModel.paginate(filter, config)
    }

    static async getProductById(id) {
        return await productModel.findById(id).lean();
    }

    static async getProductByFilter(filter = {}) {
        return await productModel.findOne(filter)
    }

    static async addProduct(product) {
        return await productModel.create(product);

    }

    static async updateProduct(id, updatedFields) {
        return await productModel.findByIdAndUpdate(id, { $set: updatedFields });
    }

    static async deleteProduct(id) {
        return await productModel.findByIdAndDelete(id);
    }
}