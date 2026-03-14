#!/bin/bash

echo "🚀 立即推送代码到 GitHub"
echo "======================================"
echo ""

echo "📋 请确保已完成："
echo "   1. ✅ 创建仓库: https://github.com/new"
echo "      - 名称: ancient-tree-app"
echo "      - ❌ 不要勾选: README, .gitignore, license"
echo ""
echo "   2. ✅ 创建 Token: https://github.com/settings/tokens"
echo "      - 选择 'repo' 权限"
echo "      - 复制生成的令牌"
echo ""

echo "🔧 正在配置..."
echo ""

# 清理旧的远程仓库
git remote remove origin 2>/dev/null || true

# 添加新的远程仓库
echo "🔗 添加远程仓库: https://github.com/likan19841106/ancient-tree-app.git"
git remote add origin https://github.com/likan19841106/ancient-tree-app.git

# 重命名分支
echo "🌿 重命名分支为 main..."
git branch -M main

echo ""
echo "📤 准备推送代码..."
echo "======================================"
echo "🚨 接下来会要求输入 GitHub 凭证"
echo ""
echo "🔐 请输入："
echo "   Username: likan19841106"
echo "   Password: 你的 Personal Access Token"
echo ""
echo "按 Enter 键开始推送..."
read

echo "🔄 正在推送代码..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "📊 查看构建进度："
    echo "   访问: https://github.com/likan19841106/ancient-tree-app/actions"
    echo ""
    echo "⏳ 预计构建时间: 10-15分钟"
    echo "📱 完成后在 Actions 页面下载 APK"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "🔧 手动执行命令："
    echo "   git push -u origin main"
fi