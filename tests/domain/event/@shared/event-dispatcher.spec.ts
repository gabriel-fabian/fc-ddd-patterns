import { EventDispatcher } from '@/domain/event/@shared'
import { SendEmailWhenProductIsCreatedHandler } from '@/domain/event/product/handler'

describe('EventDispatcher test', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler    = new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined()
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(1)
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)
  })
})
