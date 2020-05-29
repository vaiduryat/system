<template>
    <div>
        <!-- 面包屑区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <!-- 权限表格 -->
            <el-table :data='rightList' border stripe>
                <el-table-column type='index' label='#'>
                </el-table-column>
                <el-table-column prop="authName" label="权限名称">
                </el-table-column>
                <el-table-column prop="path" label="路径">
                </el-table-column>
                <el-table-column prop="level" label="权限级别">
                    <template slot-scope="scoped">
                        <el-tag v-if='scoped.row.level==0'>级别一</el-tag>
                        <el-tag type=" success" v-else-if='scoped.row.level==1'>级别二</el-tag>
                        <el-tag type="warning" v-else>级别三</el-tag>
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
                rightsList: [
                    {
                        "id": 101,
                        "authName": "商品管理",
                        "level": "0",
                        "pid": 0,
                        "path": "goods"
                    },
                    {
                        "id": 102,
                        "authName": "订单管理",
                        "level": "0",
                        "pid": 0,
                        "path": "orders"
                    },
                    {
                        "id": 103,
                        "authName": "权限管理",
                        "level": "0",
                        "pid": 0,
                        "path": "rights"
                    },
                    {
                        "id": 104,
                        "authName": "商品列表",
                        "level": "1",
                        "pid": 0,
                        "path": "goods"
                    },
                    {
                        "id": 105,
                        "authName": "添加商品",
                        "level": "2",
                        "pid": 0,
                        "path": "goods"
                    },
                    {
                        "id": 106,
                        "authName": "订单列表",
                        "level": "1",
                        "pid": 0,
                        "path": "orders"
                    },
                    {
                        "id": 107,
                        "authName": "添加订单",
                        "level": "2",
                        "pid": 0,
                        "path": "orders"
                    },
                    {
                        "id": 108,
                        "authName": "用户列表",
                        "level": "1",
                        "pid": 0,
                        "path": "users"
                    },
                    {
                        "id": 109,
                        "authName": "删除用户",
                        "level": "2",
                        "pid": 0,
                        "path": "users"
                    },
                    {
                        "id": 108,
                        "authName": "添加用户",
                        "level": "2",
                        "pid": 0,
                        "path": "users"
                    }
                ],
                rightList: []
            }
        },
        created() {
            this.rightList = this.rightsList
        },
    }
</script>

<style lang="less" scoped>

</style>
