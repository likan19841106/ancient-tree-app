#!/bin/bash

echo "🎯 GitHub 云构建 - 最终版"
echo "======================================"
echo ""

# 检查参数
if [ -z "$1" ]; then
    echo "❌ 使用方法: ./final-push.sh YOUR_GITHUB_USERNAME"
    echo ""
    echo "📋 例如:"
    echo "   ./final-push.sh likan19841106"
    echo ""
    echo "💡 如果你还没有 GitHub 仓库:"
    echo "   1. 访问 https://github.com/new"
    echo "   2. 创建名为 'ancient-tree-app' 的仓库"
    echo "   3. ❌ 不要勾选: README, .gitignore, license"
    exit 1
fi

GITHUB_USER="$1"
REPO_URL="https://github.com/$GITHUB_USER/ancient-tree-app.git"

echo "📊 配置信息:"
echo "   用户名: $GITHUB_USER"
echo "   仓库URL: $REPO_URL"
echo ""

# 检查是否已配置远程仓库
if git remote -v | grep -q "origin"; then
    echo "⚠️  已存在远程仓库，正在更新..."
    git remote remove origin
fi

echo "🔗 添加远程仓库..."
git remote add origin "$REPO_URL"

echo "🌿 设置分支..."
git branch -M main

echo ""
echo "📤 准备推送代码..."
echo "======================================"
echo "🚨 重要: 接下来会要求输入 GitHub 凭证"
echo ""
echo "🔐 请输入:"
echo "   用户名: $GITHUB_USER"
echo "   密码: GitHub Personal Access Token"
echo ""
echo "💡 如何创建 Token:"
echo "   访问 https://github.com/settings/tokens"
echo "   选择 'repo' 权限即可"
echo ""
echo "按 Enter 键开始推送，或 Ctrl+C 取消..."
read

echo "🔄 正在推送代码到 GitHub..."
if git push -u origin main; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "📊 查看构建进度:"
    echo "   访问: https://github.com/$GITHUB_USER/ancient-tree-app/actions"
    echo ""
    echo "⏳ 预计构建时间: 10-15分钟"
    echo "📱 完成后在 Actions 页面下载 APK"
else
    echo ""
    echo "❌ 推送失败，可能的原因:"
    echo "   1. 仓库不存在 - 请先创建仓库"
    echo "   2. 凭证错误 - 请使用正确的 Token"
    echo "   3. 网络问题 - 请检查网络连接"
    echo ""
    echo "🔧 手动命令:"
    echo "   git push -u origin main"
fi