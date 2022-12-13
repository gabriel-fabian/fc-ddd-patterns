import { Order, OrderItem } from '@/domain/entity'
import { OrderItemModel, OrderModel } from '@/infra/db/sequelize/model'

export default class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customer_id,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.product_id,
        quantity: item.quantity
      }))
    },
    {
      include: [{ model: OrderItemModel }]
    })
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update({
      id: entity.id,
      customer_id: entity.customer_id,
      total: entity.total()
    }, {
      where: {
        id: entity.id
      }
    })

    entity.items.map((item) => {
      OrderItemModel.upsert({
        id: item.id,
        name: item.name,
        order_id: entity.id,
        price: item.price,
        product_id: item.product_id,
        quantity: item.quantity
      })
    })
  }

  async find(id: string): Promise<Order> {
    const orderModel: OrderModel = await (await OrderModel.findOne({ where: { id }, include: ['items']})).toJSON()

    const orderItems = orderModel.items.map((item) => {
      return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
    })

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderItems
    )
  }
}