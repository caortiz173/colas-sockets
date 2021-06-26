const socket = io();
// Tomamos el elemento del DOM
const nuevo_escritorio = document.querySelector("#nombre-escritorio");
const alerta = document.getElementById("alerta_descuento");
const tickets = document.getElementById("tickets");
const atender = document.getElementById("atendiendo_ticket");
const ticket_actual = document.getElementById("ticket-actual");

// Generamos el evento del boton atender siguiente ticket
atender.addEventListener("click", () => {
  socket.emit("agarrar-ticket", null, (ticket) => {
    if (ticket == null) {
      ticket_actual.innerText = `Ticket ...`;
      alerta.style.display = "inline-block";
    } else {
      ticket_actual.innerText = `Ticket ${ticket}`;
      let publico = [];
      publico.push(escritorio);
      publico.push(ticket_actual.textContent);
      socket.emit("escritorio", publico);
    }
  });
  socket.emit("ticket-traido", null, (a) => {
    tickets.innerText = `${a}`;
  });
  
  if (tickets.textContent == 1) {
    tickets.style.display = "none";
  }
});
alerta.style.display = "none";


socket.on("total-tickets", (payload) => {
  tickets.innerText = `${payload}`;
});

const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has("escritorio")) {
  throw new Error("El escritorio es obligatorio");
}
const escritorio = searchParams.get("escritorio");
nuevo_escritorio.innerText = `${escritorio}`;