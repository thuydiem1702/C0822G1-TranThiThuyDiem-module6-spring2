import {Category} from './category';
import {Concentration} from './concentration';
import {Fragrant} from './fragrant';
import {Trademark} from './trademark';

export interface Perfume {
  idPerfume?: number;
  name?: string;
  price?: number;
  description?: string;
  quantity?: number;
  image?: string;
  category?: Category;
  concentration?: Concentration;
  fragrant?: Fragrant;
  trademark?: Trademark;
}
