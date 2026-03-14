#!/bin/bash

echo "🚀 推送 Ancient Tree App 到 GitHub"
echo "======================================"
echo ""

echo "📋 正确仓库信息："
echo "   用户名: likan19841106"
echo "   仓库名: ancient-tree-app"
echo "   仓库URL: https://github.com/likan19841106/ancient-tree-app.git"
echo ""

echo "🔧 配置远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/likan19841106/ancient-tree-app.git

echo ""
echo "📤 准备推送代码..."
echo "======================================"
echo "🚨 接下来会要求输入 GitHub 凭证"
echo ""
echo "🔐 请输入："
echo "   Username: likan19841106"
echo "   Password: Personal Access Token (有 repo 权限)"
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
    echo ""
    echo "🎉 应用名称: Ancient Tree App"
    echo "📦 包名: com.likan.ancienttreeapp"
else
    echo ""
    echo "❌ 推送失败，可能原因："
    echo "   1. 仓库不存在 - 请先创建 ancient-tree-app 仓库"
    echo "   2. Token 错误 - 请使用正确的 Personal Access Token"
    echo "   3. 网络问题 - 请检查网络连接"
fi