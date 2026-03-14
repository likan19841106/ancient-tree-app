import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, FAB, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ProjectsScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all'); // all, active, completed, pending

  const projectData = [
    { id: 1, name: '移动应用开发', status: 'active', progress: 75, dueDate: '2026-03-20', members: 5 },
    { id: 2, name: 'UI设计更新', status: 'completed', progress: 100, dueDate: '2026-03-10', members: 3 },
    { id: 3, name: '后端API优化', status: 'active', progress: 40, dueDate: '2026-03-25', members: 4 },
    { id: 4, name: '测试用例编写', status: 'pending', progress: 0, dueDate: '2026-03-15', members: 2 },
    { id: 5, name: '数据库迁移', status: 'active', progress: 60, dueDate: '2026-03-30', members: 3 },
    { id: 6, name: '性能优化', status: 'active', progress: 30, dueDate: '2026-04-05', members: 4 },
    { id: 7, name: '文档编写', status: 'completed', progress: 100, dueDate: '2026-03-05', members: 2 },
    { id: 8, name: '安全审计', status: 'pending', progress: 0, dueDate: '2026-04-10', members: 3 },
  ];

  useEffect(() => {
    loadProjects();
  }, [filter, searchQuery]);

  const loadProjects = () => {
    let filtered = projectData;

    // 应用状态过滤器
    if (filter !== 'all') {
      filtered = filtered.filter(project => project.status === filter);
    }

    // 应用搜索过滤器
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setProjects(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟网络请求
    loadProjects();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#1976d2';
      case 'completed': return '#4caf50';
      case 'pending': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return '进行中';
      case 'completed': return '已完成';
      case 'pending': return '待开始';
      default: return '未知';
    }
  };

  const renderProjectItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProjectDetail', { projectId: item.id })}
    >
      <Card style={styles.projectCard}>
        <Card.Content>
          <View style={styles.projectHeader}>
            <View style={styles.projectInfo}>
              <Title style={styles.projectTitle}>{item.name}</Title>
              <View style={styles.projectMeta}>
                <Chip
                  mode="outlined"
                  style={[styles.statusChip, { borderColor: getStatusColor(item.status) }]}
                  textStyle={{ color: getStatusColor(item.status) }}
                >
                  {getStatusText(item.status)}
                </Chip>
                <View style={styles.metaItem}>
                  <Icon name="calendar" size={14} color="#666" />
                  <Text style={styles.metaText}>{item.dueDate}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Icon name="account-group" size={14} color="#666" />
                  <Text style={styles.metaText}>{item.members}人</Text>
                </View>
              </View>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressText}>{item.progress}%</Text>
            </View>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${item.progress}%`,
                    backgroundColor: getStatusColor(item.status)
                  }
                ]} 
              />
            </View>
          </View>

          <View style={styles.projectActions}>
            <Button
              mode="text"
              icon="eye"
              onPress={() => navigation.navigate('ProjectDetail', { projectId: item.id })}
            >
              查看
            </Button>
            <Button
              mode="text"
              icon="pencil"
              onPress={() => Alert.alert('编辑项目', `编辑 ${item.name}`)}
            >
              编辑
            </Button>
            <Button
              mode="text"
              icon="delete"
              textColor="#f44336"
              onPress={() => showDeleteConfirmation(item)}
            >
              删除
            </Button>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const showDeleteConfirmation = (project) => {
    Alert.alert(
      '删除项目',
      `确定要删除项目 "${project.name}" 吗？`,
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '删除', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('成功', `项目 "${project.name}" 已删除`);
          }
        },
      ]
    );
  };

  const handleCreateProject = () => {
    navigation.navigate('ProjectDetail', { projectId: 'new' });
  };

  return (
    <View style={styles.container}>
      {/* 搜索栏 */}
      <Searchbar
        placeholder="搜索项目..."
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
          进行中
        </Chip>
        <Chip
          selected={filter === 'completed'}
          onPress={() => setFilter('completed')}
          style={styles.filterChip}
        >
          已完成
        </Chip>
        <Chip
          selected={filter === 'pending'}
          onPress={() => setFilter('pending')}
          style={styles.filterChip}
        >
          待开始
        </Chip>
      </View>

      {/* 项目列表 */}
      <FlatList
        data={projects}
        renderItem={renderProjectItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="folder-open" size={64} color="#ccc" />
            <Text style={styles.emptyText}>暂无项目</Text>
            <Text style={styles.emptySubtext}>点击下方按钮创建新项目</Text>
          </View>
        }
      />

      {/* 创建项目按钮 */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleCreateProject}
        label="新建项目"
      />
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
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  projectCard: {
    marginBottom: 16,
    elevation: 2,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  projectInfo: {
    flex: 1,
    marginRight: 12,
  },
  projectTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  projectMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  statusChip: {
    marginRight: 8,
    marginBottom: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  progressCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  projectActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

export default ProjectsScreen;