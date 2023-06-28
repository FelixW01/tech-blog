async function logout() {
    const response = await fetch('/api/user/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        document.location.replace('/')
        alert('Successfuly logged out.');
    } else {
        alert('Failed to log out.');
    }
}
document.querySelector('#logout').addEventListener('click', logout)