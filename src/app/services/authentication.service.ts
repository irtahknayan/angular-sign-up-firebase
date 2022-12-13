import { Injectable } from '@angular/core';
import {
  Auth, authState, createUserWithEmailAndPassword, updateProfile,
  UserInfo,
  UserCredential,
} from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';

import { from, Observable, switchMap, of, concat, concatMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: Auth) { }

  currentUser = authState(this.auth);

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  logout() {
    return from(this.auth.signOut());
  }
  // you can also create user collection in firestore database to update more user details. 
  // updateprofile comes with
  // name & profile update provision only 
  signUp(name: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)).pipe(
        switchMap(({ user }) => updateProfile(user, { displayName: name }))
      )
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not Authenticated');
        
        return updateProfile(user, profileData)
      })
    );
  }

}
