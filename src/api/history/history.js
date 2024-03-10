import { createBrowserHistory, createHashHistory } from 'history';

let history = createBrowserHistory();

export const initHistory = () => {
    history = createBrowserHistory();
    return history;
}
export default history;