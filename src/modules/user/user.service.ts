import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcryptjs';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>){}
    
   async getAll(): Promise<User[]> {
        return await this.userRepository.find()
    }
    async createOne(dto: CreateUserDto){
        const data = this.userRepository.create(dto);
        const defaultRole = 'general';
        const salt = await genSalt(10);
        data.password = await hash(data.password, salt);
        data.role = defaultRole;
        return await this.userRepository.save(data)
    }
}
