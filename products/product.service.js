const bcrypt = require('bcryptjs');
const db = require('_helpers/db');


module.exports ={
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Product.findAll();
}

async function getById(id) {
    return await getProduct(id);

}

async function create(params) {
    if (await db.Product.findOne({ where: { name: params.name } })) {
        throw 'name "'+ params.name +'" is already registered';
    }

    const product = new db.Product(params);

    await product.save();
}

async function update(id, params) {
    const product = await getProduct(id);

    const nameChanged = params.name && product.name !== params.name;
    if (nameChanged && await db.Product.findOne({ where: { name: params.name } })) {
        throw ' name "'+ params.name +'" is already taken';

    }

    Object.assign(product, params);
    await product.save();
}

async function _delete(id) {
    const product = await getProduct(id);
    await product.destroy();
}

async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Product not found';
    return product;
}