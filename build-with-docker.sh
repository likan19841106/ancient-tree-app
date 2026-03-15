#!/bin/bash

echo "🐳 使用 Docker 构建 Android APK"
echo "======================================"
echo ""

echo "📋 这个方法："
echo "   ✅ 不需要本地 Android 环境"
echo "   ✅ 在隔离的容器中构建"
echo "   ✅ 避免磁盘空间问题"
echo "   ✅ 自动下载所有依赖"
echo ""

echo "🔧 准备构建环境..."
# 检查 Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，尝试安装..."
    apt-get update && apt-get install -y docker.io 2>/dev/null || {
        echo "无法安装 Docker，使用备选方案"
        exit 1
    }
fi

echo "📦 创建 Dockerfile..."
cat > Dockerfile.android << 'EOF'
FROM ubuntu:22.04

# 设置环境变量
ENV DEBIAN_FRONTEND=noninteractive

# 安装基础工具
RUN apt-get update && apt-get install -y \
    curl \
    git \
    wget \
    unzip \
    openjdk-17-jdk \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# 安装 Android SDK
RUN mkdir -p /android-sdk
WORKDIR /android-sdk
RUN wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip \
    && unzip commandlinetools-linux-11076708_latest.zip \
    && rm commandlinetools-linux-11076708_latest.zip \
    && mkdir -p cmdline-tools/latest \
    && mv cmdline-tools/* cmdline-tools/latest/

# 设置环境变量
ENV ANDROID_HOME=/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

# 接受许可证
RUN yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses

# 安装 Android 组件
RUN $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager \
    "platform-tools" \
    "platforms;android-34" \
    "build-tools;34.0.0"

# 复制项目文件
WORKDIR /app
COPY . .

# 安装 Node.js 依赖
RUN npm ci

# 生成原生代码
RUN npx expo prebuild --platform android

# 构建 APK
WORKDIR /app/android
RUN ./gradlew assembleDebug

# 输出 APK
RUN cp app/build/outputs/apk/debug/app-debug.apk /app-debug.apk

# 设置默认命令
CMD ["bash"]
EOF

echo "🐳 构建 Docker 镜像..."
docker build -f Dockerfile.android -t android-builder .

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Docker 镜像构建成功！"
    echo ""
    echo "📱 提取 APK 文件..."
    docker run --rm -v $(pwd):/output android-builder cp /app-debug.apk /output/
    
    if [ -f "app-debug.apk" ]; then
        echo ""
        echo "🎉 APK 构建成功！"
        echo "📦 文件: $(pwd)/app-debug.apk"
        echo "📊 大小: $(ls -lh app-debug.apk | awk '{print $5}')"
        echo ""
        echo "📱 安装到手机："
        echo "   1. 将 APK 文件复制到手机"
        echo "   2. 允许安装未知来源应用"
        echo "   3. 点击安装"
    else
        echo "❌ APK 文件未生成"
    fi
else
    echo "❌ Docker 构建失败"
    echo ""
    echo "🔧 备选方案：使用简化构建"
fi