const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    //Store the triggered event
    window.deferredPrompt = event;

    //Removes hidden class from button
    butInstall.classList.toggle('hidden', false);
});

//Implement click handler event on butinstall element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();
//reset deferred prompt
  window.deferredPrompt = null;

  butInstall.classList.toggle('hidden', true);
});


//Adding event handler to appinstalled
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
