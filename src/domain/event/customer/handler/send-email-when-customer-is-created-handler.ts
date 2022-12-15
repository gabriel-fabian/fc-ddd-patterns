import { EventHandlerInterface } from '@/domain/event/@shared'
import { CustomerCreatedEvent } from '@/domain/event/customer'

export default class SendEmailWhenCustomerIsCreatedHandler
implements EventHandlerInterface<CustomerCreatedEvent> {
  handle (_event: CustomerCreatedEvent): void {
    // eslint-disable-next-line no-console
    console.log('Esse é o primeiro console.log do evento: CustomerCreated')
  }
}
