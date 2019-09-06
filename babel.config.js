module.exports = {
  presets: ["@vue/app"],
  //  plugins: [
  //    [
  //      "import",
  //      { libraryName: "ant-design-vue", libraryDirectory: "es", style: false }
  //    ]
  //  ],
  plugins: [
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
  ],
  plugins: [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
};
