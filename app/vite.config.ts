import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';
import type { Pages, Rewrite } from 'vite-plugin-mpa-plus';
import mpaPlugin from 'vite-plugin-mpa-plus';

const { resolve } = path;

const entrys = ['admin', 'app', 'preview'];
const rewrites: Rewrite[] = [];
const pages = entrys.reduce<Pages>((result, pageName) => {
  result[pageName] = {
    entry: resolve(__dirname, `src/entries/${pageName}/index.tsx`),
    filename: `${pageName}.html`,
    template: `${pageName}.html`,
  };
  rewrites.push({
    from: new RegExp(`^/${pageName}($|/.*)$`), // 修改正则表达式
    to: `/${pageName}.html`,
  });
  return result;
}, {});

// 在最后添加一个通用的回退规则
entrys.forEach((pageName) => {
  rewrites.push({
    from: new RegExp(`^/${pageName}.*`),
    to: `/${pageName}.html`,
  });
});

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      template: 'treemap', // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyse.html', // will be saved in project's root
    }) as PluginOption,

    mpaPlugin({
      pages,
      historyApiFallback: {
        rewrites,
        index: '/admin.html',
      },
    }),
  ],
  build: {
    outDir: '../server/src/NocoX.HttpApi.Host/wwwroot/',
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      input: {
        admin: 'admin.html',
        app: 'app.html',
        preview: 'preview.html',
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // 其他 node_modules 依赖打包到 vendor
          } else {
            if (id.includes('icons')) return 'vendor-icons';
          }
        },
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
      },
    },
  },
  server: {
    open: '/',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
