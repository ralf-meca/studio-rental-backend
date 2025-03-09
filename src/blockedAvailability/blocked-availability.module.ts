    import {Module} from "@nestjs/common";
    import {MongooseModule} from "@nestjs/mongoose";
    import {BlockedAvailability, BlockedAvailabilitySchema} from "./schemas/blocked-availability.schema";
    import {BlockedAvailabilityController} from "./blocked-availability.controller";
    import {BlockedAvailabilityService} from "./blocked-availability.service";

    @Module({
        imports: [
            MongooseModule.forFeature([{name: BlockedAvailability.name, schema: BlockedAvailabilitySchema }])
        ],
        controllers: [BlockedAvailabilityController],
        providers: [BlockedAvailabilityService],
        exports: [BlockedAvailabilityService],
    })
    export class BlockedAvailabilityModule {}