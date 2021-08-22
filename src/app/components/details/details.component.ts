import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/_models/game';
import { HttpService } from 'src/app/_services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  gameRating = 0;
  gameId: string; // id we will be getting from route
  game: Game;
  private routeSub: Subscription;
  private gameSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {
    // to get the route params
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  // to show color in rating gauge
  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    }
    else if (value > 50) {
      return '#fffa50';
    }
    else if (value > 30) {
      return '#f74438';
    }
    else {
      return '#ef4655'
    }
  }

  getGameDetails(id: string): void {
    this.gameSub = this.httpService.getGameDetails(id).subscribe((gameResp: Game) => {
      this.game = gameResp;
      console.log(this.game);
      
      // giving some time to display the gauge with critic 
      setTimeout(() => {
        this.gameRating = this.game.metacritic;
      }, 1000);
    });
  }

  ngOnDestroy() {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
