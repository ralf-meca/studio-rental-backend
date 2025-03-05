import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {BlockedHours, BlockedHoursSchema} from "./schemas/blockedHours.schema";
import {BlockedHoursController} from "./blockedHours.controller";
import {BlockedHoursService} from "./blockedHours.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: BlockedHours.name, schema: BlockedHoursSchema }])
    ],
    controllers: [BlockedHoursController],
    providers: [BlockedHoursService],
    exports: [BlockedHoursService],
})
export class BlockedHoursModule {}