import { SetMetadata } from "@nestjs/common";
import { Model } from "sequelize-typescript";

export const OWNER_KEY = 'owner';

export const Owner = (model: any, paramName = 'id', owenrField = 'userId') => 
    SetMetadata(OWNER_KEY, {
        model,
        paramName,
        owenrField
    })
