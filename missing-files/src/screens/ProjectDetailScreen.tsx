import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  Chip, 
  ProgressBar, 
  Divider,
  TextInput,
  List,
  Avatar,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProjectDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { projectId } = route.params || {};

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState({});

  // 模拟项目数据
  const projectData = {
    1: {
      id: 1,
      name: '移动应用开发',
      description: '开发跨平台移动应用，支持iOS和Android平台',
      status: 'active',
      progress: 75,
      startDate: '2026-03-01',
      dueDate: '2026-03-20',
      priority: 'high',
      budget: 50000,
      manager: '张三',
    },
    2: {
      id: 2,
      name: 'UI设计更新',
      description: '更新应用界面设计，提升用户体验',
      status: 'completed',
      progress: 100,
      startDate: '2026-02-15',
      dueDate: '2026-03-10',
      priority: 'medium',
      budget: 20000,
      manager: '李四',
    },
  };

  // 模拟任务数据
  const taskData = {
    1: [
      { id: 1, title: '需求分析', status: 'completed', assignee: '张三', dueDate: '2026-03-05' },
      { id: 2, title: 'UI设计', status: 'completed', assignee: '李四', dueDate: '2026-03-10' },
      { id: 3, title: '前端开发', status: 'in-progress', assignee: '王五', dueDate: '2026-03-15' },
      { id: 4, title: '后端开发', status: 'in-progress', assignee: '赵六', dueDate: '2026-03-18' },
      { id: 5, title: '测试', status: 'pending', assignee: '钱七', dueDate: '2026-03-19' },
    ],
    2: [
      { id: 1, title: '设计调研', status: 'completed', assignee: '李四', dueDate: '2026-02-20' },
      { id: 2, title: '原型设计', status: 'completed', assignee: '李四', dueDate: '2026-02-25' },
      { id: 3, title: '界面设计', status: 'completed', assignee: '李四', dueDate: '2026-03-05' },
      { id: 4, title: '设计评审', status: 'completed', assignee: '张三', dueDate: '2026-03-08' },
    ],
  };

  // 模拟团队成员数据
  const memberData = {
    1: [
      { id: 1, name: '张三', role: '项目经理', avatar: 'ZS' },
      { id: 2, name: '李四', role: 'UI设计师', avatar: 'LS' },
      { id: 3, name: '王五', role: '前端开发', avatar: 'WW' },
      { id: 4, name: '赵六', role: '后端开发', avatar: 'ZL' },
      { id: 5, name: '钱七', role: '测试工程师', avatar: 'QQ' },
    ],
    2: [
      { id: 1, name: '张三', role: '项目经理', avatar: 'ZS' },
      { id: 2, name: '李四', role: 'UI设计师', avatar: 'LS' },
    ],
  };

  useEffect(() => {
    if (projectId === 'new') {
      // 新建项目
      setProject({
        id: 'new',
        name: '',
        description: '',
        status: 'pending',
        progress: 0,
        startDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        priority: 'medium',
        budget: 0,
        manager: '',
      });
      setIsEditing(true);
      setTasks([]);
      setTeamMembers([]);
    } else if (projectId) {
      // 加载现有项目
      const foundProject = projectData[projectId];
      if (foundProject) {
        setProject(foundProject);
        setEditedProject({ ...foundProject });
        setTasks(taskData[projectId] || []);
        setTeamMembers(memberData[projectId] || []);
      }
    }
  }, [projectId]);

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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '未知';
    }
  };

  const getTaskStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'check-circle';
      case 'in-progress': return 'progress-clock';
      case 'pending': return 'clock-outline';
      default: return 'help-circle';
    }
  };

  const getTaskStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'in-progress': return '#1976d2';
      case 'pending': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  const handleSave = () => {
    if (projectId === 'new') {
      Alert.alert('成功', '项目创建成功');
      navigation.goBack();
    } else {
      Alert.alert('成功', '项目更新成功');
      setIsEditing(false);
      setProject(editedProject);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      '删除项目',
      '确定要删除这个项目吗？此操作不可撤销。',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '删除', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('成功', '项目已删除');
            navigation.goBack();
          }
        },
      ]
    );
  };

  if (!project) {
    return (
      <View style={styles.loadingContainer}>
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 项目标题和操作 */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.headerActions}>
            <Button
              mode="text"
              icon="arrow-left"
              onPress={() => navigation.goBack()}
            >
              返回
            </Button>
            <View style={styles.headerRightActions}>
              {!isEditing && projectId !== 'new' && (
                <>
                  <Button
                    mode="text"
                    icon="pencil"
                    onPress={() => setIsEditing(true)}
                  >
                    编辑
                  </Button>
                  <Button
                    mode="text"
                    icon="delete"
                    textColor="#f44336"
                    onPress={handleDelete}
                  >
                    删除
                  </Button>
                </>
              )}
            </View>
          </View>

          {isEditing ? (
            <View style={styles.editForm}>
              <TextInput
                label="项目名称"
                value={editedProject.name}
                onChangeText={(text) => setEditedProject({...editedProject, name: text})}
                style={styles.input}
              />
              <TextInput
                label="项目描述"
                value={editedProject.description}
                onChangeText={(text) => setEditedProject({...editedProject, description: text})}
                multiline
                numberOfLines={3}
                style={styles.input}
              />
              <TextInput
                label="截止日期"
                value={editedProject.dueDate}
                onChangeText={(text) => setEditedProject({...editedProject, dueDate: text})}
                style={styles.input}
              />
              <TextInput
                label="预算"
                value={editedProject.budget.toString()}
                onChangeText={(text) => setEditedProject({...editedProject, budget: parseInt(text) || 0})}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                label="负责人"
                value={editedProject.manager}
                onChangeText={(text) => setEditedProject({...editedProject, manager: text})}
                style={styles.input}
              />
              
              <View style={styles.editButtons}>
                <Button
                  mode="outlined"
                  onPress={() => {
                    if (projectId === 'new') {
                      navigation.goBack();
                    } else {
                      setIsEditing(false);
                      setEditedProject({ ...project });
                    }
                  }}
                  style={styles.cancelButton}
                >
                  取消
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSave}
                  style={styles.saveButton}
                >
                  保存
                </Button>
              </View>
            </View>
          ) : (
            <>
              <Title style={styles.projectName}>{project.name}</Title>
              <Paragraph style={styles.projectDescription}>
                {project.description}
              </Paragraph>
              
              <View style={styles.projectMeta}>
                <Chip
                  style={[styles.statusChip, { backgroundColor: getStatusColor(project.status) }]}
                  textStyle={{ color: 'white' }}
                >
                  {getStatusText(project.status)}
                </Chip>
                <Chip
                  style={[styles.priorityChip, { borderColor: getPriorityColor(project.priority) }]}
                  textStyle={{ color: getPriorityColor(project.priority) }}
                  mode="outlined"
                >
                  优先级: {getPriorityText(project.priority)}
                </Chip>
              </View>
            </>
          )}
        </Card.Content>
      </Card>

      {/* 项目进度 */}
      {!isEditing && (
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title>项目进度</Title>
            <View style={styles.progressSection}>
              <Text style={styles.progressText}>{project.progress}%</Text>
              <ProgressBar 
                progress={project.progress / 100} 
                color={getStatusColor(project.status)}
                style={styles.progressBar}
              />
            </View>
            
            <View style={styles.dates}>
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>开始日期</Text>
                <Text style={styles.dateValue}>{project.startDate}</Text>
              </View>
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>截止日期</Text>
                <Text style={styles.dateValue}>{project.dueDate}</Text>
              </View>
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>预算</Text>
                <Text style={styles.dateValue}>¥{project.budget.toLocaleString()}</Text>
              </View>
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>负责人</Text>
                <Text style={styles.dateValue}>{project.manager}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* 任务列表 */}
      {!isEditing && tasks.length > 0 && (
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Title>任务列表</Title>
              <Button mode="text" icon="plus">添加任务</Button>
            </View>
            
            {tasks.map((task, index) => (
              <React.Fragment key={task.id}>
                <TouchableOpacity style={styles.taskItem}>
                  <Icon 
                    name={getTaskStatusIcon(task.status)} 
                    size={24} 
                    color={getTaskStatusColor(task.status)} 
                  />
                  <View style={styles.taskInfo}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <View style={styles.taskMeta}>
                      <Text style={styles.taskAssignee}>{task.assignee}</Text>
                      <Text style={styles.taskDueDate}>{task.dueDate}</Text>
                    </View>
                  </View>
                  <Icon name="chevron-right" size={24} color="#ccc" />
                </TouchableOpacity>
                {index < tasks.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* 团队成员 */}
      {!isEditing && teamMembers.length > 0 && (
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Title>团队成员</Title>
              <Button mode="text" icon="account-plus">添加成员</Button>
            </View>
            
            <View style={styles.teamGrid}>
              {teamMembers.map(member => (
                <View key={member.id} style={styles.teamMember}>
                  <Avatar.Text size={50} label={member.avatar} />
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>
      )}

      {/* 项目统计 */}
      {!isEditing && (
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title>项目统计</Title>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{tasks.length}</Text>
                <Text style={styles.statLabel}>总任务数</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {tasks.filter(t => t.status === 'completed').length}
                </Text>
                <Text style={styles.statLabel}>已完成</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{teamMembers.length}</Text>
                <Text style={styles.statLabel}>团队成员</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{project.progress}%</Text>
                <Text style={styles.statLabel}>完成率</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerRightActions: {
    flexDirection: 'row',
  },
  editForm: {
    marginTop: 8,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#1976d2',
  },
  projectName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  projectMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusChip: {
    marginRight: 8,
  },
  priorityChip: {
    marginRight: 8,
  },
  sectionCard: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
  },
  progressSection: {
    marginVertical: 16,
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  dates: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 16,
  },
  dateItem: {
    minWidth: '45%',
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  taskInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  taskMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskAssignee: {
    fontSize: 14,
    color: '#666',
  },
  taskDueDate: {
    fontSize: 14,
    color: '#666',
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  teamMember: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 16,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 2,
  },
  memberRole: {
    fontSize: 12,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
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
});

export default ProjectDetailScreen;
