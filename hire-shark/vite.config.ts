import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  return {
    base: isProduction ? "/project-check-point-1-ai01/" : "/",
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      viteStaticCopy({
        targets: [
          {
            src: "./node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
            dest: "",
          },
        ],
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: [],
    },
  };
});
