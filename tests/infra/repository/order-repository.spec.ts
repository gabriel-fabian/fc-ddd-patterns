import { Sequelize } from 'sequelize-typescript'
import { Customer, Order, Product } from '@/domain/entity'
import { CustomerModel, OrderItemModel, OrderModel, ProductModel } from '@/infra/db/sequelize/model'
import { CustomerRepository, OrderRepository, ProductRepository } from '@/infra/repository'
import { mockCustomer, mockProduct, mockOrder } from '@/tests/domain/mocks'

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

const makeOrder = async (customer: Customer, product: Product): Promise<Order> => {
  const sut   = makeSut()
  const order = mockOrder(customer, product)
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
    const order     = await makeOrder(customer, product)
    const orderItem = order.items[0]

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
