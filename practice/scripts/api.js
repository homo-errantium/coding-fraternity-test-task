const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

    function checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`${res.status} ${res.statusText}`);
        }
    }

const getPosts = async () => {
  try {
    const res = await fetch(baseUrl).then((response) => checkResponse(response));
    console.log(res);
      return res;
  } catch (err) {
      console.error(err);
  }
};
