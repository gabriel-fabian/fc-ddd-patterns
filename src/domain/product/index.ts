export { default as Product } from './entity/product'
export { default as ProductCreatedEvent } from './event/product-created-event'
export { default as ProductRepositoryInterface } from './repository/product-repository-interface'
export { default as ProductService } from './service/product_service'

export {
  default as SendEmailWhenProductIsCreatedHandler
} from './event/handler/send-email-when-product-is-created-handler'
