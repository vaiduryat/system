<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>参数列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card class="box-card">
            <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" closable show-icon>
            </el-alert>
            <el-row class='cat_opt'>
                <el-col>
                    <span>选择商品分类：</span>
                    <!-- 级联选择框区域 -->
                    <el-cascader v-model="selectValue" :options="categoryLists" :props="selectCateProps"
                        @change="SelectHandleChange" clearable></el-cascader>
                </el-col>
            </el-row>
            <!-- 标签页区域 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="静态参数" name="first">
                    <el-button type='primary' :disabled='isBtnDisable'>添加参数</el-button>
                </el-tab-pane>
                <el-tab-pane label="动态参数" name="second">
                    <el-button :disabled='isBtnDisable' type='primary'>添加属性</el-button>
                </el-tab-pane>
            </el-tabs>
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
                selectValue: [],
                selectCateProps: {
                    expandTrigger: 'hover',
                    label: 'cat_name',
                    value: 'cat_id',
                    children: 'children'
                },
                activeName: 'first',

            }
        },
        methods: {
            getCategoryList() {
                this.categoryLists = JSON.parse(JSON.stringify(this.categoryList))
            },
            SelectHandleChange() {
                console.log(this.selectValue)
            },
            handleClick() {
                console.log(this.activeName)
            }
        },
        created() {
            this.getCategoryList()
        },
        computed: {
            isBtnDisable() {
                if (this.selectValue.length === 0) {
                    return true
                }
                return false
            }
        },
    }
</script>
<style lang="less" scoped>
    .cat_opt {
        margin: 15px 0;
    }
</style>
