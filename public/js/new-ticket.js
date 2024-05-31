const newTicket = document.querySelector('.btn-secondary');
const newTicketText = document.querySelector('#lbl-new-ticket');

const apiUrl = 'http://localhost:3000/api';
let isLoading = false;


//* Eventos
newTicket.addEventListener('click', onCreateTicket);


const showLastTicket = async() => {
    if( !isLoading ){
        const res = await fetch(`${apiUrl}/tickets/last`);
        const lastTicket = await res.json();

        newTicketText.textContent = `${lastTicket}`;
    } else {
        newTicketText.textContent = 'Loading...';
    }
};


async function onCreateTicket() {
    if( isLoading ) return console.log('Wait...');

    isLoading = true;
    showLastTicket();

    await fetch(`${apiUrl}/tickets`, {
        method: 'POST'

    });

    isLoading = false;
    showLastTicket();
};



showLastTicket();