import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';
import {PermissionRegistry} from "./permission-registry.entity";
import {IsNotEmpty} from "class-validator";

export type GroupDocument = Group & Document;

@Schema()
export class Group extends Document {

    @IsNotEmpty()
    @Prop({required: true})
    name: string;

    @IsNotEmpty()
    @Prop({required: true})
    color: string;

    @IsNotEmpty()
    @Prop({required: true})
    priority: number;

    @Prop({required: true, default: null})
    permissions: PermissionRegistry;

}

export const GroupSchema = SchemaFactory.createForClass(Group);
