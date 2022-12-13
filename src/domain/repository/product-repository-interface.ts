import { Product } from '@/domain/entity';
import RepositoryInterface from './repository-interface';

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {}