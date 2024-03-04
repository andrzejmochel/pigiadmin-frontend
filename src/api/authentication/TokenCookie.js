import Cookies from 'js-cookie';
class TokenCookie {
    setToken (token) {
        Cookies.set('token', token, { expires: 7, secure: true });
    }

    getToken () {
        return Cookies.get('token')
    }

    isToken () {
        return Cookies.get('token') != null;
    }

    cleanToken () {
        Cookies.remove('token')
    };
}

const tokenCookie = new TokenCookie();
export default tokenCookie;
