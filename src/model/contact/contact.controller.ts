import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {Observable} from 'rxjs';
import {PolicyGuard} from '../../permission/guard/policy.guard';
import {CheckPolicies} from '../../permission/interface/policy-handler.interface';
import {DefaultPolicyHandler} from '../../permission/ability/default-policy.handler';
import {Action} from '../../permission/interface/action.enum';
import {ContactService} from './contact.service';
import {Contact, ContactDocument} from './entity/contact.entity';

@Controller('contact')
export class ContactController {

    constructor(private contactService: ContactService) {
    }

    @Post()
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Create, Contact))
    create(@Body() group: Contact): Observable<ContactDocument> {
        return this.contactService.create(group);
    }

    @Get(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Read, Contact))
    find(@Param('id') id: string): Observable<ContactDocument> {
        return this.contactService.get(id);
    }

    @Put(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Update, Contact))
    update(@Param('id') id: string, @Body() contact: Contact): Observable<ContactDocument> {
        return this.contactService.update(id, contact);
    }

    @Delete(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Delete, Contact))
    delete(@Param('id') id: string): Observable<boolean> {
        return this.contactService.delete(id);
    }

}
