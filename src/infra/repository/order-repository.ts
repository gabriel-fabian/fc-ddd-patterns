import { Order } from '@/domain/entity'
import { OrderItemModel, OrderModel } from '@/infra/db/sequelize/model'
import { OrderItem } from 'sequelize'

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
}