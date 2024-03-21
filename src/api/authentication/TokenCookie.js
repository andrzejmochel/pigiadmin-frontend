import Cookies from 'js-cookie';
class TokenCookie {
    setToken (token) {
        const expiration= new Date(new Date().getTime() + 1000 * 60 * 45);
        Cookies.set('token', token, { expires: expiration, secure: true });
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
