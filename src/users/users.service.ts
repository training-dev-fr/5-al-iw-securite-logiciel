import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { InjectModel } from "@nestjs/sequelize";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as argon2 from 'argon2';
import { PasswordService } from "src/security/password/password.service";
import { EmailService } from "src/security/email/email.service";
import { GetUserDto } from "./dto/get-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private passwordService: PasswordService,
        private emailService: EmailService
    ) { }

    async findAll(): Promise<GetUserDto[]> {
        let users = await this.userModel.findAll({
            attributes: { exclude: ['password'] }
        });
        return users.map((user) => ({
            ...user.toJSON(),
            email: this.emailService.maskEmail(user.dataValues.email)
        }));
    }

    async findById(id: number): Promise<User> {
        const user = await this.userModel.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            throw new NotFoundException('User with id ${id} not found')
        }
        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await this.passwordService.hash(createUserDto.password);
        return this.userModel.create({
            ...createUserDto,
            password: hashedPassword
        });
    }

    async update(id: number, userUpdate: UpdateUserDto): Promise<User> {
        const user = await this.findById(id);
        if (userUpdate.password) {
            userUpdate.password = await this.passwordService.hash(userUpdate.password);
        }
        return user.update(userUpdate);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findById(id);
        return await user.destroy();
    }
}