import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../Task.Status.Enum";

export class FilterAndSearchDTO {
    @IsOptional()
    @IsString()
    search?:string

    @IsOptional()
    @IsEnum(TaskStatus)
    status?:TaskStatus

}