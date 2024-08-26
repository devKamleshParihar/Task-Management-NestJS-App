import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UsersRepository } from "./Users.Repository";
import { JwtPayload } from "./jwt.payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor (@InjectRepository(User) private UserRepository:UsersRepository){
        super({
            secretOrKey:'This is my secret',
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload:JwtPayload):Promise<User>{
        const {username} = payload
        const user : User = await this.UserRepository.findOne({where:{username}})
        if(!user){
            throw new UnauthorizedException();
        } 
        return user
    }
}