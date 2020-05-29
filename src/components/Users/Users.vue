<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <!-- 搜索框 -->
                <el-col :span="10">
                    <el-input placeholder="请输入内容" class="input-with-select" v-model="queryInfo.query" clearable
                        @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click='getUserList'></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click='AddDialogVisible=true'>添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 添加用户對話框 -->
            <el-dialog title="添加用户" :visible.sync="AddDialogVisible" width="30%" @close='addFormClose'>
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                    <el-form-item label="用户名称" prop="username">
                        <el-input v-model="addForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="addForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="mobile">
                        <el-input v-model="addForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addForm.email"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="AddDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改用户对话框 -->
            <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="30%" @close='editFormClose'>
                <span slot="footer" class="dialog-footer">
                    <!-- 表单区域 -->
                    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
                        <el-form-item label="用户名">
                            <el-input v-model="editForm.username" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="editForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="电话号码" prop="mobile">
                            <el-input v-model="editForm.mobile"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editUser">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 分配角色对话框 -->
            <el-dialog title="分配角色" :visible.sync="setRolesDialogVisible" width="30%">
                <span>当前用户：{{currentUser.username}}</span><br>
                <span>当前角色：{{currentUser.role_name}}</span><br>
                分配新的角色：
                <el-select v-model="selectedRoleId" placeholder="请选择">
                    <el-option v-for="item in roleLists" :key="item.id" :label="item.roleName" :value="item.id">
                    </el-option>
                </el-select>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="setRolesDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="setRolesById()">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 表格区域 -->
            <el-table :data="userList" style="width: 100%" border stripe>
                <el-table-column type="index" label='#'>
                </el-table-column>
                <el-table-column prop="username" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号码" width="180">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="role_name" label="角色">
                </el-table-column>
                <el-table-column prop="mg_state" label="当前用户状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" @change='userStateChange(scope.row)'>
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable='false'>
                            <el-button type="primary" icon="el-icon-edit" size='mini' @click='editPre(scope.row.id)'>
                            </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="刪除" placement="top" :enterable='false'>
                            <el-button type="danger" icon="el-icon-delete" size='mini'
                                @click='deleteDialog(scope.row.id)'>
                            </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="設置" placement="top" :enterable='false'>
                            <el-button type="warning" icon="el-icon-setting" size='mini'
                                @click='setRolesDialog(scope.row)'></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分頁區域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="this.queryInfo.pagenum" :page-sizes="[2, 3, 4, 5]" :page-size="this.queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="this.total">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            var validateEmail = (rule, value, callback) => {
                var emailReg = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/
                if (emailReg.test(value)) {
                    return callback()
                }
                callback(new Error('请输入合法的邮箱'))
            }
            var validateMobile = (rule, value, callback) => {
                var mobileReg = /^1[3456789]\d{9}$/
                if (mobileReg.test(value)) {
                    return callback()
                }
                callback(new Error('请输入合法的手机号码'))
            }
            return {
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 2
                },
                userList: [],
                total: 0,
                userlists: [
                    {
                        "id": 25,
                        "username": "tige117",
                        "mobile": "18616358651",
                        "type": 1,
                        "email": "tige112@163.com",
                        "create_time": "2017-11-09T20:36:26.000Z",
                        "mg_state": true, // 当前用户的状态
                        "role_name": "炒鸡管理员"
                    },
                    {
                        "id": 26,
                        "username": "tige118",
                        "mobile": "18616358651",
                        "type": 1,
                        "email": "tige112@163.com",
                        "create_time": "2017-11-09T20:36:26.000Z",
                        "mg_state": true, // 当前用户的状态
                        "role_name": "炒鸡管理员"
                    },
                    {
                        "id": 27,
                        "username": "tige119",
                        "mobile": "18616358651",
                        "type": 1,
                        "email": "tige112@163.com",
                        "create_time": "2017-11-09T20:36:26.000Z",
                        "mg_state": true, // 当前用户的状态
                        "role_name": "炒鸡管理员"
                    }, {
                        "id": 28,
                        "username": "tige120",
                        "mobile": "18616358651",
                        "type": 1,
                        "email": "tige112@163.com",
                        "create_time": "2017-11-09T20:36:26.000Z",
                        "mg_state": true, // 当前用户的状态
                        "role_name": "炒鸡管理员"
                    },
                    {
                        "id": 29,
                        "username": "tige121",
                        "mobile": "18616358651",
                        "type": 1,
                        "email": "tige112@163.com",
                        "create_time": "2017-11-09T20:36:26.000Z",
                        "mg_state": true, // 当前用户的状态
                        "role_name": "炒鸡管理员"
                    },
                    {
                        "id": 30,
                        "username": "tige122",
                        "mobile": "18616358651",
                        "type": 1,
                        "email": "tige112@163.com",
                        "create_time": "2017-11-09T20:36:26.000Z",
                        "mg_state": true, // 当前用户的状态
                        "role_name": "炒鸡管理员"
                    },
                    {
                        "id": 31,
                        "username": "tige123",
                        "mobile": "18616358651",
                        "type": 1,
                        "email": "tige112@163.com",
                        "create_time": "2017-11-09T20:36:26.000Z",
                        "mg_state": true, // 当前用户的状态
                        "role_name": "炒鸡管理员"
                    }, {
                        "id": 32,
                        "username": "tige124",
                        "mobile": "18616358651",
                        "type": 1,
                        "email": "tige112@163.com",
                        "create_time": "2017-11-09T20:36:26.000Z",
                        "mg_state": true, // 当前用户的状态
                        "role_name": "炒鸡管理员"
                    }
                ],
                AddDialogVisible: false,
                addForm: {
                    username: '',
                    password: '',
                    mobile: '',
                    email: ''
                },
                addFormRules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入电话号码', trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { validator: validateEmail, trigger: 'blur' }
                    ]
                },
                editDialogVisible: false,
                editForm: {
                    id: 0,
                    username: '',
                    email: '',
                    mobile: ''
                },
                editFormRules: {
                    mobile: [
                        { required: true, message: '请输入电话号码', trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { validator: validateEmail, trigger: 'blur' }
                    ]
                },
                setRolesDialogVisible: false,
                currentUser: {},
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
                        "id": 31,
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
                selectedRoleId: ''
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            // async getUserList() {
            //     const { data: res } =await this.$http.get("/users", { params: this.queryInfo })
            //     if (res.meta.status !== 200) {
            //         return this.$message.error('获取用户信息失败')
            //     }
            //     this.userList = res.data.userList
            //     this.total = res.data.total
            // }
            getUserList() {
                var list = []
                for (var i = 0; i < this.userlists.length; i++) {
                    if (this.queryInfo.query === this.userlists[i].username) {
                        list.push(this.userlists[i])
                    }
                }
                if (list.length === 0) {
                    list = this.userlists
                }
                var startNum = (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize
                var endNum = startNum + this.queryInfo.pagesize
                this.userList = list.slice(startNum, endNum)
                this.total = list.length
            },
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize
                this.getUserList()
            },
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage
                this.getUserList()
            },
            userStateChange(userInfo) {
                for (var i = 0; i < this.userlists.length; i++) {
                    if (userInfo.id === this.userlists[i].id) {
                        this.userlists[i].mg_state = userInfo.mg_state
                    }
                }
            },
            addFormClose() {
                this.$refs.addFormRef.resetFields()
            },
            addUser() {
                this.$refs.addFormRef.validate(value => {
                    if (!value) return
                    var _addUser = {}
                    _addUser.username = this.addForm.username
                    _addUser.password = this.addForm.password
                    _addUser.email = this.addForm.email
                    _addUser.mobile = this.addForm.mobile
                    _addUser.id = 33
                    _addUser.type = 1
                    _addUser.create_time = new Date().toDateString
                    _addUser.mg_state = false
                    _addUser.role_name = "超级管理员"
                    this.userlists.push(_addUser)
                    this.getUserList()
                    this.AddDialogVisible = false
                    this.$message.success('添加用户成功')
                })
            },
            editPre(id) {
                for (var i = 0; i < this.userlists.length; i++) {
                    if (id === this.userlists[i].id) {
                        this.editForm.username = this.userlists[i].username
                        this.editForm.email = this.userlists[i].email
                        this.editForm.mobile = this.userlists[i].mobile
                        this.editForm.id = this.userlists[i].id
                    }
                }
                this.editDialogVisible = true
            },
            editFormClose() {
                this.$refs.editFormRef.resetFields()
            },
            editUser() {
                this.$refs.editFormRef.validate(valid => {
                    if (!valid) return
                    for (var i = 0; i < this.userlists.length; i++) {
                        if (this.editForm.id === this.userlists[i].id) {
                            this.userlists[i].username = this.editForm.username
                            this.userlists[i].email = this.editForm.email
                            this.userlists[i].mobile = this.editForm.mobile
                        }
                    }
                    this.editDialogVisible = false
                    this.$message.success('修改用户信息成功')
                    this.getUserList()
                })
            },
            async deleteDialog(id) {
                var res = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)
                if (res === 'cancel') return this.$message.info('已取消删除')
                for (var i = 0; i < this.userlists.length; i++) {
                    if (id === this.userlists[i].id) {
                        this.userlists.splice(i, 1)
                    }
                }
                this.getUserList()
                this.$message.success('删除用户成功')
            },
            setRolesDialog(currentUser) {
                this.currentUser = currentUser
                for (var i = 0; i < this.roleList.length; i++) {
                    this.roleLists.push(this.roleList[i])
                }
                this.setRolesDialogVisible = true
            },
            setRolesById() {
                this.setRolesDialogVisible = false
                var roleName1 = ''
                for (var i = 0; i < this.roleLists.length; i++) {
                    if (this.selectedRoleId === this.roleLists[i].id) {
                        roleName1 = this.roleLists[i].roleName
                    }
                }
                for (var j = 0; j < this.userList.length; j++) {
                    if (this.currentUser.id === this.userList[j].id) {
                        this.userList[j].role_name = roleName1
                    }
                }
                this.roleLists = []
                this.getUserList()
                this.$message.success('分配角色成功')
            }
        },
    }
</script>
<style lang="less" scoped>

</style>
