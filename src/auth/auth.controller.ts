import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth.credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private AuthService:AuthService){}

    @Post("/signup")
    SignUp(@Body() AuthCredentials:AuthCredentials):Promise<void>{
        return this.AuthService.CreateUser(AuthCredentials)
    }

    @Post("/signin")
    SignIn(@Body() AuthCredentials:AuthCredentials):Promise<{AccessToken:string}>{
        return this.AuthService.SignInUser(AuthCredentials)
    }
}
