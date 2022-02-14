import { createParamDecorator } from "@nestjs/common";
import { CreateUserDto } from "src/dtos/create-user.dto";

export const GetUser = createParamDecorator(
    (data, req): CreateUserDto => {
 return req.user;
},
);