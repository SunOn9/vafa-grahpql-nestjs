import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}
    
    async validateUser(email: string, password: string) : Promise<any> {
        const user = await this.userService.findOne(email);

        if (!user){
            return {error : "Email address is not associated with any account"}
        } else if (!user.activated){
            return {error : "Account not activated yet! Please check your email and try again!"};
        } else {
            const valid = await bcrypt.compare(password, user.password);

            if (valid) { 
                const {password, activated, ...result} = user;
                return result;
            } else {
                return {error : "Wrong password"}
            }
        }
    }

    async login(user: User){
        return {
            access_token: this.jwtService.sign({
                username: user.email,
                sub: user._id.toString()
            })
        }
    }
}