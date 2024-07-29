function usePageElements() {
  const loader = document.getElementById('loader');
  const successScreen = document.getElementById('success-screen');
  const errorScreen = document.getElementById('error-screen');

  if (!loader || !successScreen || !errorScreen)
    throw new Error('Missing element(s)');

  return {
    loader,
    successScreen,
    errorScreen,
  };
}

function setLoading(isLoading) {
  const { loader } = usePageElements();

  if (isLoading) {
    loader.style.display = 'flex';
  } else {
    loader.style.display = 'none';
  }
}

function verifyEmail() {
  setLoading(true);
  return fetch(location.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => Promise.reject())
    .finally(() => setLoading(false));
}

function initialize() {
  const { successScreen, errorScreen } = usePageElements();

  verifyEmail()
    .then(({ status }) => {
      if (status !== 200) throw new Error();
      successScreen.style.display = 'block';
    })
    .catch(() => {
      errorScreen.style.display = 'block';
    });
}

window.addEventListener('load', initialize);
