const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

    function checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`${res.status} ${res.statusText}`);
        }
    }

const getPosts = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url).then(res => res.json()).then(data => resolve(data)).catch(err=> reject(err))
  })
}
