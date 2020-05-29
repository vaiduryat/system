<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="">
                <span>后台管理系统</span>
            </div>
            <el-button type="info" @click='loginOut'>退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse?'64px':'200px'">
                <div class='toggleButton' @click='collapseMeau'>|||</div>
                <el-menu @open="handleOpen" @close="handleClose" background-color="#333744" text-color="#fff"
                    active-text-color="#409eff" :unique-opened='true' :collapse="isCollapse"
                    :collapse-transition='false' router :default-active="activePath">
                    <el-submenu :index="item.id+''" v-for="item in meauList.data" :key="item.id">
                        <template slot="title">
                            <i :class="icons[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id"
                            @click="saveActivePath('/'+subItem.path)">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

    export default {
        data() {
            return {
                meauList: [],
                icons: {
                    '101': 'iconfont icon-shangpin',
                    '102': 'iconfont icon-users',
                    '103': 'iconfont icon-tijikongjian',
                    '104': 'iconfont icon-danju',
                    '105': 'iconfont icon-baobiao'
                },
                isCollapse: false,
                activePath: ''
            }
        },
        created() {
            this.getMeauList()
            this.getActivePath()
        },
        methods: {
            loginOut() {
                window.sessionStorage.clear()
                this.$router.push('/login')
            },
            // async getMeauList(){
            //     const {data:res}=await this.$http.get('meaus')
            //     if(res.meta.status!==200) return this.$message.error(res.meta.msg)
            //     this.meauList=res.data
            //     console.log(res)
            // }
            getMeauList() {
                this.meauList = {
                    "data": [{
                        "id": 101,
                        "authName": "商品管理",
                        "path": null,
                        "children": [
                            {
                                "id": 104,
                                "authName": "商品列表",
                                "path": 'list',
                                "children": []
                            },
                            {
                                "id": 105,
                                "authName": "分类参数",
                                "path": 'params',
                                "children": []
                            },
                            {
                                "id": 114,
                                "authName": "商品分类",
                                "path": 'categories',
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 102,
                        "authName": "用户管理",
                        "path": null,
                        "children": [
                            {
                                "id": 106,
                                "authName": "用户列表",
                                "path": 'users',
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 103,
                        "authName": "权限管理",
                        "path": null,
                        "children": [
                            {
                                "id": 108,
                                "authName": "角色列表",
                                "path": 'roles',
                                "children": []
                            },
                            {
                                "id": 109,
                                "authName": "权限列表",
                                "path": 'rights',
                                "children": []
                            },
                        ]
                    },
                    {
                        "id": 104,
                        "authName": "订单管理",
                        "path": null,
                        "children": [
                            {
                                "id": 110,
                                "authName": "订单列表",
                                "path": 'order',
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 105,
                        "authName": "数据统计",
                        "path": null,
                        "children": [
                            {
                                "id": 112,
                                "authName": "数据报表",
                                "path": 'report',
                                "children": []
                            }
                        ]
                    },
                    ],
                    "meta": {
                        "msg": "获取菜单列表成功",
                        "status": 200
                    }
                }
                console.log(this.meauList)
            },
            collapseMeau() {
                this.isCollapse = !this.isCollapse
            },
            saveActivePath(activePath) {
                window.sessionStorage.setItem('activePath', activePath)
                this.activePath = activePath
            },
            getActivePath() {
                this.activePath = window.sessionStorage.getItem('activePath')
            }

        },
    }
</script>

<style scoped lang="less">
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #333744;
        display: flex;
        justify-content: space-between;
        align-items: center;

        >div {

            >span {
                color: #ffffff;
            }
        }
    }

    .el-aside {
        background-color: #333744;

        .iconfont {
            margin-right: 10px;
        }

        .el-menu {
            border-right: none;
        }

        .toggleButton {
            background-color: #4d4c4c;
            color: #fff;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
        }
    }
</style>
