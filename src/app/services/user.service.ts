import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, ResponseContentType} from '@angular/http';
import { AppConfig } from '../app.config';
import {Observable} from 'rxjs/Rx';
import {DomSanitizer} from '@angular/platform-browser';



@Injectable()
export class UserService {
  constructor(private http: Http, private config: AppConfig) { }

  getUserInfo(_id: number): Observable<any> {
    return this.http.get(this.config.apiUrl + '/api/user/' + _id);
  }

  changePassword(model) {
    return this.http.post(this.config.apiUrl + '/api/account/change-pass',
      {'oldpassword': model.OldPassword, 'newpassword': model.NewPassword, 'confirmpassword': model.ConfirmPassword },
      this.Token()).map((response: Response) => response.json());
  }

  changeEmail(model) {
    return this.http.post(this.config.apiUrl + '/api/account/change-email',
      {'currentpassword': model.CurrentPassword, 'newemail': model.NewEmail},
      this.Token()).map((response: Response) => response.json());
  }

  register(user) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.config.apiUrl + '/api/account/register', user, options).
    map((response: Response) => response.json());
  }

  updateCurrentUser(id, user) {
    return this.http.put(this.config.apiUrl + '/api/account/change-info/' + id, user, this.Token()).
    map((response: Response) => {response.json(); });
  }

  uploadUserProfileImage(image, id) {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
      return this.http.post(this.config.apiUrl + '/api/user/' + id + '/SaveImg', formData, this.Token())
        .map(res => res.json())
        .catch(error => Observable.throw(error));
  }


  private Token() {
    const currentUser = localStorage.getItem('currentUserToken');
    if (currentUser) {
      const headers = new Headers({ 'Token': currentUser});
      return new RequestOptions({ headers: headers });
    }
  }
}
