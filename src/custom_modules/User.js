import { auth, database } from 'firebase';

/**
 * Signs user in through firebase authentication
 * @param  email
 * @param  password
 * @return {[Promise]} wraps the Promise from Firebase
 */
function signIn(credentials) {
  const { email, password } = credentials;
  return new Promise((resolve, reject) => {
    auth().signInWithEmailAndPassword(email, password)
      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        // Handle Errors here.
        reject(error);
      });
  });
}

function createAccount(credentials) {
  const {
    email,
    password,
    firstName,
    lastName,
    userName,
  } = credentials;
  return new Promise((resolve, reject) => {
    let userData;
    auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const { user } = response;
        userData = {
          userName,
          firstName,
          lastName,
          email: user.email,
          uid: user.uid,
        };
        database().ref(`users/${user.uid}`)
          .set(userData);
      })
      .then(() => {
        resolve(userData);
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

export default { signIn, createAccount, signOut };
