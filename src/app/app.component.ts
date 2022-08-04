import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'buy-and-sell';

  constructor(
    public auth: AngularFireAuth
  ) {}

  public signInClicked(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public signOutClicked(): void {
    this.auth.signOut();
  }
}
