import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../src/infra/db/sequelize/model/product'
import Product from '../../../src/domain/entity/product'
import ProductRepository from '../../../src/infra/repository/product-repository'

describe('ProductRepository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 100)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: '1' }})
    expect(productModel?.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100
    })
  })

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 100)

    await productRepository.create(product)

    product.changeName('New Product')
    product.changePrice(200)

    await productRepository.update(product)

    const productModel = await ProductModel.findOne({ where: { id: '1' }})

    expect(productModel?.toJSON()).toStrictEqual({
      id: '1',
      name: 'New Product',
      price: 200
    })
  })
})