import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// default vite config
// export default defineConfig({
//   plugins: [react()], // Enables React
//   server: {
//     proxy: {
//       '/api': 'http://localhost:5001', // Proxy API requests to the server
//     },
//   },
// });

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    open: true,
    proxy: {
    // Important for MERN Setup: Here we're establishing a relationship between our two development servers.
    // We are pointing our Vite client-side development server to proxy API requests to our server-side Node server at port 3001.
    // Without this line, API calls would attempt to query for data from the current domain: localhost:3000
    '/graphql': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});