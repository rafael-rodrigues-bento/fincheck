import { Body, Controller, Post, SetMetadata } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignupDto } from './dto/signup.dto'
import { SignineDto } from './dto/signin.dto'
import { IsPublic } from 'src/shared/decorators/IsPublic'

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() signinDto: SignineDto) {
    return this.authService.signin(signinDto)
  }

  @Post('signup')
  @SetMetadata('IS_PUBLIC', true)
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto)
  }
}
