#!/bin/bash

echo "🔐 使用新 Token 推送（需要 workflow 权限）"
echo "======================================"
echo ""

echo "📋 请先完成："
echo "   1. ✅ 创建仓库: https://github.com/new"
echo "      - 名称: ancient-tree-app"
echo "      - ❌ 不要初始化任何文件"
echo ""
echo "   2. ✅ 创建新 Token: https://github.com/settings/tokens"
echo "      - 选择权限: repo (全选) + workflow"
echo "      - 复制新 Token"
echo ""

echo "📝 请输入你的新 Token："
read -p "Token: " NEW_TOKEN

if [ -z "$NEW_TOKEN" ]; then
    echo "❌ 未输入 Token"
    exit 1
fi

REPO_URL="https://${NEW_TOKEN}@github.com/likan19841106/ancient-tree-app.git"

echo ""
echo "🔧 配置远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"

echo "📤 推送代码..."
echo ""

if git push -u origin main; then
    echo ""
    echo "🎉 推送成功！"
    echo ""
    echo "📊 构建进度："
    echo "   访问: https://github.com/likan19841106/ancient-tree-app/actions"
    echo ""
    echo "⏳ 预计构建时间: 10-15分钟"
    echo "📱 完成后下载 APK 文件"
    echo ""
    echo "✅ Ancient Tree App 正在云端构建中..."
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "🔧 请手动执行："
    echo "   git push -u origin main"
fi