import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // Replace with your own secret key
    }),
  ],
  providers: [AuthService]
})
export class AuthModule {}
