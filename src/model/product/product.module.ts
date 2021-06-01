import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Product} from './entity/product.entity';
import {ProductService} from './product.service';
import {ProductSchema} from './entity/product.schema';
import {ProductController} from './product.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Product.name,
                schema: ProductSchema
            }
        ])
    ],
    exports: [ProductService],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {}
