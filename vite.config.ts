import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: "buffer", // 👈 add this line
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // 👈 polyfill global
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, // 👈 enable Buffer polyfill
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
}));
