import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Character, Planet } from '../character';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() data: Character;

  planet: Planet = {
    name: '',
    terrain: '',
    climate: ''
  };

  constructor(public modalService: ModalService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getHomeworld();
  }

  closeModal(){
    console.log(this.data);
    this.modalService.showDialog = false;
  }

  getHomeworld(){
    this.apiService.getCharacterData(this.data?.homeworld).subscribe((planet) => {
      this.planet.name = Object.entries(planet)[0][1];
      this.planet.terrain = Object.entries(planet)[4][1];
      this.planet.climate = Object.entries(planet)[6][1];
    })
  }

}
