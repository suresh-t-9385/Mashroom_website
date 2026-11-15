// // import react from '@vitejs/plugin-react'
// // import { defineConfig } from 'vite'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })

// // import { defineConfig } from "vite";
// // import react from "@vitejs/plugin-react";
// // import tailwindcss from "@tailwindcss/vite";

// // export default defineConfig({
// //   plugins: [react(), tailwindcss()],
// // });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "node:path";

// export default defineConfig({
//   plugins: [react()],
//   resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
//   build: {
//     target: "es2019",
//     sourcemap: false,
//     cssCodeSplit: true,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           react: ["react", "react-dom", "react-router-dom"],
//           vendor: ["axios", "lucide-react", "react-helmet-async"],
//         },
//       },
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    target: "es2019",
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          vendor: ["axios", "lucide-react", "react-helmet-async"],
        },
      },
    },
  },
});
