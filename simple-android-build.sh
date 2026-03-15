#!/bin/bash

echo "📱 简化 Android APK 构建"
echo "======================================"
echo ""

echo "📋 步骤："
echo "   1. 检查环境"
echo "   2. 清理空间"
echo "   3. 最小化构建"
echo "   4. 生成 APK"
echo ""

# 步骤1：检查环境
echo "🔍 检查环境..."
which java && java -version
echo ""

# 步骤2：清理空间
echo "🧹 清理空间..."
cd /root/.openclaw/workspace/mobileapp/MyMobileApp
rm -rf android/build android/.gradle ~/.gradle/caches 2>/dev/null || true

# 使用临时目录
export GRADLE_USER_HOME=/tmp/gradle-cache
export JAVA_OPTS="-Djava.io.tmpdir=/tmp"

# 步骤3：最小化构建
echo "🔨 开始构建..."
echo "（这可能需要 10-20 分钟）"
echo ""

# 只构建必要的部分
cd android

# 使用最小化配置
timeout 1800 ./gradlew clean assembleDebug \
    --no-daemon \
    --configure-on-demand \
    --parallel \
    --build-cache \
    --warning-mode=none \
    -x lint \
    -x test \
    -x ktlint

# 步骤4：检查结果
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    echo ""
    echo "🎉 构建成功！"
    echo ""
    echo "📦 APK 信息："
    echo "   文件: $(pwd)/app/build/outputs/apk/debug/app-debug.apk"
    echo "   大小: $(ls -lh app/build/outputs/apk/debug/app-debug.apk | awk '{print $5}')"
    echo ""
    echo "📱 安装方法："
    echo "   方法A: adb install app/build/outputs/apk/debug/app-debug.apk"
    echo "   方法B: 复制到手机手动安装"
    echo "   方法C: 通过网盘/聊天工具发送"
    echo ""
    echo "✅ 完成！"
else
    echo ""
    echo "❌ 构建失败"
    echo ""
    echo "🔧 尝试备选方案..."
fi