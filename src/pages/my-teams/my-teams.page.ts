import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TeamHomePage, TournamentsPage } from '../pages';
import { EliteApi, UserSettings } from "../../app/shared/shared";

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.page.html'
})
export class MyTeamsPage {

  favorites = [];
  //   {
  //     team: {id: 6182, name: 'HC Elite 7th', coach: 'Michelotti'},
  //     tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
  //     tournamentName: 'March Madness Tournament'
  //   },
  //   {
  //     team: {id: 805, name: 'HC Elite(fake)', coach: 'Michelotti'},
  //     tournamentId: '913123-12312312-123123-123',
  //     tournamentName: 'Holiday Hoops Challenge'
  //   }
  // ]
  constructor(private nav: NavController,
              private eliteApi: EliteApi,
              private loadingController: LoadingController,
              private userSettings: UserSettings) {

  }

  favoriteTapped($event, favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    })

    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId)
      .subscribe(t => this.nav.push(TeamHomePage, favorite.team));
  }

  goToTornaments() {
    this.nav.push(TournamentsPage);
  }

  ionViewDidEnter() {
    this.favorites = this.userSettings.getAllFavorites();
  }
}
