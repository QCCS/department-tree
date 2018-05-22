/**
 * Created by zhouli on 18/5/22
 * Email li.zhou@huilianyi.com
 */
//数据
//这个数据结构，我这边保持不动，就添加几个节点而已
var rootGroup = {
    name: "总部门",
    user: [
        {
            name: "Prometheus",
            sex: "male"
        },
        {
            name: "Athena",
            sex: "female"
        }
    ],
    group: [
        {
            name: "子部门1",
            user: [
                {
                    name: "Dijkstra",
                    sex: "male"
                },
                {
                    name: "Linus",
                    sex: "male"
                }
            ],
            group: [
                {
                    name: "子部门2",
                    user: [
                        {
                            name: "Dijkstra1",
                            sex: "male"
                        },
                        {
                            name: "Linus1",
                            sex: "male"
                        }
                    ]
                },
                {
                    name: "子部门3",
                    user: [],
                    group: []
                }
            ]
        },
        {
            name: "子部门4",
            user: [
                {
                    name: "Dijkstra",
                    sex: "male"
                },
                {
                    name: "Linus",
                    sex: "male"
                }
            ],
            group: [
                {
                    name: "子部门5",
                    user: [
                        {
                            name: "Dijkstra1",
                            sex: "male"
                        },
                        {
                            name: "Linus1",
                            sex: "male"
                        }
                    ]
                },
                {
                    name: "子部门6",
                    user: [],
                    group: [
                        {
                            name: "子部门51",
                            user: [
                                {
                                    name: "Dijkstra1",
                                    sex: "male"
                                },
                                {
                                    name: "Linus1",
                                    sex: "male"
                                }
                            ]
                        },
                        {
                            name: "子部门61",
                            user: [],
                            group: [
                                {
                                    name: "子部门511",
                                    user: [
                                        {
                                            name: "Dijkstra1",
                                            sex: "male"
                                        },
                                        {
                                            name: "Linus1",
                                            sex: "male"
                                        }
                                    ]
                                },
                                {
                                    name: "子部门611",
                                    user: [],
                                    group: []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
var rootGroup1 = {
    name: "总部门11",
    user: [
        {
            name: "Prometheus",
            sex: "male"
        },
        {
            name: "Athena",
            sex: "female"
        }
    ],
    group: [
        {
            name: "子部门1",
            user: [
                {
                    name: "Dijkstra",
                    sex: "male"
                },
                {
                    name: "Linus",
                    sex: "male"
                }
            ],
            group: [
                {
                    name: "子部门2",
                    user: [
                        {
                            name: "Dijkstra1",
                            sex: "male"
                        },
                        {
                            name: "Linus1",
                            sex: "male"
                        }
                    ]
                },
                {
                    name: "子部门3",
                    user: [],
                    group: []
                }
            ]
        },
        {
            name: "子部门4",
            user: [
                {
                    name: "Dijkstra",
                    sex: "male"
                },
                {
                    name: "Linus",
                    sex: "male"
                }
            ],
            group: [
                {
                    name: "子部门5",
                    user: [
                        {
                            name: "Dijkstra1",
                            sex: "male"
                        },
                        {
                            name: "Linus1",
                            sex: "male"
                        }
                    ]
                },
                {
                    name: "子部门6",
                    user: [],
                    group: [
                        {
                            name: "子部门51",
                            user: [
                                {
                                    name: "Dijkstra1",
                                    sex: "male"
                                },
                                {
                                    name: "Linus1",
                                    sex: "male"
                                }
                            ]
                        },
                        {
                            name: "子部门61",
                            user: [],
                            group: [
                                {
                                    name: "子部门511",
                                    user: [
                                        {
                                            name: "Dijkstra1",
                                            sex: "male"
                                        },
                                        {
                                            name: "Linus1",
                                            sex: "male"
                                        }
                                    ]
                                },
                                {
                                    name: "子部门611",
                                    user: [],
                                    group: []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
window.onload = function () {
    //配置部门树
    var optionsTree = {
        data: rootGroup,
        wrapId: "depRoot",
        //仅仅完成一个功能，回调的参数就给一个了
        afterClickHook: afterClickHook,
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


}