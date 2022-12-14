import { mockCustomer } from '@/tests/domain/mocks'
import { CustomerCreatedEvent } from '@/domain/event/customer'
import { SendEmailWhenCustomerIsCreatedHandler } from '@/domain/event/customer/handler'

describe('SendEmailWhenCustomerIsCreatedHandler', () => {
  it('should send email to customer', () => {
    const spyConsole = jest.spyOn(console, 'log')

    const customer                    = mockCustomer()
    const customerCreatedEvent        = new CustomerCreatedEvent(customer)
    const customerCreatedEventHandler = new SendEmailWhenCustomerIsCreatedHandler()
    customerCreatedEventHandler.handle(customerCreatedEvent)

    expect(spyConsole).toHaveBeenCalledWith('Esse é o primeiro console.log do evento: CustomerCreated')
  })
})
