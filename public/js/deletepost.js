const deleteFormHandler = async event => {
    event.preventDefault();
    const url = window.location.toString().split('/');
    const postId = url[url.length - 1];

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Something went wrong!')
    }
}
document
    .querySelector('#delete-btn')
    .addEventListener('click', deleteFormHandler);