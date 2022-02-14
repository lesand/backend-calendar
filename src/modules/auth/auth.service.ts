import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { AuthRepository } from './auth.repository';
import { SignupDto } from './dto';
import { IJwtPayload } from './jwt-payload.interface';
import { User } from '../user/entities/user.entity';
import { Roles } from '../role/decorators/role.decorator';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService
    ){}

    async signup(signupDto: SignupDto): Promise<void>{
        const {username} = signupDto;
        const userExists = await this._authRepository.findOne({
            where: {username}
        })

        if (userExists){
            throw  new ConflictException('username already exist')
        }
        
        return this._authRepository.signup(signupDto);
    }

    async singin(singinDto: SignupDto): Promise <{token: string}>{
        const {username, password} = singinDto
        const user: User = await this._authRepository.findOne({
            where : {username},
        });

        if(!user){
            throw new NotFoundException("User does not exist")
        }

        const isMatch = await compare(password, user.password);

        if(!isMatch){
            throw new UnauthorizedException("Invalid credentials")
        }

        const payload: IJwtPayload = {
            id: user.id,
            username: user.username,
            role: user.role,
        }

        const token = await this._jwtService.sign(payload);
        const obj = {
            role: user.role,
            token: token
        }
        return obj
    }   
}
