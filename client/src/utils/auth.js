import decode from 'jwt-decode'

class AuthService {
    getUser() {
        return decode(this.getToken())
    }

    loggedIn() {
        const token = this.getToken();
        // If there is a token and it's not expired return 'true'
        return token && !this.istokenExpired(token) ? true : false;
    }

    istokenExpired(token) {
        // Decode the token to get expiration time
        const decoded = decode(token)
        // If the expiration time is less than the current time, then the token is expired. Return true
        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('id_token');
            return true;
        }
        // If the token is not expired return false
        return false;
    }

    getToken() {
        // Retrieves token from local storage
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        // Set token to local storage
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        // removes user token and profile data from local storage
        localStorage.removeItem('id_token');
        window.location.reload();
    }
}

export default new AuthService()