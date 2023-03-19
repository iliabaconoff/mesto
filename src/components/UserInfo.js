class UserInfo {
  constructor(profileElements) {
    this._username = document.querySelector(profileElements.username);
    this._userjob = document.querySelector(profileElements.userjob);
  }

  getUserInfo() {
    this._userData = {};
    this._userData['username'] = this._username.textContent;
    this._userData['userjob'] = this._userjob.textContent;
    return this._userData;
  }

  setUserInfo(values) {
    this._username.textContent = values.username;
    this._userjob.textContent = values.userjob;
  }
}

export default UserInfo;