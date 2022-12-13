import { Sequelize } from 'sequelize-typescript'
import { Order, OrderItem, Product } from '@/domain/entity'
import { CustomerModel, OrderItemModel, OrderModel, ProductModel } from '@/infra/db/sequelize/model'
import { CustomerRepository, OrderRepository, ProductRepository } from '@/infra/repository'
import { mockCustomer } from '@/tests/domain/mocks'

import { faker } from '@faker-js/faker'

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
    const customer           = mockCustomer()
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product           = new Product(faker.datatype.uuid(), faker.datatype.string(), faker.datatype.number())
    await productRepository.create(product)

    const orderItem = new OrderItem(
      faker.datatype.uuid(),
      product.name,
      product.price,
      product.id,
      faker.datatype.number()
    )

    const order = new Order(faker.datatype.uuid(), customer.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id
        }
      ]
    })
  })
})