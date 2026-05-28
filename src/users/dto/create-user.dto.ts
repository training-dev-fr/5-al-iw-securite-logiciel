import { IsNotEmpty, IsString, Length, IsEmail, MinLength, Matches } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @Length(2,50)
    @IsString()
    firstname: string;

    @IsString()
    @Length(2,50,{
        message: "Le nom doit contenir entre 2 et 50 caractères"
    })
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        {
            message: "Le mot de passe doit contenir au moins : \n une minisucule \n une majuscule \n un chiffre \n un caractère spécial"
        }
    )
    password:string;
}