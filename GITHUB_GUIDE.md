# GitHub 云构建指南

## 📱 获取 Android APK 的完整流程

### 第一步：创建 GitHub 仓库
1. 访问 https://github.com/new
2. 填写信息：
   - **Owner**: 你的用户名
   - **Repository name**: `ancient-tree-app` (建议)
   - **Description**: `React Native 移动应用` (可选)
3. **重要**: 不要勾选：
   - ☐ Add a README file
   - ☐ Add .gitignore  
   - ☐ Choose a license
4. 点击 **Create repository**

### 第二步：获取仓库URL
创建成功后，复制显示的URL：
```
https://github.com/你的用户名/ancient-tree-app.git
```

### 第三步：推送代码到GitHub

在项目目录中运行以下命令（替换 YOUR_USERNAME）：

```bash
# 1. 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/ancient-tree-app.git

# 2. 重命名分支为 main（GitHub默认）
git branch -M main

# 3. 推送代码
git push -u origin main
```

### 第四步：身份验证
如果提示输入密码：
- **推荐**: 使用 GitHub Personal Access Token
- **备用**: 使用 GitHub 密码

#### 如何创建 Personal Access Token：
1. 访问 https://github.com/settings/tokens
2. 点击 **Generate new token**
3. 选择 **repo** 权限
4. 点击 **Generate token**
5. 复制生成的令牌（作为密码使用）

### 第五步：等待构建完成
1. 访问你的仓库页面：`https://github.com/YOUR_USERNAME/ancient-tree-app`
2. 点击 **Actions** 标签页
3. 查看构建进度（约10-15分钟）

### 第六步：下载APK
构建完成后：
1. 在 Actions 页面点击最新的工作流
2. 在 **Artifacts** 部分下载 `android-apk`
3. 将APK文件安装到Android手机

## 🔄 后续更新
更新代码后自动构建：
```bash
git add .
git commit -m "更新描述"
git push
```

## 📞 遇到问题？
1. **权限错误**: 确保使用正确的 Personal Access Token
2. **构建失败**: 查看 Actions 日志中的错误信息
3. **找不到仓库**: 检查仓库URL是否正确

## ⏱️ 预计时间
- 创建仓库: 2分钟
- 推送代码: 2分钟  
- 构建APK: 10-15分钟
- 总计: 15-20分钟

## 🎉 完成！
构建成功后，你可以在任何Android手机上安装APK，无需Expo Go应用。