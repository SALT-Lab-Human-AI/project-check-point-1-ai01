// vite.config.ts
import { defineConfig } from "file:///G:/Study/UIUC%20IS%20Master/2025%20Fall/Intro%20Gen%20AI%20for%20Human%20AI%20Coll%20IS%20492/Project/project-check-point-1-ai01/hire-shark/node_modules/vite/dist/node/index.js";
import react from "file:///G:/Study/UIUC%20IS%20Master/2025%20Fall/Intro%20Gen%20AI%20for%20Human%20AI%20Coll%20IS%20492/Project/project-check-point-1-ai01/hire-shark/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///G:/Study/UIUC%20IS%20Master/2025%20Fall/Intro%20Gen%20AI%20for%20Human%20AI%20Coll%20IS%20492/Project/project-check-point-1-ai01/hire-shark/node_modules/lovable-tagger/dist/index.js";
import { viteStaticCopy } from "file:///G:/Study/UIUC%20IS%20Master/2025%20Fall/Intro%20Gen%20AI%20for%20Human%20AI%20Coll%20IS%20492/Project/project-check-point-1-ai01/hire-shark/node_modules/vite-plugin-static-copy/dist/index.js";
var __vite_injected_original_dirname = "G:\\Study\\UIUC IS Master\\2025 Fall\\Intro Gen AI for Human AI Coll IS 492\\Project\\project-check-point-1-ai01\\hire-shark";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    viteStaticCopy({
      targets: [
        {
          src: "./node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
          dest: ""
        }
      ]
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJHOlxcXFxTdHVkeVxcXFxVSVVDIElTIE1hc3RlclxcXFwyMDI1IEZhbGxcXFxcSW50cm8gR2VuIEFJIGZvciBIdW1hbiBBSSBDb2xsIElTIDQ5MlxcXFxQcm9qZWN0XFxcXHByb2plY3QtY2hlY2stcG9pbnQtMS1haTAxXFxcXGhpcmUtc2hhcmtcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkc6XFxcXFN0dWR5XFxcXFVJVUMgSVMgTWFzdGVyXFxcXDIwMjUgRmFsbFxcXFxJbnRybyBHZW4gQUkgZm9yIEh1bWFuIEFJIENvbGwgSVMgNDkyXFxcXFByb2plY3RcXFxccHJvamVjdC1jaGVjay1wb2ludC0xLWFpMDFcXFxcaGlyZS1zaGFya1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRzovU3R1ZHkvVUlVQyUyMElTJTIwTWFzdGVyLzIwMjUlMjBGYWxsL0ludHJvJTIwR2VuJTIwQUklMjBmb3IlMjBIdW1hbiUyMEFJJTIwQ29sbCUyMElTJTIwNDkyL1Byb2plY3QvcHJvamVjdC1jaGVjay1wb2ludC0xLWFpMDEvaGlyZS1zaGFyay92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGNvbXBvbmVudFRhZ2dlciB9IGZyb20gXCJsb3ZhYmxlLXRhZ2dlclwiO1xyXG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdGF0aWMtY29weVwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6IFwiOjpcIixcclxuICAgIHBvcnQ6IDgwODAsXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiICYmIGNvbXBvbmVudFRhZ2dlcigpLFxyXG4gICAgdml0ZVN0YXRpY0NvcHkoe1xyXG4gICAgICB0YXJnZXRzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc3JjOiBcIi4vbm9kZV9tb2R1bGVzL3BkZmpzLWRpc3QvYnVpbGQvcGRmLndvcmtlci5taW4ubWpzXCIsXHJcbiAgICAgICAgICBkZXN0OiBcIlwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KSxcclxuICBdLmZpbHRlcihCb29sZWFuKSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxufSkpO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVqQixTQUFTLG9CQUFvQjtBQUNwbEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUNoQyxTQUFTLHNCQUFzQjtBQUovQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixTQUFTLGlCQUFpQixnQkFBZ0I7QUFBQSxJQUMxQyxlQUFlO0FBQUEsTUFDYixTQUFTO0FBQUEsUUFDUDtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
