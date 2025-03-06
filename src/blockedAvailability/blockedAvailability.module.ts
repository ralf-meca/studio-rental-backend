import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {BlockedAvailability, BlockedAvailabilitySchema} from "./schemas/blockedAvailability.schema";
import {BlockedAvailabilityController} from "./blockedAvailability.controller";
import {BlockedAvailabilityService} from "./blockedAvailability.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: BlockedAvailability.name, schema: BlockedAvailabilitySchema }])
    ],
    controllers: [BlockedAvailabilityController],
    providers: [BlockedAvailabilityService],
    exports: [BlockedAvailabilityService],
})
export class BlockedAvailabilityModule {}