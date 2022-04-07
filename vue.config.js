module.exports = {
  pages: {
    index: {
      entry: "src/index/main.js",
      template: "public/index.html",
      title: "GMK",
    },
    admin: {
      entry: "src/admin/main.js",
      template: "public/index.html",
      title: "Admin Page",
    },
    blogs: {
      entry: "src/index/pages/blogs/main.js",
      template: "public/index.html",
      title: "Blogs",
    },
    events: {
      entry: "src/index/pages/events/main.js",
      template: "public/index.html",
      title: "Events",
    },
    teams: {
      entry: "src/index/pages/teams/main.js",
      template: "public/index.html",
      title: "Teams",
    },
  },
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  transpileDependencies: ["quasar"],
};
