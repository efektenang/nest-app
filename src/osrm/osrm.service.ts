import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OsrmService {
  constructor(private readonly httpService: HttpService) {}

  async calculateDistance(coordinates) {
    try {

      function convertCoordinateToString(coordinate) {
        return `${coordinate.from.join(',')};${coordinate.to.join(',')}`;
      }
      
      const coordinateStrings = convertCoordinateToString(coordinates)
      const response = await firstValueFrom(this.httpService.get(`http://router.project-osrm.org/route/v1/driving/${coordinateStrings}?alternatives=false&overview=false`))
      return response.data
    } catch (error) {
      return error
    }
  }
}