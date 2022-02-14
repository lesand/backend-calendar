import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt} from "passport-jwt";
import { Strategy } from "passport";
import { AuthRepository } from "../auth.repository";
import { IJwtPayload } from "../jwt-payload.interface";
import { Configuration } from "./keys";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "local"){
    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKeY: Configuration.JWT_SECRET,
        })
    }
    async validate(payload: IJwtPayload){
        const { username } = payload;
        const user = await  this._authRepository.findOne({
            where: {username, status: 'ACTIVE'}
        })
        
    if (!user){
        throw new UnauthorizedException
    }

    return payload;

    }
}