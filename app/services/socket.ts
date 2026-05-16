class MockSocket {
  listeners: Record<string, Function[]> = {};

  on(event: string, callback: Function) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  off(event: string) {
    this.listeners[event] = [];
  }

  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }
}

export const socket = new MockSocket() as any;

// Simulate Backend Server (server.js) entirely in the browser for GitHub Pages
if (typeof window !== 'undefined') {
  // 1. Live Metrics Simulation
  setInterval(() => {
    socket.emit('dashboard_metrics', {
      activeVessels: 12 + Math.floor(Math.random() * 5),
      dockEfficiency: 85 + Math.floor(Math.random() * 10),
      cargoVolume: 450 + Math.floor(Math.random() * 50),
      revenue: 1.2 + Math.random() * 0.3
    });
  }, 3000);

  // 2. Random Notifications Simulation
  const notificationTypes = [
    { title: 'High Wind Warning', msg: 'Operations at Berth 4 suspended.', type: 'alert', priority: 'high' },
    { title: 'Vessel Arrival', msg: 'MSC Isabella has entered the harbor.', type: 'arrival', priority: 'medium' },
    { title: 'Maintenance Done', msg: 'Crane 2 is back online.', type: 'maintenance', priority: 'low' },
    { title: 'Payment Received', msg: 'Invoice #4401 settled.', type: 'billing', priority: 'low' }
  ];

  setInterval(() => {
    if (Math.random() > 0.6) {
      const randomNotif = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      socket.emit('notification', {
        id: `notif-${Date.now()}`,
        ...randomNotif,
        timestamp: new Date().toISOString(),
        read: false
      });
    }
  }, 10000);

  // 3. Live Vessel Activity Logs
  const vesselNames = ['Ever Given', 'MSC Gulsun', 'CMA CGM Jacques', 'Maersk Mc-Kinney', 'HMM Algeciras'];
  const actions = ['Docked at Berth A', 'Departed from Port', 'Began Loading Cargo', 'Awaiting Clearance'];
  
  setInterval(() => {
    if (Math.random() > 0.5) {
      socket.emit('vessel_activity', {
        id: Date.now(),
        vessel: vesselNames[Math.floor(Math.random() * vesselNames.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        time: new Date().toISOString()
      });
    }
  }, 8000);
}
