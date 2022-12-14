import { Customer } from '@/domain/entity'
import RepositoryInterface from './repository-interface'

export default interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}
