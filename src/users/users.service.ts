import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user-input';
import { GetUserArgs } from './dto/args/get-user-args';

@Injectable()
export class UsersService {

    async createUser(createUserData : CreateUserInput){
    }

    async getUser(getUserArgs : GetUserArgs){
        
    }
}
