import { faker } from '@faker-js/faker'

import { EventDispatcher } from '@/domain/event/@shared'
import { SendEmailWhenProductIsCreatedHandler } from '@/domain/event/product/handler'
import { ProductCreatedEvent } from '@/domain/event/product'

describe('EventDispatcher test', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler    = new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined()
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(1)
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)
  })

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler    = new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined()
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(0)
  })

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler    = new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)

    eventDispatcher.unregisterAll()

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeUndefined()
  })

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler    = new SendEmailWhenProductIsCreatedHandler()
    const spyEventHandler = jest.spyOn(eventHandler, 'handle')

    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)

    const productCreatedEvent = new ProductCreatedEvent({
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price()
    })

    eventDispatcher.notify(productCreatedEvent)

    expect(spyEventHandler).toHaveBeenCalledWith(productCreatedEvent)
  })
})
