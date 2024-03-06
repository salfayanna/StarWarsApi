import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Character } from '../character';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  characterList: Character[]= [];
  isClicked = false;
  isLoading = true;
  isError = false;
  errorText:string = '';
  nextPage: string = '';
  previousPage: string = '';
  peopleData: Character = {
    birth_year: '',
    eye_color: '',
    films: [],
    gender: '',
    hair_color: '',
    height: '',
    homeworld: '',
    mass: '',
    name: '',
    skin_color: '',
    created: '',
    edited: '',
    species: [],
    starships: [],
    url: '',
    vehicles: []
  };
  totalCount: number = 0;

  constructor(private apiService: ApiService, public modalService: ModalService) { }

  ngOnInit(): void {
    this.collectData();
  }

  collectData(url?: string){
    this.apiService.getCharacterData(url).subscribe((characters) => {
      this.characterList = Object.entries(characters)[3][1];
      this.nextPage = Object.entries(characters)[1][1];
      this.previousPage = Object.entries(characters)[2][1];
      this.totalCount = Object.entries(characters)[0][1];
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
      this.isError = true;
      this.errorText = error;
    })
  }

  logData(){
    this.isLoading = !this.isLoading;
    console.log(this.characterList);
    console.log(this.characterList[0].name);
  }

  changePage(nextPage: string){
    if(nextPage === 'prev'){
      this.isLoading = true;
      this.collectData(this.previousPage);
    } else if(nextPage === 'next'){
      this.isLoading = true;
      this.collectData(this.nextPage);
    }
  }

  openModal(characterName:string){
    let result = this.characterList.find(({ name }) => name === characterName);

    if(result != undefined) {
      this.peopleData = result;
    }
    this.modalService.showDialog = true;
  }

  getFilteredData(urlParam: string){
    if(urlParam != ''){
      this.isLoading = true;
      let searchUrl=`https://swapi.dev/api/people/?search=${urlParam}`;
      this.collectData(searchUrl);
    } else {
      this.collectData();
    }
  }
}