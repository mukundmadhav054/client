import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Container, TextField, Typography, Button } from "@mui/material";

const App = () => {
  console.log(import.meta.env)
  const socket = useMemo(() => {
    return io("https://server-ltng.onrender.com/");
  }, []);

  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("received-message", (data) => {
      console.log(data);
    });
    socket.on("welcome", (s) => {
      console.log(s);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Enter Message"
          variant="outlined"
          sx={{ width: "50%" }}
        />
        <Button type="submit" variant="contained" color="primary" size="sm">
          Send
        </Button>
      </form>
    </Container>
  );
};

export default App;
