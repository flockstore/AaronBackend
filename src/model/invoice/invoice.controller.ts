import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {Observable} from 'rxjs';
import {PolicyGuard} from '../../permission/guard/policy.guard';
import {CheckPolicies} from '../../permission/interface/policy-handler.interface';
import {DefaultPolicyHandler} from '../../permission/ability/default-policy.handler';
import {Action} from '../../permission/interface/action.enum';
import {InvoiceService} from './invoice.service';
import {Invoice, InvoiceDocument} from './entity/invoice.entity';

@Controller('invoice')
export class InvoiceController {

    constructor(private invoiceService: InvoiceService) {
    }

    @Post()
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Create, Invoice))
    create(@Body() product: Invoice): Observable<InvoiceDocument> {
        return this.invoiceService.create(product);
    }

    @Get(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Read, Invoice))
    find(@Param('id') id: string): Observable<InvoiceDocument> {
        return this.invoiceService.get(id);
    }

    @Put(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Update, Invoice))
    update(@Param('id') id: string, @Body() invoice: Invoice): Observable<InvoiceDocument> {
        return this.invoiceService.update(id, invoice);
    }

    @Delete(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Delete, Invoice))
    delete(@Param('id') id: string): Observable<boolean> {
        return this.invoiceService.delete(id);
    }

}
