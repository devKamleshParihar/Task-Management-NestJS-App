import { IsEnum } from "class-validator";
import { TaskStatus } from "../Task.Status.Enum";

export class UpdateTaskStatusDTO { 
    @IsEnum(TaskStatus)
    status:TaskStatus
}