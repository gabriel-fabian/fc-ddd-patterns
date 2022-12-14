import { Order } from '@/domain/entity'
import RepositoryInterface from './repository-interface'

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
