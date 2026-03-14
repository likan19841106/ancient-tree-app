#!/bin/bash

echo "🚀 GitHub 云构建 - 一键推送脚本"
echo "======================================"
echo ""

# 检查是否已设置远程仓库
if git remote -v | grep -q "origin"; then
    echo "✅ 已配置远程仓库:"
    git remote -v
    echo ""
    echo "📤 正在推送代码..."
    git push -u origin main 2>/dev/null || git push -u origin master 2>/dev/null || {
        echo "❌ 推送失败，请手动运行:"
        echo "   git push -u origin main"
        exit 1
    }
    echo "✅ 代码已推送！"
    echo ""
    echo "📊 查看构建进度:"
    echo "   访问你的 GitHub 仓库 → 点击 'Actions' 标签页"
    exit 0
fi

echo "📋 请先完成以下步骤："
echo ""
echo "1. 创建 GitHub 仓库:"
echo "   访问 https://github.com/new"
echo "   仓库名: ancient-tree-app (或其他名称)"
echo "   ❌ 不要勾选: README, .gitignore, license"
echo ""
echo "2. 复制仓库URL (如):"
echo "   https://github.com/YOUR_USERNAME/ancient-tree-app.git"
echo ""
echo "3. 运行以下命令 (替换 YOUR_USERNAME):"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/ancient-tree-app.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "🔐 身份验证提示:"
echo "   - 用户名: 你的 GitHub 用户名"
echo "   - 密码: GitHub Personal Access Token (推荐)"
echo ""
echo "💡 创建 Token: https://github.com/settings/tokens"
echo "   选择 'repo' 权限即可"