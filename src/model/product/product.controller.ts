import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {Observable} from 'rxjs';
import {PolicyGuard} from '../../permission/guard/policy.guard';
import {CheckPolicies} from '../../permission/interface/policy-handler.interface';
import {DefaultPolicyHandler} from '../../permission/ability/default-policy.handler';
import {Action} from '../../permission/interface/action.enum';
import {ProductService} from './product.service';
import {Product, ProductDocument} from './entity/product.entity';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {
    }

    @Post()
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Create, Product))
    create(@Body() product: Product): Observable<ProductDocument> {
        return this.productService.create(product);
    }

    @Get(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Read, Product))
    find(@Param('id') id: string): Observable<ProductDocument> {
        return this.productService.get(id);
    }

    @Put(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Update, Product))
    update(@Param('id') id: string, @Body() product: Product): Observable<ProductDocument> {
        return this.productService.update(id, product);
    }

    @Delete(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Delete, Product))
    delete(@Param('id') id: string): Observable<boolean> {
        return this.productService.delete(id);
    }

}
