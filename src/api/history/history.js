import { createHashHistory } from 'history';

let history = createHashHistory();

export const initHistory = () => {
    history = createHashHistory();
    return history;
}
export default history;