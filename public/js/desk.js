const lblPending = document.querySelector('#lbl-pending');



async function loadInitialCount() {
  const pending = await fetch('/api/tickets/pending').then( res => res.json() );
  lblPending.textContent = pending.length ?? 0;
}


//* Conectamos ws

function connectToWebSockets() {
    const socket = new WebSocket( 'ws://localhost:3000/ws' );

    socket.onmessage = ( event ) => {
      console.log(event.data); //TODO: on-ticket-count-changed
    };

    socket.onclose = ( event ) => {
      console.log( 'Connection closed' );
      setTimeout( () => {
        console.log( 'retrying to connect' );
        connectToWebSockets();
      }, 1500 );

    };

    socket.onopen = ( event ) => {
      console.log( 'Connected' );
    };
}

connectToWebSockets();



loadInitialCount();