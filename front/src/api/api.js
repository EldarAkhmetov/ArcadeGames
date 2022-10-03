const apiUrl = 'http://localhost:2999/';

export class Api {

    static get = (url) => {
        return fetch(apiUrl + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
    }

    static post = (url, data = {}) => {
        return fetch(apiUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
    }

    static getStats = (login) => {
        return this.post('myStats', {login});
    }

    static getBestPlayers = () => {
        return this.get('bestPlayers');
    }

    static signIn = (login, password) => {
        return this.post('signIn', {login, password});
    }

    static signUp = (login, password) => {
        return this.post('signUp', {login, password});
    }

    static startGame = (login, cages) => {
        return this.post('start', {login, cages});
    }
    static finishGame = (login) => {
        return this.post('finish', {login});
    }
    static hit = (login, coord) => {
        return this.post('hit', {login, coord});
    }

    static finishFifteen = (login, moves) => {
        return this.post('finishFifteen', {login, moves});
    }

    static finishMinesweeper = (login, fieldSize, isWin) => {
        return this.post('finishMinesweeper', {login, fieldSize, isWin});
    }
}