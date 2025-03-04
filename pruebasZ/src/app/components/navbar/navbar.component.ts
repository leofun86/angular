import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public dataService: DataService ) { }
  msjBar:string = 'No hay mensaje';
  ngOnInit(): void {
    this.dataService.mensaje$.subscribe(cambio => {
      this.msjBar=cambio;
    });
  }

}
