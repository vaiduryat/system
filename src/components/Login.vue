<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box"><img src="../assets/logo.png" /></div>
            <!-- 登录表单区域 -->
            <el-form label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
                <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="iconfont con-3702mima" v-model="loginForm.password" type="password">
                    </el-input>
                </el-form-item>
                <el-form-item class="login_buttons">
                    <el-button type="primary" @click="loginFormValidate">登录</el-button>
                    <el-button type="info" @click="loginFormReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                // 为表单项添加数据绑定
                loginForm: {
                    username: '',
                    password: ''
                },
                // 为表单添加验证规则
                loginFormRules: {
                    username: [
                        { required: true, message: '请输入登录名称', trigger: 'blur' },
                        { required: true, min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6个到 15 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            loginFormReset() {
                this.$refs.loginFormRef.resetFields()
            },
            loginFormValidate() {
                // this.$refs.loginFormRef.validate(async valid => {
                //     if (!valid) return
                //     const { data: res } = await this.$http.post('login', this.loginForm)
                //     if (res.status !== 200) return $this.$message.error('登录失败')
                //     this.$message.success('登录成功')
                //     window.sessionStorage.setItem('token',res.data.token)
                //     this.$router.push('/home')
                // })
                this.$refs.loginFormRef.validate(valid => {
                    if (!valid) return
                    this.$message.success('登录成功')
                    window.sessionStorage.setItem('token', 'jiting')
                    this.$router.push('/home')
                })
            }
        },
    }
</script>

<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 3px;

        >.avatar_box {
            width: 130px;
            height: 130px;
            border: 1px solid #cccccc;
            border-radius: 50%;
            padding: 10px;
            left: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
            background-color: #ffffff;
            border-shadow: 0 0 10px #dddddd;

            >img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eeeeee;
            }
        }

        >.login_form {
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 20px;
            box-sizing: border-box;

            >.login_buttons {
                display: flex;
                justify-content: flex-end;
            }

        }
    }
</style>
