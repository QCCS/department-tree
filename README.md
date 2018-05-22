# yitu-question

原生js实现部门树

表格过滤

不依赖任何插件

使用方式与功能简单说明

```javascript
  //配置部门树
     var optionsTree = {
         data: rootGroup,
         wrapId: "depRoot",
         afterClickHook: afterClickHook,
         afterExpandHook: afterExpandHook,
         //是否单选
         isSingleSelected: false
         //是否显示checkbox
         //展开的回调,hook函数
         //... ...
     }
     //配置表格
     var optionsTable = {
         data: [],
         wrapId: "userTable",
         //其他以后扩展
     }
     //创建对象
     var DepartmentTreeTest = new DepartmentTree(optionsTree);
     var UserTableTest = new UserTable(optionsTable);
 
     function afterClickHook(users) {
         // 设置与渲染表格数据
         UserTableTest.setData(users);
         //部门树也可以重新设置数据，进行渲染
         // DepartmentTreeTest.setData(rootGroup1);
     }
     function afterExpandHook(res) {
         console.log(res)
     }
```
