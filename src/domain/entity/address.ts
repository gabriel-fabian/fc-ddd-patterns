export default class Address {
  street : string = ''
  number : number = 0
  city   : string = ''
  zipCode: string = ''

  constructor(street: string, number: number, city: string, zipCode: string) {
    this.street  = street
    this.number  = number
    this.city    = city
    this.zipCode = zipCode

    this.validate()
  }

  validate() {
    if (this.street.length === 0) {
      throw new Error('Street is required')
    }

    if (this.number === 0) {
      throw new Error('Number is required')
    }

    if (this.city.length === 0) {
      throw new Error('City is required')
    }

    if (this.zipCode.length === 0) {
      throw new Error('zipCode is required')
    }
  }
}
