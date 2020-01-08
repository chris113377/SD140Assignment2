if ('serviceWorker' in navigator) {

  window.addEventListener("load", () => {
    navigator.serviceWorker
    .register('./sw.js')
    .then(res => console.log('Service worker registered!', res))
    .catch(err => console.log('Not working', err));
  })
}


