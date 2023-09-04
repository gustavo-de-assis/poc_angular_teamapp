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
    this.teams = [];

    const names = [...this.nameArray];

    names.sort(() => Math.random() - 0.5);

    let exceededMembers = names.length % this.numTeams;
    this.teamLength = (names.length - exceededMembers) / this.numTeams;

    for (let i = 0; i < this.numTeams; i++) {
      let newTeam: Team = { value: i + 1, names: [] };

      for (let j = 0; j < this.teamLength; j++) {
        newTeam.names.push(names[0]);
        names.shift();
      }
      if (exceededMembers) {
        newTeam.names.push(names[0]);
        names.shift();
        exceededMembers -= 1;
      }
      this.teams.push(newTeam);
    }
  }
}
