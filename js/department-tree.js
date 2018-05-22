/**
 * Created by zhouli on 18/5/22
 */
//下面写一个显示部门树的对象
function DepartmentTree(options) {
    //数据
    this.treeData = options.data;
    //选择了的部门
    this.selectedDep = [];
    //容器id
    var id = options.wrapId;
    //点击之后回调函数
    this.afterClickHook = options.afterClickHook;
    this.isSingleSelected = options.isSingleSelected;

    var that = this;
    //这里主要添加一下id
    this._resetData = function (group, id) {
        for (var i = 0; i < group.length; i++) {
            group[i].id = (i + id);
            if (group[i].group && group[i].group.length > 0) {
                this._resetData(group[i].group, group[i].id);
            }
        }
    }
    this._render = function (data, id) {
        if (data.group && data.group.length > 0) {
            for (var i in data.group) {
                this._renderDom(id, data.group[i]);
                this._render(data.group[i], data.group[i].id);
            }
        }
    }
    this.render = function () {
        this._renderDom(id, this.treeData);
        this._render(this.treeData, id);
    }
    //渲染节点
    this._renderDom = function (id, group) {
        var li = document.createElement('li');
        document.getElementById(id).appendChild(li);
        var text = document.createElement('li');
        text.setAttribute("data-id", group.id);
        if (group.selected) {
            text.className = "dep-item dep-item-active";
        } else {
            text.className = "dep-item";
        }
        text.textContent = group.name;
        text.onclick = this.clickEvent;
        li.appendChild(text);
        var ul = document.createElement('ul');
        li.appendChild(ul);
        ul.id = group.id;
    }
    this.afterClick = function () {
        var pureUser = [];
        this.selectedDep.forEach(function (t) {
            if (t.user && t.user.length > 0) {
                pureUser = pureUser.concat(t.user)
            }
        })
        this.afterClickHook(pureUser);
    };
    //事件
    this.clickEvent = function (e) {
        console.log(e);
        var dataId = this.getAttribute("data-id");
        that.setSelected(dataId, that.treeData);
        that.clear();
        that.render();
        that.afterClick();
    }
    this.clear = function () {
        document.getElementById(id).innerHTML = "";
    }
    this.deleteGroupById = function (groupId) {
        for (var i = 0; i < this.selectedDep.length; i++) {
            if (groupId === this.selectedDep[i].id) {
                this.selectedDep.splice(i, 1);
            }
        }
    }
    //设置被选择的部门
    this.setSelected = function (id, data) {
        if (this.isSingleSelected) {
            //单选
            if (data.group && data.group.length > 0) {
                for (var i in data.group) {
                    if (data.group[i].id === id && !data.group[i].selected) {
                        data.group[i].selected = true;
                        this.selectedDep = [data.group[i]];
                    } else {
                        data.group[i].selected = false;
                    }
                    this.setSelected(id, data.group[i])
                }
            }
        } else {
            //多选
            if (data.group && data.group.length > 0) {
                for (var i in data.group) {
                    if (data.group[i].id === id && !data.group[i].selected) {
                        data.group[i].selected = true;
                        this.selectedDep.push(data.group[i]);
                    } else if (data.group[i].id === id && data.group[i].selected) {
                        data.group[i].selected = false;
                        this.deleteGroupById(data.group[i].id);
                    }
                    this.setSelected(id, data.group[i])
                }
            }
        }
    }
    this.setData = function (data) {
        this.treeData = data;
        document.getElementById(id).innerHTML="";
        this._init();
    }
    //数据初始化
    this._init = function () {
        this.treeData.id = "root";
        this._resetData([this.treeData], "root");
        this.render();
        console.log(this.treeData)
    }
    this._init();

}

