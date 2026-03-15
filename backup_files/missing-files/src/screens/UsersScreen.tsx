import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  Avatar, 
  Searchbar, 
  FAB, 
  Chip,
  Dialog,
  Portal,
  TextInput,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const UsersScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '项目经理', avatar: 'ZS', status: 'active' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: 'UI设计师', avatar: 'LS', status: 'active' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '前端开发', avatar: 'WW', status: 'active' },
    { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '后端开发', avatar: 'ZL', status: 'active' },
    { id: 5, name: '钱七', email: 'qianqi@example.com', role: '测试工程师', avatar: 'QQ', status: 'inactive' },
    { id: 6, name: '孙八', email: 'sunba@example.com', role: '产品经理', avatar: 'SB', status: 'active' },
    { id: 7, name: '周九', email: 'zhoujiu@example.com', role: '运维工程师', avatar: 'ZJ', status: 'active' },
    { id: 8, name: '吴十', email: 'wushi@example.com', role: '数据分析师', avatar: 'WS', status: 'inactive' },
  ]);
  const [filter, setFilter] = useState('all'); // all, active, inactive
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '开发工程师',
  });

  const filteredUsers = users.filter(user => {
    // 应用状态过滤器
    if (filter !== 'all' && user.status !== filter) {
      return false;
    }
    
    // 应用搜索过滤器
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const getStatusColor = (status) => {
    return status === 'active' ? '#4caf50' : '#f44336';
  };

  const getStatusText = (status) => {
    return status === 'active' ? '在线' : '离线';
  };

  const getRoleColor = (role) => {
    const roleColors = {
      '项目经理': '#1976d2',
      '产品经理': '#9c27b0',
      'UI设计师': '#ff9800',
      '前端开发': '#4caf50',
      '后端开发': '#2196f3',
      '测试工程师': '#ff5722',
      '运维工程师': '#607d8b',
      '数据分析师': '#009688',
      '开发工程师': '#3f51b5',
    };
    return roleColors[role] || '#9e9e9e';
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      Alert.alert('错误', '请填写姓名和邮箱');
      return;
    }

    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUserObj = {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.name.substring(0, 2).toUpperCase(),
      status: 'active',
    };

    setUsers([...users, newUserObj]);
    setNewUser({ name: '', email: '', role: '开发工程师' });
    setShowAddDialog(false);
    Alert.alert('成功', '用户添加成功');
  };

  const handleDeleteUser = (user) => {
    Alert.alert(
      '删除用户',
      `确定要删除用户 "${user.name}" 吗？`,
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '删除', 
          style: 'destructive',
          onPress: () => {
            setUsers(users.filter(u => u.id !== user.id));
            Alert.alert('成功', `用户 "${user.name}" 已删除`);
          }
        },
      ]
    );
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, status: newStatus } : u
    ));
    
    Alert.alert(
      '成功',
      `用户 "${user.name}" 状态已更新为 ${newStatus === 'active' ? '在线' : '离线'}`
    );
  };

  const renderUserItem = ({ item }) => (
    <Card style={styles.userCard}>
      <Card.Content>
        <View style={styles.userHeader}>
          <View style={styles.userInfo}>
            <Avatar.Text size={50} label={item.avatar} />
            <View style={styles.userDetails}>
              <Title style={styles.userName}>{item.name}</Title>
              <Paragraph style={styles.userEmail}>{item.email}</Paragraph>
              <View style={styles.userMeta}>
                <Chip
                  style={[styles.roleChip, { backgroundColor: getRoleColor(item.role) }]}
                  textStyle={{ color: 'white', fontSize: 12 }}
                >
                  {item.role}
                </Chip>
                <Chip
                  style={[styles.statusChip, { borderColor: getStatusColor(item.status) }]}
                  textStyle={{ color: getStatusColor(item.status), fontSize: 12 }}
                  mode="outlined"
                >
                  {getStatusText(item.status)}
                </Chip>
              </View>
            </View>
          </View>
          
          <View style={styles.userActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleToggleStatus(item)}
            >
              <Icon 
                name={item.status === 'active' ? 'account-off' : 'account-check'} 
                size={20} 
                color={item.status === 'active' ? '#f44336' : '#4caf50'} 
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => Alert.alert('编辑', `编辑用户 ${item.name}`)}
            >
              <Icon name="pencil" size={20} color="#1976d2" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDeleteUser(item)}
            >
              <Icon name="delete" size={20} color="#f44336" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.userStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>项目</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>任务</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>完成率</Text>
          </View>
        </View>

        <Button
          mode="outlined"
          icon="message-text"
          onPress={() => Alert.alert('消息', `发送消息给 ${item.name}`)}
          style={styles.messageButton}
        >
          发送消息
        </Button>
      </Card.Content>
    </Card>
  );

  const roleOptions = [
    '项目经理',
    '产品经理',
    'UI设计师',
    '前端开发',
    '后端开发',
    '测试工程师',
    '运维工程师',
    '数据分析师',
    '开发工程师',
  ];

  return (
    <View style={styles.container}>
      {/* 搜索栏 */}
      <Searchbar
        placeholder="搜索用户..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      {/* 过滤器 */}
      <View style={styles.filterContainer}>
        <Chip
          selected={filter === 'all'}
          onPress={() => setFilter('all')}
          style={styles.filterChip}
        >
          全部
        </Chip>
        <Chip
          selected={filter === 'active'}
          onPress={() => setFilter('active')}
          style={styles.filterChip}
        >
          在线
        </Chip>
        <Chip
          selected={filter === 'inactive'}
          onPress={() => setFilter('inactive')}
          style={styles.filterChip}
        >
          离线
        </Chip>
      </View>

      {/* 用户统计 */}
      <Card style={styles.statsCard}>
        <Card.Content>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{users.length}</Text>
              <Text style={styles.statLabel}>总用户</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {users.filter(u => u.status === 'active').length}
              </Text>
              <Text style={styles.statLabel}>在线</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {users.filter(u => u.status === 'inactive').length}
              </Text>
              <Text style={styles.statLabel}>离线</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {new Set(users.map(u => u.role)).size}
              </Text>
              <Text style={styles.statLabel}>角色</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* 用户列表 */}
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="account-search" size={64} color="#ccc" />
            <Text style={styles.emptyText}>未找到用户</Text>
            <Text style={styles.emptySubtext}>尝试修改搜索条件或添加新用户</Text>
          </View>
        }
      />

      {/* 添加用户按钮 */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowAddDialog(true)}
        label="添加用户"
      />

      {/* 添加用户对话框 */}
      <Portal>
        <Dialog visible={showAddDialog} onDismiss={() => setShowAddDialog(false)}>
          <Dialog.Title>添加新用户</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="姓名"
              value={newUser.name}
              onChangeText={(text) => setNewUser({...newUser, name: text})}
              style={styles.dialogInput}
            />
            <TextInput
              label="邮箱"
              value={newUser.email}
              onChangeText={(text) => setNewUser({...newUser, email: text})}
              keyboardType="email-address"
              style={styles.dialogInput}
            />
            <TextInput
              label="角色"
              value={newUser.role}
              onChangeText={(text) => setNewUser({...newUser, role: text})}
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowAddDialog(false)}>取消</Button>
            <Button onPress={handleAddUser}>添加</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    margin: 16,
    marginBottom: 8,
    elevation: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  filterChip: {
    marginRight: 8,
  },
  statsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e0e0e0',
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  userCard: {
    marginBottom: 16,
    elevation: 2,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  userMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roleChip: {
    marginRight: 8,
  },
  statusChip: {
    marginRight: 8,
  },
  userActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  messageButton: {
    marginTop: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1976d2',
  },
  dialogInput: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
});

export default UsersScreen;