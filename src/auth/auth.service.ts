import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/shared/models/user.schema';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }
    
    async validateUser(id: string): Promise<any> {
        let userFound:User = await this.usersService.findOne(id);
        
        if(!userFound) return null
        return userFound;
    }
    

    async login(user: User) {
        let userFound:User = await this.usersService.findByEmail(user.email, user.password);
        // user.password = await bcrypt.hash(user.password, 10);
        if(userFound){
            const payload = { id: userFound._id, email: user.email };
            return {
                message: "Login Successfully",
                access_token: this.jwtService.sign(payload),
            };
        }else return {message: "Invalid Credentials"};
    }
}