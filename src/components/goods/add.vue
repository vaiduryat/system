<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card class="box-card">
            <!-- 提示区域 -->
            <el-alert title="添加商品信息" type="info" show-icon :closable='false' center>
            </el-alert>
            <!-- 步骤条区域 -->
            <el-steps :space="200" :active="activeIndex-0" finish-status="success" align-center>
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <!-- tabs栏区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position='top'>
                <el-tabs :tab-position="'left'" v-model='activeIndex' :before-leave='beforeLeave' @tab-click='tabClick'>
                    <el-tab-pane label="基本信息" name='0'>
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-model="addForm.goods_price" type='number'></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addForm.goods_weight" type='number'></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="addForm.goods_number" type='number'></el-input>
                        </el-form-item>
                        <el-form-item label='商品分类' prop='goods_cat'>
                            <el-cascader v-model="addForm.goods_cat" :options="categoryLists" :props="categoryProps"
                                @change="handleCategoryChange" clearable></el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name='1'>
                        <el-form-item :label='item.attr_name' v-for='(item,i) in addForm.manyTableData'
                            :key='item.attr_id'>
                            <el-checkbox-group v-model="item.attr_vals">
                                <el-checkbox :label="item1" v-for='(item1,i1) in item.attr_vals' :key='i1' border>
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name='2'>
                        <el-form-item v-for='(item2,i) in addForm.onlyTableData' :label='item2.attr_name'
                            :key='item2.attr_id'>
                            <el-input v-model='item2.attr_vals'></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name='3'>
                        <!-- 上传图片组件 -->
                        <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                            :on-remove="handleRemove" list-type="picture" :on-success='handleSuccess'>
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name='4'>
                        <!-- 富文本组件 -->
                        <quill-editor v-model='addForm.goods_introduce'>
                        </quill-editor>
                        <el-button type='primary' @click='addProduct'>添加商品</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
        <!-- 图片预览组件 -->
        <el-dialog title="图片预览" :visible.sync="pictureDialogVisible" width="50%">
            <img :src="picUrl" alt="" class="picUrl">
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '0',
                addForm: {
                    goods_name: '',
                    goods_price: '',
                    goods_weight: '',
                    goods_number: '',
                    goods_cat: [],
                    pics: [],
                    goods_introduce: '',
                    manyTableData: [],
                    onlyTableData: []
                },
                addFormRules: {
                    goods_name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],
                    goods_price: [
                        { required: true, message: '请输入商品价格', trigger: 'blur' }
                    ],
                    goods_weight: [
                        { required: true, message: '请输入商品重量', trigger: 'blur' }
                    ],
                    goods_number: [
                        { required: true, message: '请输入商品数量', trigger: 'blur' }
                    ],
                    goods_cat: [
                        { required: true, message: '请选择商品分类', trigger: 'blur' }
                    ]
                },
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
                                        "cat_id": 16,
                                        "cat_name": "游戏本",
                                        "cat_pid": 14,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 17,
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
                                        "cat_id": 26,
                                        "cat_name": "游戏机",
                                        "cat_pid": 15,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 27,
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
                                        "cat_id": 36,
                                        "cat_name": "油画",
                                        "cat_pid": 30,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 37,
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
                                        "cat_id": 46,
                                        "cat_name": "工艺礼品",
                                        "cat_pid": 40,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 47,
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
                                        "cat_id": 56,
                                        "cat_name": "蒲公英",
                                        "cat_pid": 50,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 57,
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
                                        "cat_id": 66,
                                        "cat_name": "夹克",
                                        "cat_pid": 113,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 67,
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
                                        "cat_id": 76,
                                        "cat_name": "夹克",
                                        "cat_pid": 223,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 77,
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
                                        "cat_id": 86,
                                        "cat_name": "夹克",
                                        "cat_pid": 333,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 87,
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
                                        "cat_id": 96,
                                        "cat_name": "苹果",
                                        "cat_pid": 23,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 97,
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
                                        "cat_id": 106,
                                        "cat_name": "猪肉",
                                        "cat_pid": 24,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 107,
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
                                        "cat_id": 206,
                                        "cat_name": "水饺",
                                        "cat_pid": 25,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 207,
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
                                        "cat_id": 306,
                                        "cat_name": "隔离",
                                        "cat_pid": 36,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 307,
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
                                        "cat_id": 406,
                                        "cat_name": "洗发水",
                                        "cat_pid": 34,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 407,
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
                                        "cat_id": 506,
                                        "cat_name": "花露水",
                                        "cat_pid": 35,
                                        "cat_level": 2,
                                        "cat_deleted": false
                                    },
                                    {
                                        "cat_id": 507,
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
                categoryProps: {
                    expandTrigger: 'hover',
                    label: 'cat_name',
                    value: 'cat_id',
                    children: 'children'
                },
                idArr: [],
                attrArr: [],
                pictureDialogVisible: false,
                picUrl: ''

            }
        },
        methods: {
            getCateList() {
                this.categoryLists = JSON.parse(JSON.stringify(this.categoryList))
            },
            handleCategoryChange() {
                console.log(this.addForm.goods_cat)
            },
            beforeLeave(activeName, oldActiveName) {
                if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
                    this.$message.error('请先选择商品分类')
                    return false
                }
            },
            findId(categoryList, idArr) {
                for (var i = 0; i < categoryList.length; i++) {
                    if (!categoryList[i].children) {
                        idArr.push(categoryList[i].cat_id)
                    }
                    if (categoryList[i].children) {
                        this.findId(categoryList[i].children, idArr)
                    }
                }
                return idArr
            },
            setArr() {
                for (var i = 0; i < this.idArr.length; i++) {
                    var obj = {}
                    obj.catId = this.idArr[i]
                    var only = [{
                        "attr_id": 1,
                        "attr_name": "主体-商品名称",
                        "cat_id": 22,
                        "attr_sel": "only",
                        "attr_write": "manual",
                        "attr_vals": "TCL电视"
                    },
                    {
                        "attr_id": 2,
                        "attr_name": "显示-曲面",
                        "cat_id": 22,
                        "attr_sel": "only",
                        "attr_write": "manual",
                        "attr_vals": "是"
                    }, {
                        "attr_id": 3,
                        "attr_name": "系统-智能电视",
                        "cat_id": 22,
                        "attr_sel": "only",
                        "attr_write": "manual",
                        "attr_vals": "智能电视"
                    }]
                    var many = [{
                        "attr_id": 1,
                        "attr_name": "版式",
                        "cat_id": 22,
                        "attr_sel": "many",
                        "attr_write": "manual",
                        "attr_vals": ['4k超薄曲面', '人工智能', '24寸']
                    },
                    {
                        "attr_id": 2,
                        "attr_name": "颜色",
                        "cat_id": 22,
                        "attr_sel": "many",
                        "attr_write": "manual",
                        "attr_vals": ['黄色', '黑色']
                    }]
                    obj.only = only
                    obj.many = many
                    this.attrArr.push(obj)
                }
                console.log(this.attrArr)
            },
            tabClick() {
                if (this.activeIndex === '1') {
                    for (var i = 0; i < this.attrArr.length; i++) {
                        if (this.attrArr[i].catId === this.catId) {
                            this.addForm.manyTableData = this.attrArr[i].many
                        }
                    }
                    console.log(this.addForm.manyTableData)
                }
                if (this.activeIndex === '2') {
                    for (var j = 0; j < this.attrArr.length; j++) {
                        if (this.attrArr[j].catId === this.catId) {
                            this.addForm.onlyTableData = this.attrArr[j].only
                        }
                    }
                    console.log(this.addForm.onlyTableData)
                }
            },
            handlePreview(file) {
                this.picUrl = file.url
                this.pictureDialogVisible = true
            },
            handleRemove(file) {
                var index = this.addForm.pics.findIndex(x => x.pic === file.url)
                this.addForm.pics.splice(index, 1)
                console.log(this.addForm.pics)
            },
            handleSuccess(response, file) {
                var picObj = { pic: file.url }
                this.addForm.pics.push(picObj)
                console.log(this.addForm.pics)
            },
            addProduct() {
                this.$refs.addFormRef.validate(valid => {
                    if (valid) {
                        this.$message.success('添加商品成功')
                        this.$router.push('/list')
                    }
                })
            }
        },
        created() {
            this.getCateList()
            this.findId(this.categoryLists, this.idArr)
            this.setArr()
        },
        computed: {
            catId() {
                if (this.addForm.goods_cat.length === 3) {
                    return this.addForm.goods_cat[2]
                }
                return null
            }
        },
    }
</script>

<style lang="less" scoped>
    .el-checkbox {
        margin: 0 5px 0 0 !important;
    }

    .picUrl {
        width: 100%;
    }

    .quill-editor {
        min-height: 300px;
    }

    .ql-container {
        min-height: 300px;
    }
</style>
