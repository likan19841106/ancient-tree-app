import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  List, 
  Divider,
  Avatar,
  TextInput,
  Dialog,
  Portal,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  
  // 用户设置
  const [userProfile, setUserProfile] = useState({
    name: '李侃',
    email: 'likan@example.com',
    phone: '13800138000',
    avatar: 'LK',
  });
  
  // 应用设置
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSync: true,
    dataSaving: false,
    biometricLogin: true,
    language: 'zh-CN',
    theme: 'light',
  });
  
  // 对话框状态
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  
  // 表单状态
  const [editedProfile, setEditedProfile] = useState({ ...userProfile });
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSettingToggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const handleSaveProfile = () => {
    setUserProfile({ ...editedProfile });
    setShowProfileDialog(false);
    Alert.alert('成功', '个人资料已更新');
  };

  const handleChangePassword = () => {
    if (password.new !== password.confirm) {
      Alert.alert('错误', '新密码和确认密码不一致');
      return;
    }
    
    if (password.new.length < 6) {
      Alert.alert('错误', '密码长度至少6位');
      return;
    }
    
    setPassword({ current: '', new: '', confirm: '' });
    setShowPasswordDialog(false);
    Alert.alert('成功', '密码已更新');
  };

  const handleLanguageSelect = (lang) => {
    setSettings({ ...settings, language: lang });
    setShowLanguageDialog(false);
    Alert.alert('成功', `语言已切换为 ${lang === 'zh-CN' ? '简体中文' : 'English'}`);
  };

  const handleLogout = () => {
    Alert.alert(
      '确认退出',
      '确定要退出登录吗？',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '退出', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('已退出', '您已成功退出登录');
            // 这里应该跳转到登录页面
          }
        },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      '清除缓存',
      '确定要清除应用缓存吗？',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '清除', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('成功', '缓存已清除');
          }
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, right }) => (
    <TouchableOpacity onPress={onPress}>
      <List.Item
        title={title}
        description={subtitle}
        left={props => <List.Icon {...props} icon={icon} />}
        right={right}
      />
      <Divider />
    </TouchableOpacity>
  );

  const SwitchSetting = ({ icon, title, subtitle, value, onValueChange }) => (
    <View>
      <List.Item
        title={title}
        description={subtitle}
        left={props => <List.Icon {...props} icon={icon} />}
        right={() => (
          <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={value ? '#1976d2' : '#f4f3f4'}
          />
        )}
      />
      <Divider />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* 用户信息卡片 */}
      <Card style={styles.profileCard}>
        <Card.Content>
          <View style={styles.profileHeader}>
            <Avatar.Text size={80} label={userProfile.avatar} />
            <View style={styles.profileInfo}>
              <Title style={styles.profileName}>{userProfile.name}</Title>
              <Paragraph style={styles.profileEmail}>{userProfile.email}</Paragraph>
              <Paragraph style={styles.profilePhone}>{userProfile.phone}</Paragraph>
            </View>
          </View>
          <Button
            mode="outlined"
            icon="pencil"
            onPress={() => {
              setEditedProfile({ ...userProfile });
              setShowProfileDialog(true);
            }}
            style={styles.editButton}
          >
            编辑资料
          </Button>
        </Card.Content>
      </Card>

      {/* 账户设置 */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>账户设置</Title>
          <SettingItem
            icon="lock"
            title="修改密码"
            subtitle="定期更改密码以确保账户安全"
            onPress={() => setShowPasswordDialog(true)}
          />
          <SettingItem
            icon="bell"
            title="通知设置"
            subtitle="管理应用通知"
            onPress={() => Alert.alert('通知设置', '跳转到通知设置页面')}
          />
          <SettingItem
            icon="shield-account"
            title="隐私设置"
            subtitle="管理您的隐私选项"
            onPress={() => Alert.alert('隐私设置', '跳转到隐私设置页面')}
          />
        </Card.Content>
      </Card>

      {/* 应用设置 */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>应用设置</Title>
          <SwitchSetting
            icon="theme-light-dark"
            title="深色模式"
            subtitle="切换应用主题"
            value={settings.darkMode}
            onValueChange={() => handleSettingToggle('darkMode')}
          />
          <SwitchSetting
            icon="sync"
            title="自动同步"
            subtitle="自动同步数据到云端"
            value={settings.autoSync}
            onValueChange={() => handleSettingToggle('autoSync')}
          />
          <SwitchSetting
            icon="cellphone"
            title="数据节省模式"
            subtitle="减少数据使用量"
            value={settings.dataSaving}
            onValueChange={() => handleSettingToggle('dataSaving')}
          />
          <SwitchSetting
            icon="fingerprint"
            title="生物识别登录"
            subtitle="使用指纹或面容ID登录"
            value={settings.biometricLogin}
            onValueChange={() => handleSettingToggle('biometricLogin')}
          />
          <SettingItem
            icon="translate"
            title="语言"
            subtitle={settings.language === 'zh-CN' ? '简体中文' : 'English'}
            onPress={() => setShowLanguageDialog(true)}
          />
        </Card.Content>
      </Card>

      {/* 存储与数据 */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>存储与数据</Title>
          <SettingItem
            icon="database"
            title="存储使用情况"
            subtitle="已使用 256MB / 2GB"
            onPress={() => Alert.alert('存储详情', '显示存储使用详情')}
          />
          <SettingItem
            icon="delete"
            title="清除缓存"
            subtitle="释放存储空间"
            onPress={handleClearCache}
          />
          <SettingItem
            icon="download"
            title="数据备份"
            subtitle="上次备份：今天 09:30"
            onPress={() => Alert.alert('数据备份', '开始数据备份')}
          />
        </Card.Content>
      </Card>

      {/* 关于与支持 */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>关于与支持</Title>
          <SettingItem
            icon="information"
            title="关于应用"
            subtitle="版本 1.0.0 (Build 20260311)"
            onPress={() => setShowAboutDialog(true)}
          />
          <SettingItem
            icon="help-circle"
            title="帮助中心"
            subtitle="查看常见问题和使用指南"
            onPress={() => Alert.alert('帮助中心', '跳转到帮助中心')}
          />
          <SettingItem
            icon="email"
            title="反馈与建议"
            subtitle="向我们发送反馈"
            onPress={() => Alert.alert('反馈', '打开反馈表单')}
          />
          <SettingItem
            icon="star"
            title="评价应用"
            subtitle="在应用商店给我们评分"
            onPress={() => Alert.alert('评价', '跳转到应用商店')}
          />
        </Card.Content>
      </Card>

      {/* 退出登录按钮 */}
      <Button
        mode="contained"
        icon="logout"
        onPress={handleLogout}
        style={styles.logoutButton}
        textColor="white"
      >
        退出登录
      </Button>

      {/* 版本信息 */}
      <Text style={styles.versionText}>MyMobileApp v1.0.0</Text>

      {/* 编辑资料对话框 */}
      <Portal>
        <Dialog visible={showProfileDialog} onDismiss={() => setShowProfileDialog(false)}>
          <Dialog.Title>编辑个人资料</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="姓名"
              value={editedProfile.name}
              onChangeText={(text) => setEditedProfile({...editedProfile, name: text})}
              style={styles.dialogInput}
            />
            <TextInput
              label="邮箱"
              value={editedProfile.email}
              onChangeText={(text) => setEditedProfile({...editedProfile, email: text})}
              keyboardType="email-address"
              style={styles.dialogInput}
            />
            <TextInput
              label="手机号"
              value={editedProfile.phone}
              onChangeText={(text) => setEditedProfile({...editedProfile, phone: text})}
              keyboardType="phone-pad"
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowProfileDialog(false)}>取消</Button>
            <Button onPress={handleSaveProfile}>保存</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* 修改密码对话框 */}
      <Portal>
        <Dialog visible={showPasswordDialog} onDismiss={() => setShowPasswordDialog(false)}>
          <Dialog.Title>修改密码</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="当前密码"
              value={password.current}
              onChangeText={(text) => setPassword({...password, current: text})}
              secureTextEntry
              style={styles.dialogInput}
            />
            <TextInput
              label="新密码"
              value={password.new}
              onChangeText={(text) => setPassword({...password, new: text})}
              secureTextEntry
              style={styles.dialogInput}
            />
            <TextInput
              label="确认新密码"
              value={password.confirm}
              onChangeText={(text) => setPassword({...password, confirm: text})}
              secureTextEntry
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowPasswordDialog(false)}>取消</Button>
            <Button onPress={handleChangePassword}>确认</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* 语言选择对话框 */}
      <Portal>
        <Dialog visible={showLanguageDialog} onDismiss={() => setShowLanguageDialog(false)}>
          <Dialog.Title>选择语言</Dialog.Title>
          <Dialog.Content>
            <TouchableOpacity
              style={[
                styles.languageOption,
                settings.language === 'zh-CN' && styles.selectedLanguage,
              ]}
              onPress={() => handleLanguageSelect('zh-CN')}
            >
              <Text style={styles.languageText}>简体中文</Text>
              {settings.language === 'zh-CN' && (
                <Icon name="check" size={20} color="#1976d2" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.languageOption,
                settings.language === 'en' && styles.selectedLanguage,
              ]}
              onPress={() => handleLanguageSelect('en')}
            >
              <Text style={styles.languageText}>English</Text>
              {settings.language === 'en' && (
                <Icon name="check" size={20} color="#1976d2" />
              )}
            </TouchableOpacity>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowLanguageDialog(false)}>关闭</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* 关于对话框 */}
      <Portal>
        <Dialog visible={showAboutDialog} onDismiss={() => setShowAboutDialog(false)}>
          <Dialog.Title>关于 MyMobileApp</Dialog.Title>
          <Dialog.Content>
            <View style={styles.aboutContent}>
              <Avatar.Icon size={64} icon="cellphone" style={styles.appIcon} />
              <Text style={styles.appName}>MyMobileApp</Text>
              <Text style={styles.appVersion}>版本 1.0.0 (Build 20260311)</Text>
              <Text style={styles.appDescription}>
                这是一个跨平台移动应用，支持iOS和Android平台。
                提供项目管理、团队协作、任务跟踪等功能。
              </Text>
              <Text style={styles.copyright}>
                © 2026 MyMobileApp Team. 保留所有权利。
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowAboutDialog(false)}>关闭</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    marginTop: 8,
  },
  sectionCard: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  logoutButton: {
    margin: 16,
    marginTop: 8,
    backgroundColor: '#f44336',
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  dialogInput: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  selectedLanguage: {
    backgroundColor: '#e3f2fd',
  },
  languageText: {
    fontSize: 16,
  },
  aboutContent: {
    alignItems: 'center',
  },
  appIcon: {
    marginBottom: 16,
    backgroundColor: '#1976d2',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  appDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  copyright: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default SettingsScreen;