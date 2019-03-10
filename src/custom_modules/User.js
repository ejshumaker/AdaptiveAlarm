import { auth } from 'firebase';

/**
 * Signs user in through firebase authentication
 * @param  email
 * @param  password
 * @return {[Promise]} wraps the Promise from Firebase
 */
function signIn(email, password) {
  return new Promise((resolve, reject) => {
    auth().signInWithEmailAndPassword(email, password)
      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        // Handle Errors here.
        reject(error.message);
      });
  });
}

function signUp(credentials) {
  const {
    email,
    password,
    // firstName,
    // lastName,
    // userName,
  } = credentials;
  return new Promise((resolve, reject) => {
    auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        resolve({
          uid: user.uid,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function signOut() {
  return new Promise((resolve, reject) => {
    auth().signOut()
      .then(resolve(true))
      .catch(reject(new Error('Sign Out Failed')));
  });
}

export default { signIn, signUp, signOut };
