import { Customer, Order, OrderItem, Product } from '@/domain/entity'
import { CustomerModel, OrderItemModel, OrderModel, ProductModel } from '@/infra/db/sequelize/model'
import { CustomerRepository, OrderRepository, ProductRepository } from '@/infra/repository'
import { mockCustomer, mockProduct, mockOrder, mockOrderItem } from '@/tests/domain/mocks'

import { Sequelize } from 'sequelize-typescript'
import { faker } from '@faker-js/faker'

const makeSut = (): OrderRepository => new OrderRepository()

const makeCustomer = async (): Promise<Customer> => {
  const customerRepository = new CustomerRepository()
  const customer = mockCustomer()
  await customerRepository.create(customer)
  return customer
}

const makeProduct = async (): Promise<Product> => {
  const productRepository = new ProductRepository()
  const product = mockProduct()
  await productRepository.create(product)
  return product
}

const makeOrder = async (customer: Customer, orderItems: OrderItem[]): Promise<Order> => {
  const sut   = makeSut()
  const order = mockOrder(customer, orderItems)
  await sut.create(order)
  return order
}

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
    const customer  = await makeCustomer()
    const product   = await makeProduct()
    const orderItem = mockOrderItem(product)
    const order     = await makeOrder(customer, [orderItem])

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

  it('should update an order', async () => {
    const customer   = await makeCustomer()
    const product    = await makeProduct()
    const orderItem  = mockOrderItem(product)
    const order      = await makeOrder(customer, [orderItem])
    const product2   = await makeProduct()
    const orderItem2 = mockOrderItem(product2)

    order.addItem(orderItem2)
    const sut = makeSut()
    await sut.update(order)

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items']})

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
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order.id,
          product_id: product2.id
        }
      ]
    })
  })

  it('should find an order', async () => {
    const sut         = makeSut()
    const product     = await makeProduct()
    const customer    = await makeCustomer()
    const orderItem   = mockOrderItem(product)
    const order       = await makeOrder(customer, [orderItem])
    const orderResult = await sut.find(order.id)

    expect(order).toStrictEqual(orderResult)
  })
})
