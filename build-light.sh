#!/bin/bash

echo "🚀 开始轻量级构建..."
echo "======================================"

# 设置临时目录到有空间的地方
export GRADLE_USER_HOME=/tmp/gradle-cache
export JAVA_OPTS="-Djava.io.tmpdir=/tmp"

# 环境变量
export ANDROID_HOME=/usr/local/android-sdk
export ANDROID_NDK_HOME=/usr/local/android-sdk/ndk/26.1.10909125

cd android

echo "🧹 最小化清理..."
./gradlew clean --no-daemon

echo "🔨 构建调试APK（最小化）..."
# 使用最小化配置构建
./gradlew assembleDebug \
  --no-daemon \
  --offline \
  --configure-on-demand \
  --parallel \
  --build-cache \
  --warning-mode=none

# 检查结果
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    echo ""
    echo "✅ 构建成功！"
    echo "📱 APK 大小: $(ls -lh app/build/outputs/apk/debug/app-debug.apk | awk '{print $5}')"
    echo "📁 位置: $(pwd)/app/build/outputs/apk/debug/app-debug.apk"
    
    # 复制到当前目录方便访问
    cp app/build/outputs/apk/debug/app-debug.apk ../myapp-debug.apk
    echo "📋 已复制到: ../myapp-debug.apk"
else
    echo "❌ 构建失败"
    exit 1
fi