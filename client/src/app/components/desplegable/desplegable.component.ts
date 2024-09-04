import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil  } from 'rxjs';
import { PersonasService } from 'src/app/core/services/personas.service';
@Component({
  selector: 'app-desplegable',
  templateUrl: './desplegable.component.html',
  styleUrls: ['./desplegable.component.css']
})
export class DesplegableComponent implements OnInit {
  private destroy$ = new Subject<any>();
  id_Per: number = 0;
  roles: string[] = [];
  nameRol: string = '';
  getBolean?: boolean;
  srvModal: any;

  constructor(
    public srvPersona: PersonasService
  ) { }

  showDropdown = false;
  showDropdownRoles = false;
  showDropdownResponsive = false;

  ngOnInit(): void {
  }

  
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleDropdownRoles() {
    this.showDropdownRoles = !this.showDropdownRoles;
  }
  mostrarAjustes() {
    // console.log('Haciendo click en mostrar ajustes');
  }

  getRolName(rolName: any) {
    this.nameRol = rolName;
    this.srvPersona.nameRol = rolName;

    // console.log(' getRolName =>', this.srvPersona.nameRol);
    this.srvPersona.setData_nameRol(this.nameRol);
    // this.location.reload();
    // this.window.location.reload();
    window.location.reload();
    this.srvPersona.nameRol = rolName;

    // this.location.reload()
  }

  salirDelSistema() {
    //this.casCliente.Logout();
  }

    ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  
}
