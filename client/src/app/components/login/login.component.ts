import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  private destroy$ = new Subject<any>();


  constructor(
    public fb_estado: FormBuilder,
  ) { 
    this.myForm = this.fb_estado.group({
      
    })
  }

  ngOnInit(): void {
  }
  

}
