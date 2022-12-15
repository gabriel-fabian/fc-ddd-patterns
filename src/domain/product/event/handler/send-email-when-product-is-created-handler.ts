import { EventHandlerInterface } from '@/domain/@shared/event'
import { ProductCreatedEvent } from '@/domain/product/event'

export default class SendEmailWhenProductIsCreatedHandler
implements EventHandlerInterface<ProductCreatedEvent> {
  handle (_event: ProductCreatedEvent): void {
    // eslint-disable-next-line no-console
    console.log('Sending email to .....')
  }
}
