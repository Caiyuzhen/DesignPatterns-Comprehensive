# 传统写法
## 绑定事件处理函数
   1. 增加项
      - 修改列表数据
      - 根据列表数据更改视图
   2. 删除项
      - 修改列表数据
      - 根据列表数据更改视图
   3. 改变状态
      - 修改列表数据
      - 根据列表数据更改视图


# 设计模式 
## 面向对象的方式、具备类的继承(由底层往上去继承, 由于父类执行子类的方法）、横向切割程序
   1. 程序的分类:
      - 外层(app.ts): 浏览器的事件 -> 绑定事件处理程序
      - 模板(TodoTemplate): todoView 模板字符串 -> 接收参数, 生成视图
      - 视图层(TodoDOM): 根据数据的变化，更改视图(addItem、deleteItem、toggleComplete)
      - 数据层(TodoModelEvent): 数据的增删改查(addTodo、deleteTodo、toggleComplete)


