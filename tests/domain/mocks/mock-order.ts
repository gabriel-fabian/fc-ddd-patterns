import { Customer, Order, OrderItem, Product } from '@/domain/entity'
import { mockCustomer } from './mock-customer'
import { mockProduct } from './mock-product'

import { faker } from '@faker-js/faker'

export const mockOrder = (customer: Customer = mockCustomer(), product: Product = mockProduct() ): Order => {
  const orderItem = new OrderItem(
    faker.datatype.uuid(),
    product.name,
    product.price,
    product.id,
    faker.datatype.number()
  )

  return new Order(faker.datatype.uuid(), customer.id, [orderItem])
}
