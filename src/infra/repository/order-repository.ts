import Order from '../../domain/entity/order'
import OrderItemModel from '../../infra/db/sequelize/model/order-item'
import OrderModel from '../db/sequelize/model/order'

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
}