const divInstall = document.querySelector('.divInstall');
const butInstall = document.querySelector('.butInstall');


if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('Service Worker is registered',reg))
        .catch((err) => console.log('Service Worker is not registered',err));
}

window.addEventListener('beforeinstallprompt', (event) => {
    console.log('👍', 'beforeinstallprompt', event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container
    divInstall.classList.toggle('hidden',false);
    });
    butInstall.addEventListener('click', async () => {
    console.log('👍', 'butInstall-clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
    // The deferred prompt isn't available.
    return ;
    }
    // Show the install prompt.
    promptEvent.prompt();
    console.log("Prompt returned")
    // Log the result
    const result = await promptEvent.userChoice;
    console.log('👍', 'userChoice', result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    divInstall.classList.toggle('hidden',true);
    });
    window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
    });
