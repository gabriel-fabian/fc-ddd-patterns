import { EventHandlerInterface } from '@/domain/event/@shared'
import { CustomerAddressChangedEvent } from '@/domain/event/customer'

export default class SendSmsWhenCustomerIsCreatedHandler
implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handle (event: CustomerAddressChangedEvent): void {
    // eslint-disable-next-line no-console
    console.log('Esse é o segundo console.log do evento: CustomerCreated')
  }
}
