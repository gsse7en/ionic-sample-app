import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StandingsPage, TeamDetailPage } from  '../pages';

@Component({
  templateUrl: 'team-home.page.html',
})
export class TeamHomePage {
  team: any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;

  constructor(private nav: NavController,
              private navParams: NavParams) {
    this.team = this.navParams.data;
  }

  goHome() {
    this.nav.popToRoot()
  }
}
