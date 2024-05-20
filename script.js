window.addEventListener('load', function() {
    registerServiceWorker();
});

// Richiesta di autorizzazione per le notifiche push
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                console.log('Autorizzazione alle notifiche push ottenuta.');
                registerServiceWorker(); // Registra il Service Worker
            }
        });
    }
}

// Funzione per inviare una notifica push
function sendNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification('Il Corso di Inglese Chiama!', {
                body: 'Oggi dalle 14:30 fino alle 18:30 hai il corso di inglese.',
                icon: 'dublino-hd.jpg'
            });
        });
    }
    registerServiceWorker(); // Aggiungi questa riga per registrare il Service Worker
}

// Funzione per controllare se una nuova data è stata aggiunta al file dates.txt
function checkNewDate() {
    // Effettua una richiesta AJAX per ottenere il contenuto del file dates.txt
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'dates.txt', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var dates = xhr.responseText.split('\n');
            // Controlla se l'ultima data nel file è diversa dall'ultima data salvata nel localStorage
            var lastDate = localStorage.getItem('lastDate');
            if (dates[dates.length - 1] !== lastDate) {
                localStorage.setItem('lastDate', dates[dates.length - 1]);
                sendNotification();
            }
        }
    };
    xhr.send();
}

// Registra il Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('Service Worker registrato con successo:', registration);
            })
            .catch(function(error) {
                console.log('Errore durante la registrazione del Service Worker:', error);
            });
    }
}

// Controlla se il browser supporta le notifiche push
if ('Notification' in window) {
    // Richiedi l'autorizzazione per le notifiche push
    requestNotificationPermission();

    // Controlla periodicamente se una nuova data è stata aggiunta al file dates.txt
    setInterval(checkNewDate, 24 * 60 * 60 * 1000); // Controlla ogni 24 ore
}

// Funzione per testare la notifica push manualmente
function testNotification() {
    registerServiceWorker(); // Aggiungi questa riga per registrare il Service Worker
    sendNotification();
}
