const act=require('../common/permissions')

// useractions.savetoDB({
//   uid:"001",
//   username:"admin",
//   userpass:"123456",
//   userdesc:"超级管理员",
//   usergroup:"admins"
// }).then((t)=>{
//   console.log(t)
// })
// group.savetoDB({
//   gid:'001',
//   gname:'admins',
//   access:[{
//     page:'main',
//     read:true,
//     write:true,
//     update:true,
//     delete:true
//   }]
// })
// function guid() {
//   return 'xxxxxxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, function(c) {
//       var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
//       return v.toString(16);
//   });
// }
// let Sysemid=guid()
// act.savetoDB({
//   username:'admin',
//   guid:Sysemid,
//   time:new Date().getTime()
// }).then(t=>{
//   console.log(t)
// })
act.savetoDB({
  sid: 1,
  groupname: 'Operator',
  access: [
    {
      page: 'homePage',
      read: true,
      write: false
    },
    {
      page: 'log',
      read: true,
      write: false,
      update: false,
      delete: false
    },
    {
      page: 'manage',
      read: true,
      write: false,
      update: false,
      delete: false
    },
    {
      page: 'process',
      read: true,
      write: false,
      update: false,
      delete: false
    },
    {
      page: 'newProcess',
      read: true,
      write: false,
      update: false,
      delete: false
    },
    {
      page: 'doProcess',
      read: true,
      write: false,
      update: false,
      delete: false
    },
    {
      page: 'konwledge',
      read: true,
      write: false,
      update: false,
      delete: false
    },
    {
      page: 'konwledgeList',
      read: true,
      write: false,
      update: false,
      delete: false
    },
    {
      page: 'OaCoop',
      read: true,
      write: false,
      update: false,
      delete: false
    },
    {
      page: 'chatroom',
      read: true,
      write: false,
      update: false,
      delete: false
    },
    {
      page: 'calenDar',
      read: false,
      write: false,
      update: false,
      delete: false
    }
  ]
})