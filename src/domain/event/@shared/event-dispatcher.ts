import EventDispatcherInterface from './event-dispatcher-interface'
import EventHandlerInterface from './event-handler-interface'
import EventInterface from './event-interface'

export default class EventDispatcher implements EventDispatcherInterface {
  private readonly eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {}

  get getEventHandlers (): { [eventName: string ]: EventHandlerInterface[] } {
    return this.eventHandlers
  }

  register (eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(eventHandler)
  }

  unregister (eventName: string, eventHandler: EventHandlerInterface): void {}
  unregisterAll (): void {}
  notify (event: EventInterface): void {}
}
