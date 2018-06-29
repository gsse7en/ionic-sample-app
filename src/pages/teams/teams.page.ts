import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage } from  '../pages';
import { EliteApi } from "../../app/shared/shared";
import * as _ from 'lodash';

@Component({
  templateUrl: 'teams.page.html',
})
export class TeamsPage {

  //private allTeams: any;
  private allTeamDivisions: any;
  teams = [];
  queryText: string;

  constructor(private nav: NavController,
              private navParams: NavParams,
              private eliteApi: EliteApi,
              private loadingController: LoadingController) {

  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    let loader = this.loadingController.create({
      content: 'Getting date...'
    })
    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id)
        .subscribe(data => {
          //this.allTeams = data.teams;
          this.allTeamDivisions = _.chain(data.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();
          this.teams = this.allTeamDivisions;

          loader.dismiss();
        });
    })

  }

  itemTapped($event, team) {
    this.nav.push(TeamHomePage, team)
  }
  updateTeams(){
    let queryTextLower = this.queryText.toLocaleLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower))
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams});
      }
    });

    this.teams = filteredTeams;
  }

}
