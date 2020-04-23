// pages/zcmu/home/home.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
    menus: [
      {
        title: "账号", // 显示用
        name: "login", // 对应的页面, 菜单会跳转到对应的页面
        color: "green", // 菜单项的背景颜色
        icon: "settings" // 菜单项的图标
      },
      {
        title: "成绩",
        name: "score",
        color: "mauve",
        icon: "list"
      },
      {
        title: "新闻",
        name: "news",
        color: "red",
        icon: "news"
      }
    ], // 菜单的列表项
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
