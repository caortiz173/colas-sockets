const socket = io();

const nuevo_ticket = document.querySelector("#crearNuevo-ticket");
const generar_ticket = document.querySelector("#ticket-generar");

socket.on("valor-totalTickets", (payload) => {
  nuevo_ticket.innerText = `Ticket ${payload}`;
});

generar_ticket.addEventListener("click", () => {
  socket.emit("crearNuevo-ticket", null, (ticket) => {
    nuevo_ticket.innerText = `Ticket ${ticket}`;
  });
});