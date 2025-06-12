export function store(data) {
    localStorage.setItem('user', JSON.stringify(data));
}

export function storeUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

export function getUsers(){
    return JSON.parse(localStorage.getItem('users'));
}

export function getUser(){
    return JSON.parse(localStorage.getItem('user'));
}

export function clearUser() {
    localStorage.removeItem('user');
}
export function isUserLoggedIn() {
    const user = getUser();
    return user && user.id ? true : false;
}