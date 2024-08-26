import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './Users.Repository';
import { AuthCredentials } from './dto/auth.credential.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private UsersRepository:UsersRepository,
        private JwtService:JwtService
    ){}

    async CreateUser(AuthCredentials:AuthCredentials):Promise<void>{
        const {username , password} = AuthCredentials

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = this.UsersRepository.create({
            username,
            password:hashedPassword
        })
        try {
            await this.UsersRepository.save(user)
        } catch (error) {
            if(error.code === '23505'){
                throw new ConflictException("Username is already exists")
            }else{
                throw new InternalServerErrorException()
            }
        }
    }

    async SignInUser(AuthCredentials:AuthCredentials):Promise<{AccessToken:string}>{
        const { username, password } = AuthCredentials
        const user = await this.UsersRepository.findOne({where:{username}})
        if(user && await bcrypt.compare(password,user.password)){
            const payload : JwtPayload = {username}
            const AccessToken = await this.JwtService.sign(payload)
            return {AccessToken}
        }
        throw new UnauthorizedException('please check your login credentials')
    }

}
