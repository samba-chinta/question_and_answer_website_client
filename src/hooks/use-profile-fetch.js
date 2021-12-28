const useProfileFetch = async (payload) => {
  await fetch(payload.url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: payload.email
    }),
  })
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default useProfileFetch;
