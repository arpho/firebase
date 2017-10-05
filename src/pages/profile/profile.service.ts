import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProfileModel, UserModel } from './profile.model';

@Injectable()
export class ProfileService {
  constructor(
    public http: Http,
    public user: UserModel,
    public nativeStorage: NativeStorage
  ) { }

  getData(): Promise<ProfileModel> {
    return this.http.get('./assets/example_data/profile.json')
      .toPromise()
      .then(response => response.json() as ProfileModel)
      .catch(this.handleError);
  }

  setUser(user) {
    this.user.build(user);
  }

  getUser() {
    return this.user;
  }

  getUserUid(){
    return this.user.uid;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getUserImage() {
    return this.nativeStorage.getItem('profileImage');
  }

  setUserImage(newImage) {
    this.nativeStorage.setItem('profileImage', newImage);
  }

}
