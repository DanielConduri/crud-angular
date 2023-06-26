import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from '../core/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public formType: string = "";
  public titleModal: string = "";
  triggerModal?: boolean;

  private destroy$ = new Subject<any>();
  constructor(public srvModal: ModalService) { }

  ngOnInit(): void {

    this.formType = '';
    this.titleModal = '';
    console.log('dentro del modal.comp.ts:', this.formType);
    this.srvModal.selectForm$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(form) => {
        console.log('form en el modal.ts ->', form);
        this.formType = form.form;
        this.titleModal = form.title;
        this.triggerModal = form.special;
      },
      error: (e) => {
        console.log('Error =>', e)
      }
    })
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }// fin ngOnInit

  handleKeyDown(event: KeyboardEvent) {
    //Si se presiona la tecla Esc
    if(event.key === 'Escape'){
      this.closeModalX();
    }
  }

  closeModalX(){
    this.srvModal.closeModal();

    this.formType = 'clear';
    this.titleModal = '';
    this.srvModal.openModal();
    this.srvModal.closeModal();
  }

}
