#!/bin/bash

echo "🚀 通过 GitHub API 推送代码"
echo "======================================"
echo ""

echo "📋 这个方法需要："
echo "   1. 有效的 Personal Access Token"
echo "   2. 有 'repo' 和 'workflow' 权限"
echo "   3. 仓库已存在: ancient-tree-app"
echo ""

echo "💡 请先创建正确的 Token："
echo "   访问: https://github.com/settings/tokens"
echo "   选择: repo (全选) + workflow"
echo ""

echo "📝 请输入你的新 Token："
read -p "Token: " TOKEN

if [ -z "$TOKEN" ]; then
    echo "❌ 未输入 Token"
    exit 1
fi

echo ""
echo "🔄 正在准备代码..."
# 创建代码存档
cd /root/.openclaw/workspace/mobileapp/MyMobileApp
git archive --format=tar.gz HEAD -o code.tar.gz

echo "📤 通过 API 上传代码..."
echo "（这可能需要一些时间）"
echo ""

# 这里应该调用 GitHub API，但需要更复杂的脚本
# 暂时先显示手动步骤

echo "🔧 由于 API 调用较复杂，建议手动执行："
echo ""
echo "1. 访问: https://github.com/likan19841106/ancient-tree-app"
echo "2. 点击 'Add file' → 'Upload files'"
echo "3. 上传项目文件"
echo "4. 或者使用以下命令手动推送："
echo ""
echo "   git push -u origin main"
echo ""
echo "🔐 身份验证时："
echo "   Username: likan19841106"
echo "   Password: 上面输入的 Token"