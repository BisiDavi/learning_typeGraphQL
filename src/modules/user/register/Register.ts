import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { DoesEmailExist } from "./doesEmailExist";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @DoesEmailExist({ message: "Email already in use" })
  email: string;

  @Field()
  password: string;
}
