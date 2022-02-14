import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    async getAll(){
        const data = await this.userService.getAll();
        return {
            message: 'successful',
            data
        }
    }

    @Post('createOne')
    async createOne(
        @Body() dto: CreateUserDto
    ){
        const data = await this.userService.createOne(dto);
        return { message: 'succesful', data}
    }
}
