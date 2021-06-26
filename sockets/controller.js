const tickets = [];
const publico = [];

const socketController = (socket) => {
  console.log(`Usuario conectado ${socket.id}`);

  socket.emit("valor-totalTickets", tickets.length);
  socket.emit("traer-publicoTicket", publico)

  socket.on("crearNuevo-ticket", (payload, callback) => {
    const total_tickets = tickets.length + 1;
    tickets.push(total_tickets);
    socket.broadcast.emit("valor-totalTickets", tickets.length);
    callback(tickets.length);
  });

  socket.on("agarrar-ticket", (payload, callback) => {
    let ticket_actual = tickets[0];
    tickets.shift();
    socket.emit("ticket-actual", ticket_actual);
    callback(ticket_actual);
  });

  socket.on("ticket-traido", (payload, callback) => {
    callback(tickets.length);
    socket.broadcast.emit("total-tickets", tickets.length);
  });

  socket.on('escritorio', (payload) => {
      publico.push(payload)
      socket.broadcast.emit("publico", publico)
  })
};

export { socketController };