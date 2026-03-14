#!/bin/bash

echo "🚀 准备推送到 GitHub 进行云构建"
echo "======================================"

# 检查是否在Git仓库中
if [ ! -d ".git" ]; then
    echo "❌ 当前目录不是Git仓库"
    exit 1
fi

echo "📦 添加所有文件..."
git add .

echo "💾 提交更改..."
git commit -m "Update for cloud build" || echo "没有新更改"

echo ""
echo "📋 下一步操作："
echo "1. 在 GitHub 创建新仓库：https://github.com/new"
echo "2. 不要初始化 README、.gitignore 或 license"
echo "3. 复制仓库URL（如：https://github.com/你的用户名/ancient-tree-app.git）"
echo ""
echo "🔗 然后运行以下命令："
echo "   git remote add origin https://github.com/你的用户名/ancient-tree-app.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "⚡ GitHub Actions 会自动构建APK，你可以在仓库的 Actions 标签页下载"