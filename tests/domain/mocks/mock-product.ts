import { Product } from '@/domain/entity'

import { faker } from '@faker-js/faker'

export const mockProduct = (): Product => {
  return new Product(faker.datatype.uuid(), faker.datatype.string(), faker.datatype.number())
}