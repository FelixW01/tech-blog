const commentFormHandler = async event => {
    event.preventDefault();
    const comment = document.querySelector('textarea[name="comment-body"]').value.trim();
    const url = window.location.toString().split('/');
    const postId = url[url.length - 1];

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            comment,
            postId
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Something went wrong!')
    }
}
document
    .querySelector('#comment-form')
    .addEventListener('submit', commentFormHandler);