/**
 * Created by zhouli on 18/5/22
 */
//表格对象
//显示与过滤
function UserTable(option) {
    this.data = option.data;
    this.filterData = [];
    var that = this;
    //容器id
    var id = option.wrapId;

    this.setData = function (data) {
        this.data = data;
        this.renderUser(this.data);
    }
    this.filter = function (filter) {
        this.filterData = [];
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].name.match(filter)) {
                this.filterData.push(this.data[i]);
            }
        }
        this.renderUser(this.filterData)
    }
    this.clear = function () {
        document.getElementById(id).innerHTML = "";
    }
    this.renderUser = function (user) {
        var wrap = document.getElementById("user-item-wrap");
        wrap.innerHTML = "";
        for (var i = 0; i < user.length; i++) {
            var userItem = document.createElement('div');
            userItem.className = "userItem";
            userItem.innerHTML = user[i].name + " ---- " + user[i].sex;
            wrap.appendChild(userItem);
        }
    }

    this.render = function () {
        this.clear();
        var wrap = document.getElementById(id);
        var input = document.createElement('input');
        input.id = "user-filter-inp";
        input.className = "user-filter-inp";
        //加一个节流器
        //延迟0.2s；但是你连续输入，3秒执行一次
        input.oninput = _superThrottle(function () {
            that.filter(this.value)
        }, 200, 3000)
        wrap.appendChild(input);
        var userItemWrap = document.createElement('div');
        userItemWrap.className = "user-item-wrap";
        userItemWrap.id = "user-item-wrap";
        wrap.appendChild(userItemWrap);
    }
    //数据初始化
    this._init = function () {
        this.render();
    }
    this._init();

    //节流器，
    function _superThrottle(fn, delay, mustRunDelay) {
        var timer = null;
        var t_start;
        return function () {
            var context = this;
            var args = arguments;
            var t_curr = +new Date();
            clearTimeout(timer);
            if (!t_start) {
                t_start = t_curr;
            }
            if (t_curr - t_start >= mustRunDelay) {
                fn.apply(context, args);
                t_start = t_curr;
            } else {
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            }
        }
    }

}