import { Address } from '..'

export default class Customer {
  private readonly _id: string
  private _name: string = ''
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor (id: string, name: string) {
    this._id   = id
    this._name = name
    this.validate()
  }

  validate (): void {
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }

    if (this._name.length === 0) {
      throw new Error('Name is required')
    }
  }

  get name (): string {
    return this._name
  }

  get rewardPoints (): number {
    return this._rewardPoints
  }

  get id (): string {
    return this._id
  }

  get address (): Address {
    return this._address
  }

  set address (address: Address) {
    this._address = address
  }

  changeName (name: string): void {
    this._name = name
  }

  changeAddress (address: Address): void {
    this._address = address
  }

  isActive (): boolean {
    return this._active
  }

  activate (): void {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate customer')
    }
    this._active = true
  }

  deactivate (): void {
    this._active = false
  }

  addRewardPoints (points: number): void {
    this._rewardPoints += points
  }
}
