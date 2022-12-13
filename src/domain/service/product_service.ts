import { Product } from '@/domain/entity'

export default class ProductService {
  static increasePrice (products: Product[], percentage: number): void {
    products.forEach((product) => {
      const changedPrice = product.price * percentage / 100
      product.changePrice(product.price + changedPrice)
    })
  }
}
