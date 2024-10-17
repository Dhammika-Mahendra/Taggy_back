import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from '../database/User.schema';
import { UserRepository } from '../database/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{name : UserDocument.name, schema : UserSchema}])
  ],
  providers: [UsersResolver, UsersService, UserRepository]
})
export class UsersModule {}
