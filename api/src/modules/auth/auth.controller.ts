import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SignineDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() signinDto: SignineDto) {
    return this.authService.signin(signinDto);
  }

  @Post('signup')
  create(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
