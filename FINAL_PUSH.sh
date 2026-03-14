#!/bin/bash

echo "🎯 最终推送：Ancient Tree App"
echo "======================================"
echo ""

echo "📋 应用信息："
echo "   名称: Ancient Tree App"
echo "   包名: com.likan.ancienttreeapp"
echo "   版本: 1.0.0"
echo ""

echo "🐙 GitHub 信息："
echo "   用户名: likan19841106"
echo "   仓库: ancient-tree-app"
echo "   URL: https://github.com/likan19841106/ancient-tree-app.git"
echo ""

echo "🔧 配置远程仓库..."
# 清理旧的配置
git remote remove origin 2>/dev/null || true

# 添加正确的远程仓库
git remote add origin https://github.com/likan19841106/ancient-tree-app.git

echo "✅ 远程仓库已配置"
echo ""

echo "📤 准备推送代码..."
echo "======================================"
echo "🚨 重要：接下来需要 GitHub 凭证"
echo ""
echo "当提示输入时，请输入："
echo ""
echo "   Username: likan19841106"
echo "   Password: 你的 Personal Access Token"
echo ""
echo "💡 Token 创建：https://github.com/settings/tokens"
echo "   选择 'repo' 权限"
echo ""
echo "按 Enter 键开始推送..."
read

echo "🔄 正在推送代码到 GitHub..."
echo "（这可能需要几秒钟）"
echo ""

# 执行推送
git push -u origin main

# 检查结果
if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 推送成功！"
    echo ""
    echo "📊 构建进度："
    echo "   访问: https://github.com/likan19841106/ancient-tree-app/actions"
    echo ""
    echo "⏳ 预计构建时间: 10-15分钟"
    echo "📱 完成后下载 APK 文件"
    echo ""
    echo "✅ 完成！你的 Ancient Tree App 正在云端构建中..."
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "🔧 请手动执行："
    echo "   git push -u origin main"
    echo ""
    echo "📞 常见问题："
    echo "   1. 确保已创建 ancient-tree-app 仓库"
    echo "   2. 使用正确的 Personal Access Token"
    echo "   3. 检查网络连接"
fi