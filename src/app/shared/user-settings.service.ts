import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Events } from 'ionic-angular';
import * as _ from 'lodash';

@Injectable()
export class UserSettings {

  constructor(private storage: Storage,
              private events: Events) {}

  favoriteTeam(team, tournamentId, tournamentName) {
    let item = { team, tournamentId, tournamentName };
    this.storage.set(team.id, item).then(() => this.events.publish('favorites:changed'));
  }

  unfavoriteTeam(team) {
    this.storage.remove(team.id).then(() => this.events.publish('favorites:changed'));
  }

  isFavoriteTeam(teamId) {
    return this.storage.get(teamId).then(value => value ? true : false);
  }

  getAllFavorites() {
    let items = [];
    _.forIn(window.localStorage, (v,k) => {
      if (v && typeof v === "string") {
        items.push(JSON.parse(v));
      }
    });
    return items.length? items : null;
  }
}
