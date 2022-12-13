import { Customer, Order, OrderItem, Product } from '@/domain/entity'
import { mockCustomer } from './mock-customer'
import { mockProduct } from './mock-product'

import { faker } from '@faker-js/faker'

export const mockOrderItem = (product: Product = mockProduct()): OrderItem => {
  return new OrderItem(
    faker.datatype.uuid(),
    product.name,
    product.price,
    product.id,
    faker.datatype.number()
  )
}

export const mockOrder = (
    customer: Customer = mockCustomer(),
    orderItems: OrderItem[] = [mockOrderItem()]
  ): Order => {
    return new Order(faker.datatype.uuid(), customer.id, orderItems)
}
