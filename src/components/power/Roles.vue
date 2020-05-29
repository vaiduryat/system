<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片 -->
        <el-card class="box-card">
            <!-- 添加角色按钮 -->
            <el-row>
                <el-col>
                    <el-button type='primary'>
                        添加角色
                    </el-button>
                </el-col>
            </el-row>
            <!-- 树状对话框 -->
            <el-dialog title="分配权限" :visible.sync="rightsDialogVisible" width="30%">
                <!-- 树形权限列表 -->
                <el-tree :data="rightsLists" :props="rightsTreeProps" @node-click="handleNodeClick" show-checkbox
                    default-expand-all node-key='id'></el-tree>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="rightsDialogVisible=false">取 消</el-button>
                    <el-button type="primary" @click="rightsDialogVisible=false">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 表格 -->
            <el-table :data='roleLists' border stripe>
                <el-table-column type='expand'>
                    <template slot-scope="scoped">
                        <el-row v-for='(item1,index1) in scoped.row.children' :key='item1.id'
                            :class="['bdBottom',index1===0?'bdTop':'','vcenter']">
                            <el-col :span='5'>
                                <el-tag closable @close='RemoveRightById(item1.id)'>{{ item1.authName}}</el-tag><i
                                    class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span='19'>
                                <el-row v-for='(item2,index2) in item1.children' :key='item2.id'
                                    :class="[index2===0?'':'bdTop','vcenter']">
                                    <el-col :span='5'>
                                        <el-tag type='success' closable @close='RemoveRightById(item2.id)'>
                                            {{ item2.authName}}</el-tag><i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span='19'>
                                        <el-tag type='warning' v-for='(item3,index3) in item2.children' :key='item3.id'
                                            closable @close='RemoveRightById(item3.id)'>{{ item3.authName}}</el-tag>
                                    </el-col>
                                </el-row>

                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type='index' label='#'></el-table-column>
                <el-table-column prop='roleName' label='角色名称'></el-table-column>
                <el-table-column prop='roleDesc' label='角色描述'></el-table-column>
                <el-table-column label='操作' width='300px'>
                    <template slot-scope="scoped">
                        <el-button type='primary' size='mini' icon="el-icon-edit">编辑</el-button>
                        <el-button type='danger' size='mini' icon="el-icon-delete">删除</el-button>
                        <el-button type='warning' size='mini' icon="el-icon-setting" @click='showRightsDialogVisible'>
                            分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                roleList: [
                    {
                        "id": 30,
                        "roleName": "主管",
                        "roleDesc": "技术负责人",
                        "children": [
                            {
                                "id": 101,
                                "authName": "商品管理",
                                "path": 'products',
                                "children": [
                                    {
                                        "id": 104,
                                        "authName": "商品列表",
                                        "path": 'products',
                                        "children": [
                                            {
                                                "id": 105,
                                                "authName": "添加商品",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 106,
                                                "authName": "删除商品",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 107,
                                                "authName": "编辑商品",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 108,
                                                "authName": "更新商品图片",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 109,
                                                "authName": "更新商品属性",
                                                "path": 'products'
                                            }
                                        ]
                                    },
                                    {
                                        "id": 110,
                                        "authName": "分类参数",
                                        "path": 'products',
                                        "children": [
                                            {
                                                "id": 112,
                                                "authName": "获取参数列表",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 113,
                                                "authName": "创建商品参数",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 114,
                                                "authName": "删除商品参数",
                                                "path": 'products'
                                            }
                                        ]
                                    },
                                    {
                                        "id": 115,
                                        "authName": "商品分类",
                                        "path": 'products',
                                        "children": [
                                            {
                                                "id": 116,
                                                "authName": "添加分类",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 117,
                                                "authName": "删除分类",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 118,
                                                "authName": "获取分类详情",
                                                "path": 'products'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": 130,
                                "authName": "订单管理",
                                "path": 'orders',
                                "children": [
                                    {
                                        "id": 131,
                                        "authName": "订单列表",
                                        "path": 'orders',
                                        "children": [
                                            {
                                                "id": 132,
                                                "authName": "添加订单",
                                                "path": 'orders'
                                            },
                                            {
                                                "id": 133,
                                                "authName": "订单更新",
                                                "path": 'orders'
                                            },
                                            {
                                                "id": 134,
                                                "authName": "获取订单详情",
                                                "path": 'orders'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": 140,
                                "authName": "权限管理",
                                "path": 'roles',
                                "children": [
                                    {
                                        "id": 141,
                                        "authName": "角色列表",
                                        "path": 'roles',
                                        "children": [
                                            {
                                                "id": 142,
                                                "authName": "添加角色",
                                                "path": 'roles'
                                            },
                                            {
                                                "id": 143,
                                                "authName": "删除角色",
                                                "path": 'roles'
                                            },
                                            {
                                                "id": 144,
                                                "authName": "角色授权",
                                                "path": 'roles'
                                            },
                                            {
                                                "id": 145,
                                                "authName": "取消角色授权",
                                                "path": 'roles'
                                            },
                                            {
                                                "id": 146,
                                                "authName": "获取角色列表",
                                                "path": 'roles'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 30,
                        "roleName": "测试角色1",
                        "roleDesc": "测试角色描述1",
                        "children": [
                            {
                                "id": 331,
                                "authName": "商品管理",
                                "path": 'products',
                                "children": [
                                    {
                                        "id": 334,
                                        "authName": "商品列表",
                                        "path": 'products',
                                        "children": [
                                            {
                                                "id": 335,
                                                "authName": "添加商品",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 336,
                                                "authName": "删除商品",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 337,
                                                "authName": "编辑商品",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 338,
                                                "authName": "更新商品图片",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 339,
                                                "authName": "更新商品属性",
                                                "path": 'products'
                                            }
                                        ]
                                    },
                                    {
                                        "id": 340,
                                        "authName": "分类参数",
                                        "path": 'products',
                                        "children": [
                                            {
                                                "id": 341,
                                                "authName": "获取参数列表",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 342,
                                                "authName": "创建商品参数",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 343,
                                                "authName": "删除商品参数",
                                                "path": 'products'
                                            }
                                        ]
                                    },
                                    {
                                        "id": 345,
                                        "authName": "商品分类",
                                        "path": 'products',
                                        "children": [
                                            {
                                                "id": 346,
                                                "authName": "添加分类",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 347,
                                                "authName": "删除分类",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 348,
                                                "authName": "获取分类详情",
                                                "path": 'products'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": 349,
                                "authName": "订单管理",
                                "path": 'orders',
                                "children": [
                                    {
                                        "id": 347,
                                        "authName": "订单列表",
                                        "path": 'orders',
                                        "children": [
                                            {
                                                "id": 348,
                                                "authName": "添加订单",
                                                "path": 'orders'
                                            },
                                            {
                                                "id": 349,
                                                "authName": "订单更新",
                                                "path": 'orders'
                                            },
                                            {
                                                "id": 350,
                                                "authName": "获取订单详情",
                                                "path": 'orders'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": 351,
                                "authName": "权限管理",
                                "path": 'roles',
                                "children": [
                                    {
                                        "id": 352,
                                        "authName": "角色列表",
                                        "path": 'roles',
                                        "children": [
                                            {
                                                "id": 353,
                                                "authName": "添加角色",
                                                "path": 'roles'
                                            },
                                            {
                                                "id": 354,
                                                "authName": "删除角色",
                                                "path": 'roles'
                                            },
                                            {
                                                "id": 355,
                                                "authName": "角色授权",
                                                "path": 'roles'
                                            },
                                            {
                                                "id": 356,
                                                "authName": "取消角色授权",
                                                "path": 'roles'
                                            },
                                            {
                                                "id": 357,
                                                "authName": "获取角色列表",
                                                "path": 'roles'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 360,
                        "roleName": "测试角色2",
                        "roleDesc": "测试角色描述2",
                        "children": [
                            {
                                "id": 361,
                                "authName": "商品管理",
                                "path": 'products',
                                "children": [
                                    {
                                        "id": 362,
                                        "authName": "商品列表",
                                        "path": 'products',
                                        "children": [
                                            {
                                                "id": 363,
                                                "authName": "添加商品",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 364,
                                                "authName": "删除商品",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 365,
                                                "authName": "编辑商品",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 367,
                                                "authName": "更新商品图片",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 368,
                                                "authName": "更新商品属性",
                                                "path": 'products'
                                            }
                                        ]
                                    },
                                    {
                                        "id": 369,
                                        "authName": "分类参数",
                                        "path": 'products',
                                        "children": [
                                            {
                                                "id": 370,
                                                "authName": "获取参数列表",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 371,
                                                "authName": "创建商品参数",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 372,
                                                "authName": "删除商品参数",
                                                "path": 'products'
                                            }
                                        ]
                                    },
                                    {
                                        "id": 373,
                                        "authName": "商品分类",
                                        "path": 'products',
                                        "children": [
                                            {
                                                "id": 374,
                                                "authName": "添加分类",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 375,
                                                "authName": "删除分类",
                                                "path": 'products'
                                            },
                                            {
                                                "id": 376,
                                                "authName": "获取分类详情",
                                                "path": 'products'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": 377,
                                "authName": "订单管理",
                                "path": 'orders',
                                "children": [
                                    {
                                        "id": 378,
                                        "authName": "订单列表",
                                        "path": 'orders',
                                        "children": [
                                            {
                                                "id": 379,
                                                "authName": "添加订单",
                                                "path": 'orders'
                                            },
                                            {
                                                "id": 380,
                                                "authName": "订单更新",
                                                "path": 'orders'
                                            },
                                            {
                                                "id": 381,
                                                "authName": "获取订单详情",
                                                "path": 'orders'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": 382,
                                "authName": "权限管理",
                                "path": 'roles',
                                "children": [
                                    {
                                        "id": 383,
                                        "authName": "角色列表",
                                        "path": 'roles',
                                        "children": [
                                            {
                                                "id": 384,
                                                "authName": "添加角色",
                                                "path": 'roles'
                                            },
                                            {
                                                "id": 385,
                                                "authName": "删除角色",
                                                "path": 'roles'
                                            },
                                            {
                                                "id": 386,
                                                "authName": "角色授权",
                                                "path": 'roles'
                                            },
                                            {
                                                "id": 387,
                                                "authName": "取消角色授权",
                                                "path": 'roles'
                                            },
                                            {
                                                "id": 388,
                                                "authName": "获取角色列表",
                                                "path": 'roles'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                roleLists: [],
                rightsList: [
                    {
                        "id": 101,
                        "authName": "商品管理",
                        "path": 'products',
                        "children": [
                            {
                                "id": 104,
                                "authName": "商品列表",
                                "path": 'products',
                                "children": [
                                    {
                                        "id": 105,
                                        "authName": "添加商品",
                                        "path": 'products'
                                    },
                                    {
                                        "id": 106,
                                        "authName": "删除商品",
                                        "path": 'products'
                                    },
                                    {
                                        "id": 107,
                                        "authName": "编辑商品",
                                        "path": 'products'
                                    },
                                    {
                                        "id": 108,
                                        "authName": "更新商品图片",
                                        "path": 'products'
                                    },
                                    {
                                        "id": 109,
                                        "authName": "更新商品属性",
                                        "path": 'products'
                                    }
                                ]
                            },
                            {
                                "id": 110,
                                "authName": "分类参数",
                                "path": 'products',
                                "children": [
                                    {
                                        "id": 112,
                                        "authName": "获取参数列表",
                                        "path": 'products'
                                    },
                                    {
                                        "id": 113,
                                        "authName": "创建商品参数",
                                        "path": 'products'
                                    },
                                    {
                                        "id": 114,
                                        "authName": "删除商品参数",
                                        "path": 'products'
                                    }
                                ]
                            },
                            {
                                "id": 115,
                                "authName": "商品分类",
                                "path": 'products',
                                "children": [
                                    {
                                        "id": 116,
                                        "authName": "添加分类",
                                        "path": 'products'
                                    },
                                    {
                                        "id": 117,
                                        "authName": "删除分类",
                                        "path": 'products'
                                    },
                                    {
                                        "id": 118,
                                        "authName": "获取分类详情",
                                        "path": 'products'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 130,
                        "authName": "订单管理",
                        "path": 'orders',
                        "children": [
                            {
                                "id": 131,
                                "authName": "订单列表",
                                "path": 'orders',
                                "children": [
                                    {
                                        "id": 132,
                                        "authName": "添加订单",
                                        "path": 'orders'
                                    },
                                    {
                                        "id": 133,
                                        "authName": "订单更新",
                                        "path": 'orders'
                                    },
                                    {
                                        "id": 134,
                                        "authName": "获取订单详情",
                                        "path": 'orders'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 140,
                        "authName": "权限管理",
                        "path": 'roles',
                        "children": [
                            {
                                "id": 141,
                                "authName": "角色列表",
                                "path": 'roles',
                                "children": [
                                    {
                                        "id": 142,
                                        "authName": "添加角色",
                                        "path": 'roles'
                                    },
                                    {
                                        "id": 143,
                                        "authName": "删除角色",
                                        "path": 'roles'
                                    },
                                    {
                                        "id": 144,
                                        "authName": "角色授权",
                                        "path": 'roles'
                                    },
                                    {
                                        "id": 145,
                                        "authName": "取消角色授权",
                                        "path": 'roles'
                                    },
                                    {
                                        "id": 146,
                                        "authName": "获取角色列表",
                                        "path": 'roles'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                rightsLists: [],
                rightsDialogVisible: false,
                rightsTreeProps: {
                    children: 'children',
                    label: 'authName'
                }
            }
        },
        created() {
            this.roleLists = this.roleList
        },
        methods: {
            async RemoveRightById(id) {
                var result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(error => error)
                if (result === 'error') {
                    return this.$message.info('取消删除')
                }
                this.deleteRightById(this.roleList, id)
                this.roleLists = this.roleList
            },
            deleteRightById(list, id) {
                for (var i = 0; i < list.length; i++) {
                    if (id === list[i].id) {
                        list.splice(i, 1)
                        return
                    }
                    if (list[i].children) {
                        this.deleteRightById(list[i].children, id)
                    }
                }
            },
            showRightsDialogVisible() {
                this.rightsDialogVisible = true
                this.rightsLists = this.rightsList
            },
            handleNodeClick() {

            }
        },
    }
</script>
<style lang="less" scoped>
    .el-tag {
        margin: 7px;
    }

    .bdTop {
        border-top: solid 1px #eee;
    }

    .bdBottom {
        border-bottom: solid 1px #eee;
    }

    .vcenter {
        display: flex;
        align-items: center;
    }
</style>
