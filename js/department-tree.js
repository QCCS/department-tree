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
    //点击展开
    this.afterExpandHook = options.afterExpandHook;
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
                if(data.group[i].expended){
                    this._render(data.group[i], data.group[i].id);
                }
            }
        }
    }
    //渲染节点
    this._renderDom = function (id, node) {
        var li = document.createElement('li');
        document.getElementById(id).appendChild(li);

        // <li data-id="000root" class="dep-item"><span>1-1-1</span></li>
        //节点标题
        var title = document.createElement('span');
        title.className = "dep-item-title";
        title.textContent = node.name;
        title.setAttribute("data-id", node.id);
        title.onclick = this.clickEvent;

        var text = document.createElement('li');
        text.setAttribute("data-id", node.id);
        if (node.selected) {
            text.className = "dep-item dep-item-active";
        } else {
            text.className = "dep-item";
        }
        if (node.group && node.group.length > 0) {
            //节点展开部门按钮
            var expend = document.createElement('span');
            expend.className = "expend-icon";
            if(node.expended){
                expend.textContent = '-';
            }else {
                expend.textContent = '+';
            }
            expend.setAttribute("data-id", node.id);
            expend.onclick = this.clickEventForExpend;
            text.appendChild(expend);
        }
        text.appendChild(title);
        text.onclick = this.clickEvent;
        li.appendChild(text);


        var ul = document.createElement('ul');
        li.appendChild(ul);
        ul.id = node.id;
    }
    //渲染入口
    this.render = function () {
        this._renderDom(id, this.treeData);
        if(this.treeData.expended){
            this._render(this.treeData, "0root");
        }
    }
    //点击节点之后
    this.afterClick = function () {
        var pureUser = [];
        this.selectedDep.forEach(function (t) {
            if (t.user && t.user.length > 0) {
                pureUser = pureUser.concat(t.user)
            }
        })
        this.afterClickHook(pureUser);
    };
    //点击节点展开之后
    this.afterExpand = function () {
        this.afterExpandHook(this.treeData);
    };
    this.clickEventForExpend = function (e) {
        console.log(e);
        e.stopPropagation();
        var dataId = this.getAttribute("data-id");
        that.setExpend(dataId, that.treeData);
        that.clear();
        that.render();
        that.afterExpand();
    }
    //事件
    this.clickEvent = function (e) {
        console.log(e);
        e.stopPropagation();
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
    this.setExpend = function (id,data) {
        for (var key in data) {
            if (data[key] === id && !data.expended) {
                data.expended = true;
                return false;
            } else if (data[key] === id && data.expended) {
                data.expended = false;
                return false;
            }
        }
        if (data.group && data.group.length > 0) {
            for (var i = 0; i < data.group.length; i++) {
                this.setExpend(id, data.group[i])
            }
        }
    }
    //设置被选择的部门
    this.setSelected = function (id, data) {
        if (this.isSingleSelected) {
            //单选
            for (var key in data) {
                if (data[key] === id && !data.selected) {
                    data.selected = true;
                    this.selectedDep = [data];
                } else {
                    data.selected = false;
                }
            }
        } else {
            //多选
            for (var key in data) {
                if (data[key] === id && !data.selected) {
                    data.selected = true;
                    this.selectedDep.push(data);
                    return false;
                } else if (data[key] === id && data.selected) {
                    data.selected = false;
                    this.deleteGroupById(data.id);
                    return false;
                }
            }
        }
        if (data.group && data.group.length > 0) {
            for (var i = 0; i < data.group.length; i++) {
                this.setSelected(id, data.group[i])
            }
        }
    }
    this.setData = function (data) {
        this.treeData = data;
        document.getElementById(id).innerHTML = "";
        this._init();
    }
    //数据初始化
    this._init = function () {
        this._resetData([this.treeData], "root");
        this.render();
    }
    this._init();

}

