import Address from './address'

export default class Customer {
  private _id          : string
  private _name        : string = ''
  private _address!    : Address
  private _active      : boolean = false
  private _rewardPoints: number = 0

  constructor(id: string, name: string) {
    this._id   = id
    this._name = name
    this.validate()
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }

    if (this._name.length === 0) {
      throw new Error('Name is required')
    }
  }

  get name(): string {
    return this._name
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  get id(): string {
    return this._id
  }

  changeName(name: string) {
    this._name = name
  }

  changeAddres(address: Address) {
    this._address = address
  }

  isActive() {
    return this._active
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate customer')
    }
    this._active = true
  }

  deactivate() {
    this._active = false
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }
}
