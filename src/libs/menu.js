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
    children: [
        {
            name: "cluster-linux",
            title: "linux PC",
            path: "/cluster/linux",
        },
        {
            name: "cluster-firewall",
            title: "防火墙",
            path: "/cluster/firewall",
        },
        {
            name: "cluster-router",
            title: "路由器",
            path: "/cluster/router",
        },
        {
            name: "cluster-switch",
            title: "交换机",
            path: "/cluster/switch",
        }
    ]
},
{
    name: "workflow",
    path: "/workflow",
    title: "任务剧本",
    icon: DeploymentUnitOutlined,
},
{
    name: "schedule",
    path: "/schedule",
    title: "任务管理",
    icon: ScheduleOutlined,
    children: [
        {
            name: "cli",
            path: "/schedule/cli",
            title: "批量下发",
        },
        {
            name: "tasks",
            path: "/schedule/tasks",
            title: "任务调度",
            id: "3-2",
        }
    ],
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