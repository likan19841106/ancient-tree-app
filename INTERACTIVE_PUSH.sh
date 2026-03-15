#!/bin/bash

echo "🎯 交互式推送指南"
echo "======================================"
echo ""

echo "📋 当前状态："
echo "   ✅ 仓库已存在: ancient-tree-app"
echo "   ✅ 代码已准备就绪"
echo "   🔧 需要: 正确的 Token 权限"
echo ""

echo "🚀 执行以下步骤："
echo ""
echo "1. 创建新 Token（有正确权限）："
echo "   访问: https://github.com/settings/tokens"
echo "   点击: Generate new token (classic)"
echo "   选择: ✅ repo (全选) + ✅ workflow"
echo "   生成并复制 Token"
echo ""
echo "2. 执行推送命令："
echo "   cd /root/.openclaw/workspace/mobileapp/MyMobileApp"
echo "   git push -u origin main"
echo ""
echo "3. 身份验证时输入："
echo "   Username: likan19841106"
echo "   Password: 你的新 Token"
echo ""
echo "4. 查看构建进度："
echo "   访问: https://github.com/likan19841106/ancient-tree-app/actions"
echo ""
echo "📱 完成后下载 APK 文件"
echo ""
echo "按 Enter 键开始执行第2步..."
read

echo "🔄 正在执行推送命令..."
echo "（接下来会提示输入凭证）"
echo "======================================"

cd /root/.openclaw/workspace/mobileapp/MyMobileApp
git push -u origin main