import { genSalt, hash } from "bcryptjs";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { SignupDto } from './dto';

@EntityRepository(User)
export class AuthRepository extends Repository<User>{
    async signup(signupDto: SignupDto){
        const {username, password} = signupDto;
        const defaultRole = 'general';
        const user = new User();
        user.username = username;
        user.password = password;
        user.role = defaultRole;

        const salt = await genSalt(10);
        user.password = await hash(password, salt)
        await user.save();
    }
}