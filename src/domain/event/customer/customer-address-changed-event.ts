import { EventInterface } from '@/domain/event/@shared'

export default class CustomerAddressChangedEvent implements EventInterface {
  constructor (
    readonly eventData: any,
    readonly dateTimeOccurred = new Date()
  ) {}
}
