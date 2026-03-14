#!/bin/bash

# 设置环境变量
export ANDROID_HOME=/usr/local/android-sdk
export ANDROID_NDK_HOME=/usr/local/android-sdk/ndk/26.1.10909125
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

echo "🚀 开始构建 Android APK..."
echo "======================================"

# 进入 Android 目录
cd android

# 清理之前的构建
echo "🧹 清理构建缓存..."
./gradlew clean

# 构建调试版本
echo "🔨 构建调试版本 APK..."
./gradlew assembleDebug

# 检查构建结果
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    echo "✅ 构建成功！"
    echo "📱 APK 文件位置:"
    echo "   $(pwd)/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "📊 APK 文件信息:"
    ls -lh "app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "📋 如何安装到手机:"
    echo "   1. 将 APK 文件复制到手机"
    echo "   2. 在手机上允许安装未知来源应用"
    echo "   3. 点击 APK 文件进行安装"
    echo ""
    echo "💡 提示: 可以使用 adb 命令安装:"
    echo "   adb install app/build/outputs/apk/debug/app-debug.apk"
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi