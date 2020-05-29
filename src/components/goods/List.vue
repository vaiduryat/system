<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card class="box-card">
            <el-row :gutter='20'>
                <el-col :span='8'>
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear='getGoodsList'>
                        <el-button slot="append" icon="el-icon-search" @click='getGoodsList'></el-button>
                    </el-input>
                </el-col>
                <el-col :span='4'>
                    <el-button type="primary">添加商品</el-button>
                </el-col>
            </el-row>
            <!-- 表格区域 -->
            <el-table :data='goodsList' border stripe>
                <el-table-column label='#' type='index'></el-table-column>
                <el-table-column label='商品名称' prop='goods_name'></el-table-column>
                <el-table-column label='商品价格（元）' prop='goods_price' width='120px'></el-table-column>
                <el-table-column label='商品重量' prop='goods_weight' width='70px'></el-table-column>
                <el-table-column label='创建时间' width='140px'>
                    <template slot-scope="scope">
                        {{ scope.row.add_time | dataFormat }}
                    </template>
                </el-table-column>
                <el-table-column label='操作' width='200px'>
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size='mini' @click='goAddNum'></el-button>
                        <el-button type="danger" icon="el-icon-delete" size='mini'
                            @click='deleteById(scope.row.goods_id)'></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum" :page-sizes="[2, 5, 10, 20]" :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                queryInfo: {
                    query: '',
                    pageNum: 1,
                    pageSize: 2
                },
                total: 0,
                goodsLists: [
                    {
                        "goods_id": 144,
                        "goods_name": "冰箱",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 145,
                        "goods_name": "电视",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 146,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 147,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 148,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 149,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 150,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 151,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 152,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 153,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 154,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 155,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 156,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 157,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 158,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 159,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 160,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    },
                    {
                        "goods_id": 161,
                        "goods_name": "asfdsd",
                        "goods_price": 1,
                        "goods_number": 1,
                        "goods_weight": 1,
                        "goods_state": null,
                        "add_time": 1512954923,
                        "upd_time": 1512954923,
                        "hot_mumber": 0,
                        "is_promote": false
                    }
                ],
                goodsList: []
            }
        },
        methods: {
            getGoodsList() {
                var list = []
                for (var i = 0; i < this.goodsLists.length; i++) {
                    if (this.queryInfo.query === this.goodsLists[i].goods_name) {
                        list.push(this.goodsLists[i])
                    }
                }
                if (list.length === 0) {
                    list = JSON.parse(JSON.stringify(this.goodsLists))
                }
                var startNum = (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize
                var endNum = startNum + this.queryInfo.pageSize
                this.goodsList = list.slice(startNum, endNum)
                this.total = list.length
            },
            handleSizeChange(currentSize) {
                this.queryInfo.pageSize = currentSize
                this.getGoodsList()
            },
            handleCurrentChange(currentPage) {
                this.queryInfo.pageNum = currentPage
                this.getGoodsList()
            },
            deleteById(id) {
                this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (var i = 0; i < this.goodsLists.length; i++) {
                        if (this.goodsLists[i].goods_id === id) {
                            this.goodsLists.splice(i, 1)
                        }
                    }
                    this.getGoodsList()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            goAddNum() {
                this.$router.push('/goods/add')
            }

        },
        created() {
            this.getGoodsList()
        },
    }
</script>
<style lang="less" scoped>

</style>
