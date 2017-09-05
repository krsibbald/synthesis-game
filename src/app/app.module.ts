import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CardPopoverComponent } from '../components/card-popover/card-popover';
import { CardComponent } from '../components/card/card';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CardServiceProvider } from '../providers/card-service/card-service';
import { GameProvider } from '../providers/game/game';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage, 
    CardPopoverComponent, 
    CardComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage, 
    CardPopoverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CardServiceProvider,
    GameProvider
  ]
})
export class AppModule {}
