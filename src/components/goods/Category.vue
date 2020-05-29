<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加分类对话框 -->
        <el-dialog title="提示" :visible.sync="addCateDialogVisible" width="50%" @close='addCateDialogClose'>
            <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input v-model="addCateForm.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类">
                    <el-cascader v-model="selectedParentValue" :options="parentCateList" :props="cascaderProps"
                        @change="addCateHandleChange" expand-trigger='hover' clearable size='medium' change-on-select>
                    </el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addCateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCate">确 定</el-button>
            </span>
        </el-dialog>
        <el-card>
            <el-button type='primary' @click='showAddCateDialog'>添加分类</el-button>
            <!-- 表格 -->
            <tree-table :data='categoryLists' :columns='colunms' :selection-type='false' :expand-type='false' show-index
                index-text='#' border>
                <!-- 是否有效模板 -->
                <template slot="isok" slot-scope="scoped">
                    <i class="el-icon-success" style="color: lightgreen;" v-if='scoped.row.cat_deleted===false'></i>
                    <i class="el-icon-error" style="color: red;" v-else></i>
                </template>
                <!-- 排序模板 -->
                <template slot="order" slot-scope="scoped">
                    <el-tag size='mini' v-if='scoped.row.cat_level===0'>一级</el-tag>
                    <el-tag type='success' size='mini' v-else-if='scoped.row.cat_level===1'>二级</el-tag>
                    <el-tag type='warning' size='mini' v-else>三级</el-tag>
                </template>
                <!-- 操作模板 -->
                <template slot="opt" slot-scope="scoped">
                    <el-button type="primary" icon="el-icon-edit">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete">删除</el-button>
                </template>
            </tree-table>
            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum" :page-sizes="[2, 3, 4, 5]" :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                categoryList: [
                    {
                        "cat_id": 1,
                        "cat_name": "大家电",
                        "cat_pid": 0,
                        "cat_level": 0,
                        "cat_deleted": false,
                        "children": [
                            {
                                "cat_id": 13,
                                "cat_name": "电视",
                                "cat_pid": 1,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "曲面电视",
                                        "cat_pid": 13,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "海信",
                                        "cat_pid": 13,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            },
                            {
                                "cat_id": 14,
                                "cat_name": "电脑",
                                "cat_pid": 1,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "游戏本",
                                        "cat_pid": 14,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "笔记本",
                                        "cat_pid": 14,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            },
                            {
                                "cat_id": 15,
                                "cat_name": "游戏设备",
                                "cat_pid": 1,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "游戏机",
                                        "cat_pid": 15,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "游戏耳机",
                                        "cat_pid": 15,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "cat_id": 0,
                        "cat_name": "养生",
                        "cat_pid": 0,
                        "cat_level": 0,
                        "cat_deleted": false,
                        "children": [
                            {
                                "cat_id": 30,
                                "cat_name": "艺术",
                                "cat_pid": 0,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "油画",
                                        "cat_pid": 30,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "版画",
                                        "cat_pid": 30,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            },
                            {
                                "cat_id": 40,
                                "cat_name": "礼品",
                                "cat_pid": 0,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "工艺礼品",
                                        "cat_pid": 40,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "美妆礼品",
                                        "cat_pid": 40,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            },
                            {
                                "cat_id": 50,
                                "cat_name": "鲜花",
                                "cat_pid": 0,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "蒲公英",
                                        "cat_pid": 50,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "茉莉花",
                                        "cat_pid": 50,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "cat_id": 11,
                        "cat_name": "服装",
                        "cat_pid": 0,
                        "cat_level": 0,
                        "cat_deleted": false,
                        "children": [
                            {
                                "cat_id": 113,
                                "cat_name": "男装",
                                "cat_pid": 11,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "夹克",
                                        "cat_pid": 113,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "卫衣",
                                        "cat_pid": 113,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            },
                            {
                                "cat_id": 223,
                                "cat_name": "女装",
                                "cat_pid": 11,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "夹克",
                                        "cat_pid": 223,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "卫衣",
                                        "cat_pid": 223,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            },
                            {
                                "cat_id": 333,
                                "cat_name": "童装",
                                "cat_pid": 11,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "夹克",
                                        "cat_pid": 333,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "卫衣",
                                        "cat_pid": 333,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "cat_id": 22,
                        "cat_name": "食品",
                        "cat_pid": 0,
                        "cat_level": 0,
                        "cat_deleted": false,
                        "children": [
                            {
                                "cat_id": 23,
                                "cat_name": "新鲜水果",
                                "cat_pid": 22,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "苹果",
                                        "cat_pid": 23,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "橘子",
                                        "cat_pid": 23,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            },
                            {
                                "cat_id": 24,
                                "cat_name": "肉类",
                                "cat_pid": 22,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "猪肉",
                                        "cat_pid": 24,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "牛肉",
                                        "cat_pid": 24,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            },
                            {
                                "cat_id": 25,
                                "cat_name": "冷冻饮食",
                                "cat_pid": 22,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "水饺",
                                        "cat_pid": 25,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "混沌",
                                        "cat_pid": 25,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "cat_id": 33,
                        "cat_name": "美妆",
                        "cat_pid": 0,
                        "cat_level": 0,
                        "cat_deleted": false,
                        "children": [
                            {
                                "cat_id": 36,
                                "cat_name": "香水彩妆",
                                "cat_pid": 33,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "隔离",
                                        "cat_pid": 36,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "遮瑕",
                                        "cat_pid": 36,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            },
                            {
                                "cat_id": 34,
                                "cat_name": "洗发护发",
                                "cat_pid": 33,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "洗发水",
                                        "cat_pid": 34,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "护发素",
                                        "cat_pid": 34,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            },
                            {
                                "cat_id": 35,
                                "cat_name": "身体护理",
                                "cat_pid": 33,
                                "cat_level": 1,
                                "cat_deleted": false,
                                "children": [
                                    {
                                        "cat_id": 6,
                                        "cat_name": "花露水",
                                        "cat_pid": 35,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 7,
                                        "cat_name": "沐浴露",
                                        "cat_pid": 35,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    }
                                ]
                            }
                        ]
                    }
                ],
                categoryLists: [],
                queryInfo: {
                    pageNum: 1,
                    pageSize: 5,
                    type: 3
                },
                total: 0,
                colunms: [{
                    label: '分类名称',
                    prop: 'cat_name'
                },
                {
                    label: '是否有效',
                    type: 'template',
                    template: 'isok'
                },
                {
                    label: '排序',
                    type: 'template',
                    template: 'order'
                },
                {
                    label: '操作',
                    type: 'template',
                    template: 'opt'
                }
                ],
                addCateDialogVisible: false,
                addCateForm: {
                    cat_name: '',
                    cat_pid: 0,
                    cat_level: 0
                },
                addCateFormRules: {
                    cat_name: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' },
                    ]
                },
                selectedParentValue: [],
                cascaderProps: {
                    label: "cat_name",
                    value: "cat_id",
                    children: "children"
                },
                parentCateList: []
            }
        },
        methods: {
            getCategoryList() {
                var list = JSON.parse(JSON.stringify(this.categoryList))
                var startNum = (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize
                var endNum = startNum + this.queryInfo.pageSize
                this.categoryLists = list.slice(startNum, endNum)
                this.total = list.length
            },
            handleSizeChange(currentSize) {
                this.queryInfo.pageSize = currentSize
                this.getCategoryList()
            },
            handleCurrentChange(currentPage) {
                this.queryInfo.pageNum = currentPage
                this.getCategoryList()
            },
            showAddCateDialog() {
                this.parentCateList = JSON.parse(JSON.stringify(this.categoryList))
                for (var j = 0; j < this.parentCateList.length; j++) {
                    for (var m = 0; m < this.parentCateList[j].children.length; m++) {
                        delete this.parentCateList[j].children[m].children
                    }
                }
                this.addCateDialogVisible = true
            },
            addCateHandleChange() {
                if (this.selectedParentValue.length > 0) {
                    this.addCateForm.cat_pid = this.selectedParentValue[this.selectedParentValue.length - 1]
                    this.addCateForm.cat_level = this.selectedParentValue.length
                } else {
                    this.addCateForm.cat_pid = 0
                    this.addCateForm.cat_level = 0
                }
            },
            addCate() {
                this.$refs.addCateFormRef.validate(valid => {
                    if (valid) {
                        var idArr = []
                        var pObj = {}
                        pObj.cat_pid = this.addCateForm.cat_pid
                        pObj.cat_level = this.addCateForm.cat_level
                        pObj.cat_name = this.addCateForm.cat_name
                        pObj.cat_deleted = false
                        this.findId(this.categoryList, idArr)
                        pObj.cat_id = this.getId(idArr)
                        if (this.addCateForm.cat_level === 0 || this.addCateForm.cat_level === 1) {
                            pObj.children = []
                        }
                        if (this.addCateForm.cat_pid === 0) {
                            this.categoryList.push(pObj)
                        } else {
                            this.addCateById(this.categoryList, pObj)
                        }
                        this.getCategoryList()
                        this.$message.success('添加分类成功')
                        this.addCateDialogVisible = false
                    }
                })
            },
            addCateDialogClose() {
                this.$refs.addCateFormRef.resetFields()
                this.addCateForm.cat_level = 0
                this.addCateForm.cat_pid = 0
                this.selectedParentValue = []
            },
            addCateById(categoryList, pObj) {
                for (var i = 0; i < categoryList.length; i++) {
                    if (this.addCateForm.cat_pid === categoryList[i].cat_id) {
                        categoryList[i].children.push(pObj)
                        return
                    } else if (categoryList[i].children) {
                        this.addCateById(categoryList[i].children, pObj)
                    }
                }
            },
            findId(categoryList, idArr) {
                for (var i = 0; i < categoryList.length; i++) {
                    idArr.push(categoryList[i].cat_id)
                    if (categoryList[i].children) {
                        this.findId(categoryList[i].children, idArr)
                    }
                }
                return idArr
            },
            getId(idArr) {
                var number = 0
                while (true) {
                    number = Math.floor(Math.random() * 100) + 1
                    var flag = true
                    idArr.forEach(function (value, index) {
                        if (value === number) {
                            flag = false
                        }
                    })
                    if (flag === true) {
                        break
                    }
                }
                return number
            }
        },
        created() {
            this.getCategoryList()
        },
    }
</script>
<style lang="less" scoped>

</style>
