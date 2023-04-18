import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo?: string;
  public tituloSubs$: Subscription;
  public url?: string;

  constructor(private router: Router, private location: Location) {

    this.tituloSubs$ = this.getArgumentos().subscribe(({ titulo }) => {

      this.titulo = titulo;
      document.title = `CencoWeb - ${titulo}`;

    });

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.url = this.location.path();
      this.url = this.url.split('/').slice(0, -1).join('/');
    });
  }

  ngOnDestroy() {

    this.tituloSubs$.unsubscribe();
  
  }

  getArgumentos(){

    return this.router.events.pipe(

      filter((event:any) => event instanceof ActivationEnd),
      filter((event:ActivationEnd)=> event.snapshot.firstChild === null),
      map((event:ActivationEnd)=> event.snapshot.data)

    );

  }

}