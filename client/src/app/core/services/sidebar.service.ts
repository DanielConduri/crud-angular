import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  width!: number;
  height!: number;

  expand!: boolean;

  setSizeT(): number{
      return this.width = 1053
      
    // console.log(this.width);
  }

  setSizeF(): number{
    return this.width = 1250
  }

  getBool(exp : boolean): number{
    this.expand = exp
      if(this.expand === true){
        return this.setSizeT()
      }
      else{
        return this.setSizeF()
      }


    
  }
}
