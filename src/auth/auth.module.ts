import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/shared/models/user.schema";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from './local.auth';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport"
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '60s' },
          }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        forwardRef(() => UsersModule),
    ],
    controllers: [ AuthController],
    providers: [
        AuthService, 
        LocalStrategy
    ],
    exports: [
        LocalStrategy
    ]
})

export class AuthModule{}
