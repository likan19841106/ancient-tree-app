# 🚀 快速开始 - GitHub 云构建

## 只需3步获取 Android APK

### 第1步：创建 GitHub 仓库
1. **打开浏览器**访问: https://github.com/new
2. **填写信息**:
   - Repository name: `ancient-tree-app`
   - Description: (可选)
3. **重要**: 不要勾选任何初始化选项
4. **点击**: Create repository

### 第2步：运行推送脚本
在终端中执行（替换 YOUR_USERNAME）:

```bash
cd mobileapp/MyMobileApp
./final-push.sh YOUR_USERNAME
```

例如:
```bash
cd mobileapp/MyMobileApp
./final-push.sh likan19841106
```

### 第3步：身份验证
脚本会提示输入:
- **用户名**: 你的 GitHub 用户名
- **密码**: GitHub Personal Access Token

**如何获取 Token**:
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token"
3. 选择 "repo" 权限
4. 点击 "Generate token"
5. 复制生成的令牌

## ⏱️ 时间线
- 创建仓库: 2分钟
- 推送代码: 2分钟
- 构建 APK: 10-15分钟
- 总计: 15-20分钟

## 📱 获取 APK
构建完成后:
1. 访问: `https://github.com/YOUR_USERNAME/ancient-tree-app/actions`
2. 点击最新的构建
3. 下载 "android-apk" 文件
4. 安装到 Android 手机

## 🔄 后续更新
更新代码后自动构建:
```bash
git add .
git commit -m "更新描述"
git push
```

## 🆘 遇到问题？
1. **仓库不存在**: 确保已创建仓库
2. **权限错误**: 使用正确的 Personal Access Token
3. **构建失败**: 查看 Actions 日志

## 🎉 完成！
现在开始第1步吧！