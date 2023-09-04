import { Component } from "@angular/core";

type Team = {
  value: number;
  names: string[];
};
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  currentName: string = "";
  nameArray: string[] = [];
  errorMessage: string = "";
  teamLength: number = 0;
  numTeams: number = 0;
  teams: Team[] = [];

  addName() {
    if (!this.currentName) {
      this.errorMessage = "Nome não pode ser vazio!";
      return;
    }
    this.nameArray.push(this.currentName);
    this.currentName = "";
    this.errorMessage = "";
  }

  inputName(name: string) {
    this.currentName = name;
  }

  inputNumTeams(qtd: string) {
    this.numTeams = Number(qtd);
  }

  generateTeams() {
    if (this.numTeams > this.nameArray.length) {
      this.errorMessage = "Não há nomes o suficiente!";
      return;
    }
    this.nameArray.sort();

    let exceededMembers = this.nameArray.length % this.numTeams;
    this.teamLength = (this.nameArray.length - exceededMembers) / this.numTeams;

    for (let i = 0; i < this.numTeams; i++) {
      let newTeam: Team = { value: i + 1, names: [] };

      for (let j = 0; j < this.teamLength; j++) {
        newTeam.names.push(this.nameArray[0]);
        this.nameArray.shift();
      }
      if (exceededMembers) {
        newTeam.names.push(this.nameArray[0]);
        this.nameArray.shift();
        exceededMembers -= 1;
      }
      this.teams.push(newTeam);
    }
  }
}
