import { Injectable } from '@nestjs/common';

@Injectable() 
export class AppService {
  isOnline(): any {
    return { 
      status : 200 ,
      message :  'API Online' 
    };
  }
}
