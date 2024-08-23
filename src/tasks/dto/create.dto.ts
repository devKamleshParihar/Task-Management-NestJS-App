import { IsNotEmpty } from "class-validator"

export class CreateDTO {
    @IsNotEmpty()
    name :string

    @IsNotEmpty()
    username:string
}