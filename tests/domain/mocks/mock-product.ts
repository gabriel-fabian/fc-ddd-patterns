import { faker } from '@faker-js/faker'
import { Product } from '@/domain/entity'

export const mockProduct = (): Product => new Product(
  faker.datatype.uuid(),
  faker.datatype.string(),
  faker.datatype.number()
)
