import { Sequelize } from 'sequelize-typescript'
import Address from '../../../src/domain/entity/address'
import Customer from '../../../src/domain/entity/customer'
import CustomerModel from '../../../src/infra/db/sequelize/model/customer'
import CustomerRepository from '../../../src/infra/repository/customer-repository'
import Order from '../../../src/domain/entity/order'
import OrderItem from '../../../src/domain/entity/order-item'
import OrderItemModel from '../../../src/infra/db/sequelize/model/order-item'
import OrderModel from '../../../src/infra/db/sequelize/model/order'
import OrderRepository from '../../../src/infra/repository/order-repository'
import Product from '../../../src/domain/entity/product'
import ProductModel from '../../../src/infra/db/sequelize/model/product'
import ProductRepository from '../../../src/infra/repository/product-repository'

describe('OrderRepository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer           = new Customer('123', 'customer 1')
    const address            = new Address('Street 1', 1, 'City 1', 'ZipCode 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product           = new Product('123', 'product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const order = new Order('123', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel?.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123'
        }
      ]
    })
  })
})