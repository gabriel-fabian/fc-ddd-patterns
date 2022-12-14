import { mockCustomer } from '@/tests/domain/mocks'
import { CustomerCreatedEvent } from '@/domain/event/customer'
import { SendSmsWhenCustomerIsCreatedHandler } from '@/domain/event/customer/handler'

describe('SendSmsWhenCustomerIsCreatedHandler', () => {
  it('should send sms to customer', () => {
    const spyConsole = jest.spyOn(console, 'log')

    const customer                    = mockCustomer()
    const customerCreatedEvent        = new CustomerCreatedEvent(customer)
    const customerCreatedEventHandler = new SendSmsWhenCustomerIsCreatedHandler()
    customerCreatedEventHandler.handle(customerCreatedEvent)

    expect(spyConsole).toHaveBeenCalledWith('Esse é o segundo console.log do evento: CustomerCreated')
  })
})
