function usePageElements() {
  const loader = document.getElementById('loader');
  const successScreen = document.getElementById('success-screen');
  const errorScreen = document.getElementById('error-screen');
  const recoverPasswordScreen = document.getElementById(
    'recover-password-screen',
  );
  const recoverPasswordForm = document.getElementById('recover-password-form');
  const passwordInput = document.getElementById('password-input');
  const confirmPasswordInput = document.getElementById(
    'confirm-password-input',
  );
  const recoverPasswordButton = document.getElementById(
    'recover-password-button',
  );

  if (
    !loader ||
    !successScreen ||
    !errorScreen ||
    !recoverPasswordScreen ||
    !recoverPasswordForm ||
    !passwordInput ||
    !confirmPasswordInput ||
    !recoverPasswordButton
  )
    throw new Error('Missing element(s)');

  return {
    loader,
    successScreen,
    errorScreen,
    recoverPasswordScreen,
    recoverPasswordForm,
    passwordInput,
    confirmPasswordInput,
    recoverPasswordButton,
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

function handleRecoverPassword(newPassword) {
  setLoading(true);
  return fetch(location.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newPassword ? JSON.stringify({ newPassword }) : undefined,
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => Promise.reject())
    .finally(() => setLoading(false));
}

function handleRecoverPasswordSubmit(event) {
  event.preventDefault();
  const {
    passwordInput,
    confirmPasswordInput,
    recoverPasswordScreen,
    successScreen,
    errorScreen,
  } = usePageElements();

  if (passwordInput.value.length < 8) {
    alert('Password must be at least 8 characters long');
    return;
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    alert('Passwords do not match');
    return;
  }

  recoverPasswordScreen.style.display = 'none';

  handleRecoverPassword(passwordInput.value)
    .then(({ status }) => {
      if (status !== 200) throw new Error();
      successScreen.style.display = 'block';
    })
    .catch(() => {
      errorScreen.style.display = 'block';
    });
}

function initialize() {
  const { recoverPasswordScreen, recoverPasswordForm, errorScreen } =
    usePageElements();

  if (recoverPasswordForm) {
    recoverPasswordForm.addEventListener('submit', handleRecoverPasswordSubmit);
  }

  handleRecoverPassword()
    .then(({ status }) => {
      if (status !== 200) throw new Error();
      recoverPasswordScreen.style.display = 'block';
    })
    .catch(() => {
      errorScreen.style.display = 'block';
    });
}

window.addEventListener('load', initialize);
