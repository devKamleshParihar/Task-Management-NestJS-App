import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './Users.Repository';
import { AuthCredentials } from './dto/auth.credential.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private UsersRepository:UsersRepository){}

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

}
