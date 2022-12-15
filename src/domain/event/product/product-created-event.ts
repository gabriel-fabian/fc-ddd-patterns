import EventInterface from '@/domain/event/@shared/event-interface'

export default class ProductCreatedEvent implements EventInterface {
  constructor (
    readonly eventData: any,
    readonly dateTimeOccurred = new Date()
  ) {}
}
