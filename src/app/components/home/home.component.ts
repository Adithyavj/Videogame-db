import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse } from 'src/app/_models/apiResponse';
import { Game } from 'src/app/_models/game';
import { HttpService } from 'src/app/_services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public sort: string;
  public games: Array<Game> = new Array<Game>();
  private routeSub: Subscription;
  private gameSub: Subscription;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // when the home page loads, we want to check if there are any params.
    // if yes check the type of param
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, search?: string): void {
    // call the method in service to getGameList and add the returned value to games array
    this.gameSub = this.httpService.getGameList(sort, search).subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results;
      // console.log(this.games);
    });
  }

  openGameDetails(id: string) {
    this.router.navigate(['details', id]);
  }

  // implement ngOnDestroy interface
  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
