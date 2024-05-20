// Richiesta di autorizzazione per le notifiche push
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                console.log('Autorizzazione alle notifiche push ottenuta.');
            }
        });
    }
}

// Funzione per inviare una notifica push
function sendNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
        var notification = new Notification('Il Corso di Inglese Chiama!', {
            body: 'Oggi dalle 14:30 fino alle 18:30 hai il corso di inglese.',
            icon: 'dublino-hd.jpg'
        });
    }
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

// Controlla se il browser supporta le notifiche push
if ('Notification' in window) {
    // Richiedi l'autorizzazione per le notifiche push
    requestNotificationPermission();

    // Controlla periodicamente se una nuova data è stata aggiunta al file dates.txt
    setInterval(checkNewDate, 24 * 60 * 60 * 1000); // Controlla ogni 24 ore
}

// Funzione per testare la notifica push manualmente
function testNotification() {
    sendNotification();
}
