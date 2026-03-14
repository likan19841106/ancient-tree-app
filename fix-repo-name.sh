#!/bin/bash

echo "🔧 修正仓库名称从 'ancient-tree-app' 到 'ancient-tree-app'"
echo "======================================"

# 更新所有文件中的仓库名称
for file in *.sh *.md *.txt; do
    if [ -f "$file" ]; then
        echo "更新: $file"
        sed -i 's/ancient-tree-app/ancient-tree-app/g' "$file"
    fi
done

# 更新 .github/workflows 中的文件
if [ -d ".github/workflows" ]; then
    for file in .github/workflows/*.yml .github/workflows/*.yaml; do
        if [ -f "$file" ]; then
            echo "更新: $file"
            sed -i 's/ancient-tree-app/ancient-tree-app/g' "$file"
        fi
    done
fi

echo ""
echo "✅ 仓库名称已更新！"
echo ""
echo "📋 正确的仓库信息："
echo "   用户名: likan19841106"
echo "   仓库名: ancient-tree-app"
echo "   仓库URL: https://github.com/likan19841106/ancient-tree-app.git"
echo ""
echo "🚀 现在可以正确推送了！"