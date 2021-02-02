import {
    DashboardOutlined,
    ClusterOutlined,
    ScheduleOutlined,
    DeploymentUnitOutlined,
    SettingOutlined,
    TeamOutlined
  } from "@ant-design/icons-vue";

const menus = [
{
    name: "dashboard",
    path: "/dashboard",
    title: "主页",
    icon: DashboardOutlined,
},
{
    name: "cluster",
    path: "/cluster",
    title: "资产管理",
    icon: ClusterOutlined,
},
{
    name: "schedule",
    path: "/schedule",
    title: "任务管理",
    icon: ScheduleOutlined,
},
{
    name: "deployment",
    path: "/deployment",
    title: "安装部署",
    icon: DeploymentUnitOutlined,
},
{
    name: "setting",
    path: "/setting",
    title: "环境变量",
    icon: SettingOutlined,
    children:[
        {
            title: "访问凭证",
            name: "credentials",
            path: "/setting/credentials",
        }
    ] 
},
{
    name: "team",
    path: "/team",
    title: "成员管理",
    icon: TeamOutlined,
    children:[
        {
            title: "信息管理",
            name: "information",
            path: "/team/information",
            children: [
                {
                    title: "信息变更",
                    name: "update",
                    path: "/team/information/update",
                },
                {
                    title: "权限管理",
                    name: "privilege",
                    path: "/team/information/privilege",
                }
            ]
        }
    ] 
}
]
export default menus;