<template>
    <div>
        >
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <!-- 搜索框 -->
                <el-col :span="8">
                    <el-input placeholder="请输入内容" class="input-with-select" v-model="queryInfo.query" clearable
                        @clear="getOrderList">
                        <el-button slot="append" icon="el-icon-search" @click='getOrderList'></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!-- 表格区域 -->
            <el-table :data='orderList' stripe border>
                <el-table-column type='index' label='#'></el-table-column>
                <el-table-column label='订单编号' prop='order_number'></el-table-column>
                <el-table-column label='订单价格' prop='order_price'></el-table-column>
                <el-table-column label='是否付款' prop='order_pay'>
                    <template slot-scope="scope">
                        <el-tag type='danger' v-if='scope.row.order_pay===0'>未付款</el-tag>
                        <el-tag type='success' v-else>已付款</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label='是否发货' prop='is_send'></el-table-column>
                <el-table-column label='下单时间' prop='create_time'>
                    <template slot-scope="scope">
                        {{scope.row.create_time|dataFormat}}
                    </template>
                </el-table-column>
                <el-table-column label='操作'>
                    <el-button type="primary" icon="el-icon-edit" size='mini' @click='showBox'></el-button>
                    <el-button type="success" icon="el-icon-location" size='mini' @click='progressDialogVisible=true'>
                    </el-button>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum" :page-sizes="[2, 3, 4, 5]" :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
        <!-- 省市联动对话框 -->
        <el-dialog title="提示" :visible.sync="addressDialogVisible" width="50%" @close='addressDialogClose'>
            <!-- 表单区域 -->
            <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px">
                <el-form-item label="省市区/县" prop="address1">
                    <el-cascader v-model="addressForm.address1" :options="citydata" :props="addressProps"
                        @change="handleChange"></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="address2">
                    <el-input v-model="addressForm.address2"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addressDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addressDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 物流信息对话框 -->
        <el-dialog title="物流信息" :visible.sync="progressDialogVisible" width="50%">
            <el-timeline :reverse="reverse">
                <el-timeline-item v-for="(activity, index) in progressInfo" :key="index" :timestamp="activity.time">
                    {{activity.context}}
                </el-timeline-item>
            </el-timeline>
        </el-dialog>

    </div>
</template>

<script>
    import citydata from './citydata.js'
    export default {
        data() {
            return {
                orderLists: [
                    {
                        "order_id": 47,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 48,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 49,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 50,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 51,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 52,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 53,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 54,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    }, {
                        "order_id": 55,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 56,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 57,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 58,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 59,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 60,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 61,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 62,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 63,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 64,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 65,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 66,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 67,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 68,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 69,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 70,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 71,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 72,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 73,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 74,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    },
                    {
                        "order_id": 75,
                        "user_id": 133,
                        "order_number": "itcast-59e7502d7993d",
                        "order_price": 322,
                        "order_pay": "1",
                        "is_send": "是",
                        "trade_no": "",
                        "order_fapiao_title": "个人",
                        "order_fapiao_company": "",
                        "order_fapiao_content": "办公用品",
                        "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                        "pay_status": "1",
                        "create_time": 1508331565,
                        "update_time": 1508331565
                    }
                ],
                queryInfo: {
                    query: '',
                    pageNum: 1,
                    pageSize: 2
                },
                total: 0,
                orderList: [],
                addressDialogVisible: false,
                addressForm: {
                    address1: [],
                    address2: ''
                },
                addressFormRules: {
                    address1: [
                        { required: true, message: '请选择省市区/县', trigger: 'blur' },
                    ],
                    address2: [
                        { required: true, message: '请填写详细地址信息', trigger: 'blur' },
                    ]
                },
                citydata,
                addressProps: {
                    expandTrigger: 'hover',
                    label: 'label',
                    value: 'value',
                    children: 'children'
                },
                progressInfo: [
                    {
                        "time": "2018-05-10 09:39:00",
                        "ftime": "2018-05-10 09:39:00",
                        "context": "已签收,感谢使用顺丰,期待再次为您服务",
                        "location": ""
                    },
                    {
                        "time": "2018-05-10 08:23:00",
                        "ftime": "2018-05-10 08:23:00",
                        "context": "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
                        "location": ""
                    },
                    {
                        "time": "2018-05-10 07:32:00",
                        "ftime": "2018-05-10 07:32:00",
                        "context": "快件到达 [北京海淀育新小区营业点]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-10 02:03:00",
                        "ftime": "2018-05-10 02:03:00",
                        "context": "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 23:05:00",
                        "ftime": "2018-05-09 23:05:00",
                        "context": "快件到达 [北京顺义集散中心]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 21:21:00",
                        "ftime": "2018-05-09 21:21:00",
                        "context": "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 13:07:00",
                        "ftime": "2018-05-09 13:07:00",
                        "context": "顺丰速运 已收取快件",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 12:25:03",
                        "ftime": "2018-05-09 12:25:03",
                        "context": "卖家发货",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 12:22:24",
                        "ftime": "2018-05-09 12:22:24",
                        "context": "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
                        "location": ""
                    },
                    {
                        "time": "2018-05-08 21:36:04",
                        "ftime": "2018-05-08 21:36:04",
                        "context": "商品已经下单",
                        "location": ""
                    }
                ],
                progressDialogVisible: false
            }
        },
        methods: {
            getOrderList() {
                var list = []
                for (var i = 0; i < this.orderLists.length; i++) {
                    if (this.queryInfo.query === this.orderLists[i].order_number) {
                        list.push(this.orderLists[i])
                    }
                }
                if (list.length === 0) {
                    list = this.orderLists
                }
                var startNum = (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize
                var endNum = startNum + this.queryInfo.pageSize
                this.orderList = list.slice(startNum, endNum)
                this.total = list.length
            },
            handleSizeChange(currentSize) {
                this.queryInfo.pageSize = currentSize
                this.getOrderList()
            },
            handleCurrentChange(currentPage) {
                this.queryInfo.pageNum = currentPage
                this.getOrderList()
            },
            showBox() {
                this.addressDialogVisible = true
            },
            addressDialogClose() {
                this.$refs.addressFormRef.resetFields()
            },
            handleChange() {

            }
        },
        created() {
            this.getOrderList()
        },
    }
</script>

<style lang="less" scoped>
    .el-row {
        margin-bottom: 15px;
    }

    .el-cascader {
        width: 100%;
    }
</style>
