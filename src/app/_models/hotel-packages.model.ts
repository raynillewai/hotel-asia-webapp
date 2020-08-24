import { plainToClassFromExist, Type } from 'class-transformer';

export class HotelPackages {
  id: string;
  hotelName: string;
  price: number;
  durationOfStay: number;
  packageValidity: number;
  description: string;

  constructor(data?: Partial<HotelPackages>) {
    plainToClassFromExist(this, data || {});
  }
}
