import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/User.model';
import { CreateUserInput } from './dto/input/create-user-input';
import { GetUserArgs } from './dto/args/get-user-args';

@Resolver(()=>User)
export class UsersResolver {
    constructor(private readonly userService: UsersService) {}

    @Mutation(()=>User)
    async createUser(@Args('createUserData') createUserData : CreateUserInput){
        return this.userService.createUser(createUserData);
    }

    @Query(()=>User,{name:'user'})
    async getUser(@Args() getUserArgs : GetUserArgs){
        return this.userService.getUser(getUserArgs);
    }
}
