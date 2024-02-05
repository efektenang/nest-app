import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Header } from '@nestjs/common';
import { OsrmService } from './osrm.service';

@Controller('api/v1/map')
export class OsrmController {
  constructor(private readonly osrmService: OsrmService) {}

  @Post('distance')
  @Header('Content-Type', 'application/json')
  async findDistance(@Body() body, @Res() res) {
    const result = await this.osrmService.calculateDistance(body)
    const { weight_name, weight, duration, distance } = result.routes[0]

    // // convert meter to kilometer if distance more than 1000
    let stringDistance = `${distance} m`

    if (distance > 1000) {
      stringDistance = `${distance / 1000} km`
    }
    
    return res.json({
      message: result.code,
      data: {
        weight_name, weight, duration, distance: stringDistance
      }
    })
  }

  @Post('distance/detail')
  @Header('Content-Type', 'application/json')
  async findDistanceDetail(@Body() body, @Res() res) {
    const result = await this.osrmService.calculateDistance(body)
    const { weight_name, weight, duration, distance } = result.routes[0]

    // convert meter to kilometer if distance more than 1000
    let stringDistance = `${distance} m`

    if (distance > 1000) {
      stringDistance = `${distance / 1000} km`
    }

    return res.json({
      message: result.code,
      data: {
        routes: { weight_name, weight, duration, distance: stringDistance },
        from: result.waypoints[0],
        to: result.waypoints[1]
      }
    })
  }
}
