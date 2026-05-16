import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Emit initial mock data
  const baseMetrics = {
    throughput: 12450,
    activeVessels: 12,
    efficiency: 94,
    revenue: 1250000
  };

  socket.emit('dashboard_metrics', baseMetrics);

  // Simulate Live Dashboard Updates (every 3 seconds)
  const dashboardInterval = setInterval(() => {
    // fluctuate values slightly
    baseMetrics.throughput += Math.floor(Math.random() * 100) - 50;
    if (Math.random() > 0.8) {
      baseMetrics.activeVessels += Math.floor(Math.random() * 3) - 1;
    }
    baseMetrics.efficiency = Math.min(100, Math.max(80, baseMetrics.efficiency + (Math.random() * 2 - 1)));
    baseMetrics.revenue += Math.floor(Math.random() * 5000);

    socket.emit('dashboard_metrics', {
      ...baseMetrics,
      efficiency: parseFloat(baseMetrics.efficiency.toFixed(1))
    });
  }, 3000);

  // Simulate Real-time Notifications (every 10 seconds)
  const notifications = [
    { type: 'alert', title: 'High Wind Warning', message: 'Wind speeds exceeding 30 knots at Dock 4.', severity: 'high' },
    { type: 'info', title: 'Vessel Arrived', message: 'MSC Isabella has arrived at Berth 2.', severity: 'medium' },
    { type: 'success', title: 'Cargo Cleared', message: 'Customs cleared 150 containers for CMA CGM Antoine.', severity: 'low' },
    { type: 'alert', title: 'Delay Detected', message: 'Expected delay of 2 hours for incoming bulk carrier.', severity: 'medium' }
  ];

  const notificationInterval = setInterval(() => {
    if (Math.random() > 0.4) {
      const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
      socket.emit('notification', {
        id: Date.now(),
        ...randomNotif,
        timestamp: new Date().toISOString(),
        isRead: false
      });
    }
  }, 10000);

  // Simulate Vessel Activity Monitoring (every 5 seconds)
  const vessels = ['MSC Isabella', 'Ever Given', 'CMA CGM Antoine', 'Maersk Mc-Kinney', 'Hapag-Lloyd Express'];
  const statuses = ['In Transit', 'Docked', 'Loading', 'Unloading', 'Departed'];

  const vesselInterval = setInterval(() => {
    socket.emit('vessel_activity', {
      id: Date.now(),
      vesselName: vessels[Math.floor(Math.random() * vessels.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: new Date().toISOString()
    });
  }, 5000);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    clearInterval(dashboardInterval);
    clearInterval(notificationInterval);
    clearInterval(vesselInterval);
  });
});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on http://localhost:${PORT}`);
});
