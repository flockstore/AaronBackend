import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ModelService} from '../../common/service/model.service';
import {Product, ProductDocument} from './entity/product.entity';

@Injectable()
export class ProductService extends ModelService<ProductDocument, ProductDocument> {

    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ) {
        super(productModel);
    }

}
