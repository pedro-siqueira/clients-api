import { IsEmail, IsISO8601, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength, Validate } from "class-validator";
import { IsCPF } from "./cpf-validator";

export class CreateClientDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name: string;
    
    @IsEmail()
    email: string;

    @IsISO8601()
    birthdate: string;
    
    @IsOptional()
    @IsPhoneNumber('BR')
    phone?: string;

    @IsNotEmpty()
    @IsString()
    @Validate(IsCPF)
    cpf: string;
}
