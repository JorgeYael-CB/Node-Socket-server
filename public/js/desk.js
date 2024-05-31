const lblPending = document.querySelector('#lbl-pending');
const deskHeader = document.querySelector('h1');
const currentTicketLabel = document.querySelector('small')

const noMoreAlert = document.querySelector('.alert-info');
const searchParams = new URLSearchParams( window.location.search );

const btnDraw = document.querySelector('#btn-draw');
const btnDone = document.querySelector('#btn-done');



if( !searchParams.has('escritorio') ) {
  window.location = 'index.html';
  throw new Error('escritorio is required');
};


const deskNumber = searchParams.get('escritorio');
let currentTicket = null;
deskHeader.textContent = `${deskNumber}`;


function checkTicketsCount( initialCount ) {
  if( initialCount === 0 ){
    noMoreAlert.classList.remove('d-none');
  } else {
    noMoreAlert.classList.add('d-none');
  }

  lblPending.textContent = initialCount;
}

async function loadInitialCount() {
  const pending = await fetch('/api/tickets/pending').then( res => res.json() );
  console.log(pending.length)
  checkTicketsCount(pending.length);
}


async function getTicket() {
  const {status, ticket, message} = await fetch(`/api/tickets/draw/${deskNumber}`).then( res => res.json() );

  if( status === 'error' ){
    currentTicketLabel.textContent = message;
    return;
  }

  currentTicket = ticket;
  currentTicketLabel.textContent = ticket.number;
}


async function finishTicket() {
  if( currentTicket ){
    const {status, message} = await fetch(`/api/tickets/done/${currentTicket.id}`, {method: 'PUT'}).then( res => res.json() );

    if( status === 'error' ){
      currentTicketLabel.textContent = message;
      return;
    };

    alert(`Ticket ${currentTicket.number} finished`);
    currentTicket = null;
    currentTicketLabel.textContent = 'Atiende a alguien'
  } else {
    alert(`No tienes un ticket en cola`)
  }
};




//* Conectamos ws

function connectToWebSockets() {
    const socket = new WebSocket( 'ws://localhost:3000/ws' );

    socket.onmessage = ( event ) => {
      const payload = JSON.parse( event.data );

      if( payload.type === 'on-ticket-count-changed' ) {
        loadInitialCount();
      }
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

btnDraw.addEventListener('click', getTicket);
btnDone.addEventListener('click', finishTicket);


connectToWebSockets();
loadInitialCount();