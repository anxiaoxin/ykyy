// 用户信息缓存
// 
// 属性字段
const state = {
    editStudent: {},
    students: [],
  }
  
  // 等同于计算属性，该对象定义的属性是通过state
  // 中的字段计算而来，可以在组件中定义为计算属性
  const getters = {
    studentNamesList: state => {
      let nameList = [];
      state.students.forEach(student => {
        nameList.push({
          text: student.studentName,
          value: student.studentId
        })
      })
      return nameList;
    }
  }
  
  // 定义事件，state中字段的改变必须通过mutations中的方法改变
  // 该对象中的方法可以有参数：
  // 第一个参数固定为state对象，第二个是触发时传入的参数
  // 使用store.commit(方法名,参数)
  const mutations = {
    setEditStudent(state, data){
        state.editStudent = data;
    },
    setStudentsCache(state, data){
      state.students = data;
    },
    updateStudentInfo(state, data) {
      for(let info of state.students){
        if(info.studentId == data.studentId) {
          info = data;
        }
      }
    }
  }
  
  // mutaions只能进行同步操作
  // actions中定义的方法可以进行异步发作，在异步方法内进行commit操作
  const actions = {}
  
  export default {
    state,
    getters,
    mutations,
    actions
  }