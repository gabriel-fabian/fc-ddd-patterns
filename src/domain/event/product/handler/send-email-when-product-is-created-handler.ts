import { EventHandlerInterface } from '@/domain/event/@shared'
import ProductCreatedEvent from '@/domain/event/product/product-created-event'

export default class SendEmailWhenProductIsCreatedHandler
implements EventHandlerInterface<ProductCreatedEvent> {
  handle (_event: ProductCreatedEvent): void {
    // eslint-disable-next-line no-console
    console.log('Sending email to .....')
  }
}
