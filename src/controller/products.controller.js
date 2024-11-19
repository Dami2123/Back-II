import { productService as products} from "../services/products.service.js";


export const getAllProductsController= async (req, res) => {
    try {
        
        const products = await getAllProducts(req.query)
        if(products.hasPrevPage)products.prevLink=`http://localhost:8080/api/products`+products.prevLink;
        if(products.hasNextPage)products.nextLink=`http://localhost:8080/api/products`+products.nextLink;

        res.json(products)

    } catch (error) {
        console.log(error);
    }
}

export const getProductByIdController= async (req, res) => {
    try {
        const productId = req.params.pid

        const product = await products.getProductById(productId)

        if (product) {
                res.json(product)
        } else {
                res.status(404).json({ error: 'No se encontró el producto' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({status:"error", error: error});
    }
}

export const addProductController= async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails' });
        }

        const newProduct = await products.addProduct({ title, description, code, price, stock, category, thumbnails })
        if (newProduct===11000) {
            return res.status(400).json({ error: `Ya existe un producto con code: ${code}` });
        }
        res.status(201).json({ response:"Success", createdProduct:newProduct})
    } catch (error) {
        console.log(error);
    }}

    export const updateProductController= async (req, res) => {
        try {
            const productId = req.params.pid;
        
            const updateProduct = await products.updateProduct(productId, req.body);
            if (!updateProduct) {
               return res.status(404).json({ error: 'Producto no encontrado' });
            } 
         
            if (updateProduct===11000) {
                return res.status(400).json({ error: `El código ingresado ya existe para un producto distinto al del id ingresado`  });
             } 
             res.status(201).json({ response:"Success", updatedProduct:updateProduct})
           
    
        } catch (error) {
            console.log(error);
        }
    }


    export const deletedProductController= async (req, res) => {
        try {
            const productId = req.params.pid
    
            const deletedProduct = await products.deleteProduct(productId)
            if (deletedProduct) {
                res.json({ response:"Success", productDeleted:deletedProduct})
            } else {
                res.status(404).json({ error: 'Producto no encontrado' });
            }
    
        } catch (error) {
            console.log(error);
        }
    }



// Funciones

    const getAllProducts= async ({ limit, page, category, stock, sort }) =>{
        const filter = {};
        const config = { lean: true };
        const result = {}

        if (category) filter.category = category;
        if (stock && stock === "true") filter.stock = { $gt: 0 };
        if (stock && stock === "false") filter.stock = { $eq: 0 };

        
        config.limit = !limit || parseInt(limit) <= 0 ? 10 : parseInt(limit);
        config.page = !page || parseInt(page) <= 0 ? 1 : parseInt(page);
        if (sort === "desc") config.sort = { price: -1 };
        if (sort === "asc") config.sort = { price: 1 };

        try {
            const response = await products.getAllProducts(filter, config)

            result.status = "Success"
            result.payload = response.docs
            result.totalPages = response.totalPages
            result.prevPage = response.prevPage
            result.nextPage = response.nextPage
            result.page = response.page
            result.hasPrevPage = response.hasPrevPage
            result.hasNextPage = response.hasNextPage

            if (response.hasPrevPage) {
                let prevUrl = `?page=${response.prevPage}`
                if (config.limit != 10) prevUrl += `&limit=${config.limit}`;
                if (filter.category) prevUrl += `&category=${category}`;
                if (filter.stock) prevUrl += `&stock=${stock}`;
                if (config.sort) prevUrl += `&sort=${sort}`;
                result.prevLink = prevUrl
            } else {
                result.prevLink = null
            }


            if (response.hasNextPage) {
                let nextUrl = `?page=${response.nextPage}`
                if (config.limit != 10) nextUrl += `&limit=${config.limit}`;
                if (filter.category) nextUrl += `&category=${category}`;
                if (filter.stock) nextUrl += `&stock=${stock}`;
                if (config.sort) nextUrl += `&sort=${sort}`;
                result.nextLink = nextUrl
            } else {
                result.nextLink = null
            }

            return result

        } catch (error) {
            console.error(error)
        }
    }
