class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // обработчик респонсов сервера
    _handleResponse(res){
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error! : ${res.status}`)
        }

    }

    // получение начальных данных от пользователя
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._handleResponse)
    }


    // получение серверных карточек
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: this._headers
            }
        )
            .then(this._handleResponse)
    }

    //установка данных профиля
    patchUserProfile(data) {
        return fetch(`${this._baseUrl}/users/me`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    about: data.about
                })
            })
            .then(this._handleResponse)
    }

    // смена аватара
    patchAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`,  {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                /*avatar: avatar.link*/
                avatar: avatar.avatar
            })
        })
            .then(this._handleResponse)
    }

    postUserCard(item) {
        return fetch(`${this._baseUrl}/cards`,  {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,
                link: item.link
            })
        })
            .then(this._handleResponse)
    }

    // лайк
    putLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers
            }
        )
            .then(this._handleResponse)
    }

    // удалить лайк
    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers
            }
        )
            .then(this._handleResponse)
    }

    // удалить карточку
    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`,  {
                method: 'DELETE',
                headers: this._headers
            }
        )
            .then(this._handleResponse)
    }
}
export const api = new Api({ baseUrl:'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
        authorization: '3aa61c49-fdf8-469f-ac89-ecfdfa4ec988',
        'Content-Type': 'application/json'
    }
});

export default api;