import { Injectable, Logger, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user-input';
import { GetUserArgs } from './dto/args/get-user-args';
import { UserRepository } from '../database/users.repository';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../database/User.schema';
import { User } from './models/User.model';

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UserRepository) {}

    async createUser(createUserData : CreateUserInput){
        await this.validateCreateUserData (createUserData);
        const userDocument = await this.usersRepository.create({ 
            ...createUserData, 
            password: await bcrypt.hash(createUserData.password, 10),
        });
        return this.toModel(userDocument);
    }

    //Checking if user(email) already exists
    private async validateCreateUserData (createUserData: CreateUserInput) { 
        try {
            await this.usersRepository.findOne({ email: createUserData.email });
            throw new UnprocessableEntityException('Email already exists.');
        } catch (err) {}
    }

    //Mapping the user document to the corresponding data types
    private toModel(userDocument : UserDocument) : User{
        return {
            _id: userDocument._id.toString(),
            email: userDocument.email
        }
    }

    async getUser(getUserArgs : GetUserArgs){
        const userDocument = await this.usersRepository.findOne(getUserArgs);
        return this.toModel(userDocument);
    }


    //For JWT authentication
    //checks if a user with the given email exists and if the password is correct

    async validateUser(email: string, password: string) {
        const userDocument = await this.usersRepository.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, userDocument.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.toModel(userDocument);
    }
}

