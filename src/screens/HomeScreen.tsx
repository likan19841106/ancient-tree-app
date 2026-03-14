import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Card, Title, Paragraph, Button, Avatar, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import apiService from '../services/api';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalUsers: 0,
    completionRate: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);

  const loadData = async () => {
    try {
      // 模拟API调用
      setStats({
        totalProjects: 12,
        activeProjects: 8,
        totalUsers: 24,
        completionRate: 65,
      });

      setRecentProjects([
        { id: 1, name: '移动应用开发', status: '进行中', progress: 75 },
        { id: 2, name: 'UI设计更新', status: '待审核', progress: 100 },
        { id: 3, name: '后端API优化', status: '进行中', progress: 40 },
        { id: 4, name: '测试用例编写', status: '待开始', progress: 0 },
      ]);
    } catch (error) {
      Alert.alert('错误', '加载数据失败');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const QuickAction = ({ icon, title, onPress, color = '#1976d2' }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: color }]}>
        <Icon name={icon} size={24} color="white" />
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* 欢迎标题 */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>早上好，李侃</Text>
          <Text style={styles.subtitle}>今天是2026年3月11日</Text>
        </View>
        <Avatar.Text size={50} label="LK" />
      </View>

      {/* 统计卡片 */}
      <Card style={styles.statsCard}>
        <Card.Content>
          <Title>项目概览</Title>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalProjects}</Text>
              <Text style={styles.statLabel}>总项目数</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.activeProjects}</Text>
              <Text style={styles.statLabel}>进行中</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalUsers}</Text>
              <Text style={styles.statLabel}>团队成员</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.completionRate}%</Text>
              <Text style={styles.statLabel}>完成率</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* 快速操作 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>快速操作</Text>
        <View style={styles.quickActions}>
          <QuickAction
            icon="plus"
            title="新建项目"
            onPress={() => navigation.navigate('项目', { screen: 'ProjectsList' })}
          />
          <QuickAction
            icon="account-plus"
            title="添加成员"
            onPress={() => navigation.navigate('用户')}
            color="#4caf50"
          />
          <QuickAction
            icon="chart-line"
            title="查看报表"
            onPress={() => Alert.alert('功能开发中')}
            color="#ff9800"
          />
          <QuickAction
            icon="bell"
            title="通知"
            onPress={() => Alert.alert('功能开发中')}
            color="#f44336"
          />
        </View>
      </View>

      {/* 最近项目 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>最近项目</Text>
          <Button mode="text" onPress={() => navigation.navigate('项目')}>
            查看全部
          </Button>
        </View>
        
        {recentProjects.map((project) => (
          <Card key={project.id} style={styles.projectCard}>
            <Card.Content>
              <View style={styles.projectHeader}>
                <View>
                  <Title>{project.name}</Title>
                  <Paragraph>状态: {project.status}</Paragraph>
                </View>
                <Icon 
                  name={project.status === '进行中' ? 'progress-clock' : 
                        project.status === '待审核' ? 'check-circle' : 'clock-outline'} 
                  size={24} 
                  color={project.status === '进行中' ? '#1976d2' : 
                         project.status === '待审核' ? '#4caf50' : '#9e9e9e'} 
                />
              </View>
              <View style={styles.progressContainer}>
                <ProgressBar 
                  progress={project.progress / 100} 
                  color={project.progress === 100 ? '#4caf50' : '#1976d2'}
                  style={styles.progressBar}
                />
                <Text style={styles.progressText}>{project.progress}%</Text>
              </View>
              <Button 
                mode="outlined" 
                onPress={() => navigation.navigate('项目', { 
                  screen: 'ProjectDetail', 
                  params: { projectId: project.id }
                })}
                style={styles.detailButton}
              >
                查看详情
              </Button>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* 系统状态 */}
      <Card style={styles.systemCard}>
        <Card.Content>
          <View style={styles.systemStatus}>
            <Icon name="check-circle" size={24} color="#4caf50" />
            <View style={styles.systemInfo}>
              <Text style={styles.systemTitle}>系统运行正常</Text>
              <Text style={styles.systemSubtitle}>所有服务均可正常访问</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statsCard: {
    margin: 16,
    elevation: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
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
    height: 40,
    backgroundColor: '#e0e0e0',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  quickAction: {
    alignItems: 'center',
    width: '23%',
    marginBottom: 12,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  projectCard: {
    marginBottom: 12,
    elevation: 2,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    minWidth: 40,
  },
  detailButton: {
    marginTop: 8,
  },
  systemCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  systemStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  systemInfo: {
    marginLeft: 12,
  },
  systemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  systemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default HomeScreen;