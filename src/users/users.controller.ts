import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {

    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findById(id);
    }

    @Post()
    create(@Body() user: CreateUserDto) {
        return this.usersService.create(user);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number,
        @Body() user: User) {
        return this.usersService.update(id, user);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}