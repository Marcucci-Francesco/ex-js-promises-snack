/*
🏆 Snack 1
Ottieni il titolo di un post con una Promise.

Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}
🎯 Bonus: Ottieni l'intero post con l'autore
Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.
*/

const getPostTitle = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.title) {
          resolve(data.title)
        } else {
          reject('Post non trovato')
        }
      })
  })
}

getPostTitle(2)
  .then(title => console.log(title))
  .catch(error => console.error(error))

//BONUS

const getPost = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(response => response.json())
      .then(post => {
        fetch(`https://dummyjson.com/users/${post.userId}`)
          .then(response => response.json())
          .then(user => {
            const postWithUser = {
              ...post,
              user: user
            }
            resolve(postWithUser)
          })
          .catch(error => {
            reject(`Errore nel recupero dell\'autore: ${error.message}`)
          })
      })
      .catch(error => {
        reject(`Post non trovato: ${error.message}`)
      })
  })
}


getPost(2)
  .then(post => {
    console.log(post);
    console.log(`Post: ${post.title}, Autore: ${post.user.firstName} ${post.user.lastName}`);
  })
  .catch(error => console.error(error))


/*
🏆 Snack 2
Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.
🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".
*/


const lanciaDado = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      const stuck = Math.random() < 0.2;
      if (stuck) {
        reject('Il dado si è incastrato!')
      } else {
        resolve(randomNumber)
      }
    }, 3000)
  })
}

lanciaDado()
  .then(result => console.log(`Risultato: ${result}`))
  .catch(error => console.error(error))


//Bonus
const creaLanciaDado = () => {
  let ultimoRisultato = null;

  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        const stuck = Math.random() < 0.2;

        if (stuck) {
          reject('Il dado si è incastrato!')
        } else if (randomNumber === ultimoRisultato) {
          console.log('Incredibile!');
          resolve(randomNumber)
        } else {
          console.log(`Nuovo risultato: ${randomNumber}`);
          resolve(randomNumber);
        }

        ultimoRisultato = randomNumber;
      }, 3000)
    })
  }
}

const lanciaDadoClosure = creaLanciaDado()

lanciaDadoClosure()
  .then(result => console.log(`Risultato: ${result}`))
  .catch(error => console.error(error))