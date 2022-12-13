import { Address, Customer } from '@/domain/entity'
import { faker } from '@faker-js/faker'

export const mockCustomer = (): Customer => {
  const customer = new Customer(faker.datatype.uuid(), faker.name.firstName())
  const address  = new Address(
    faker.address.street(),
    faker.datatype.number(),
    faker.address.zipCode(),
    faker.address.city()
  )
  customer.changeAddress(address)

  return customer
}