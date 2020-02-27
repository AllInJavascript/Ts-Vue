module.exports = {
  devServer: {
    before(app) {
      //app指的是 express实例 
      app.get('/api/list', (req, res) => {
        res.json([
          { id: 1, name: "类型注解", desc: "2.0" },
          { id: 2, name: "编译型语言", desc: "1.0" }
        ])
      })
    }
  }
}
