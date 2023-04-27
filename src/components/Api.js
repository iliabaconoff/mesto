class Api {
    constructor(apiConfig) {
      this._link = apiConfig.link;
      this._headers = apiConfig.headers;
    }
  
    _checkServerResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  
    getUserInfo() {
      return fetch(`${this._link}/users/me`, {
        headers: this._headers,
      })
        .then(res => this._checkServerResponse(res))
    };
  
    setUserInfo({name, about}) {
      return fetch(`${this._link}/users/me `, {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
          name, about
        })
      })
        .then(res => this._checkServerResponse(res))
    };
  
    setUserAvatar({avatar}) {
      return fetch(`${this._link}/users/me/avatar`, {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({avatar})
      })
        .then(res => this._checkServerResponse(res))
    };
  
    getInitialCards() {
      return fetch(`${this._link}/cards`, {
        headers: this._headers,
      })
        .then(res => this._checkServerResponse(res))
    };
  
    createCard({name, link}) {
      return fetch(`${this._link}/cards`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({
          name, link
        })
      })
      .then(res => this._checkServerResponse(res))
    };
  
    deleteCard(cardId) {
      return fetch(`${this._link}/cards/${cardId}`, {
        headers: this._headers,
        method: 'DELETE',
  
      })
        .then(res => this._checkServerResponse(res))
    };
  
    putCardLike(cardId) {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'PUT'
      })
        .then(res => this._checkServerResponse(res))
    };
  
    deleteCardLike(cardId) {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'DELETE'
      })
        .then(res => this._checkServerResponse(res))
    };
  
  }
  
  export default Api;