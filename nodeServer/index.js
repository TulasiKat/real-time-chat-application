// Node server which will handle socket.io connecions

const io = require("socket.io")(8000);

const users = {};

// io.on means, it is a socket.io instance. it listens multiple socket.io connections.
// socket.on means, it accepts an event. if userjoined event vachindi ante, ah user name in users lo set chestham append chesi.
io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("leave", users[socket.id]);
    delete users[socket.id];
  });
});
