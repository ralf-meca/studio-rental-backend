import { Module } from '@nestjs/common';
import { EmailService } from './emails.service';

@Module({
    providers: [EmailService],
    exports: [EmailService], // Export to use it in other modules
})
export class EmailModule {}
