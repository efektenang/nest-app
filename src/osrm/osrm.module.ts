import { Module } from '@nestjs/common';
import { OsrmService } from './osrm.service';
import { OsrmController } from './osrm.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5
  })],
  controllers: [OsrmController],
  providers: [OsrmService],
})
export class OsrmModule {}
