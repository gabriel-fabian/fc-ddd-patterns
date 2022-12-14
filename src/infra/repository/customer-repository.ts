import { Address, Customer } from '@/domain/entity'
import { CustomerRepositoryInterface } from '@/domain/repository'
import { CustomerModel } from '@/infra/db/sequelize/model'

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create (entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipCode: entity.address.zipCode,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    })
  }

  async update (entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      number: entity.address.number,
      zipCode: entity.address.zipCode,
      city: entity.address.city
    }, {
      where: {
        id: entity.id
      }
    })
  }

  async find (id: string): Promise<Customer> {
    let customerModel

    try {
      customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true })
    } catch (error) {
      throw new Error('Customer not found')
    }

    const customer = new Customer(customerModel.id, customerModel.name)
    const address  = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.city,
      customerModel.zipCode
    )
    customer.changeAddress(address)

    return customer
  }

  async findAll (): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll()

    const customers = customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name)
      customer.addRewardPoints(customerModel.rewardPoints)
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.city,
        customerModel.zipCode
      )
      customer.changeAddress(address)
      if (customerModel.active) {
        customer.activate()
      }
      return customer
    })

    return customers
  }
}
