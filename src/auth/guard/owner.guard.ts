import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectConnection } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { OWNER_KEY } from "../decorator/owner.decorator";

@Injectable()
export class OwnerGuard implements CanActivate{
    constructor(
        private readonly reflector: Reflector,
        @InjectConnection()
        private readonly sequelize: Sequelize,
    ){}

    async canActivate(context: ExecutionContext):Promise<boolean> {
        const config = this.reflector.getAllAndOverride(OWNER_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if(!config){
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const userId = request.user?.id;
        const resourceId = request.params[config.paramName];

        if(!userId){
            throw new ForbiddenException('Utilisateur non identifié');
        }

        const repository = this.sequelize.getRepository(config.model);

        const resource = await repository.findByPk(resourceId);

        if(!resource){
            throw new NotFoundException('Ressource introuvable');
        }

        const resourceOwnerId = resource.getDataValue(config.owenrField);

        if(resourceOwnerId !== userId){
            throw new ForbiddenException('Accès interdit');
        }

        return true;
    }
}