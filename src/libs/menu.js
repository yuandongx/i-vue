import {
    DashboardOutlined,
    ClusterOutlined,
    ScheduleOutlined,
    DeploymentUnitOutlined,
    SettingOutlined
  } from "@ant-design/icons-vue";

const menus = [
{
    name: "dashboard",
    path: "/dashboard",
    title: "主页",
    icon: DashboardOutlined,
    children:[]
},
{
    name: "cluster",
    path: "/cluster",
    title: "资产",
    icon: ClusterOutlined,
    children:[] 
},
{
    name: "schedule",
    path: "/schedule",
    title: "任务调度",
    icon: ScheduleOutlined,
    children:[] 
},
{
    name: "deployment",
    path: "/deployment",
    title: "安装部署",
    icon: DeploymentUnitOutlined,
    children:[] 
},
{
    name: "setting",
    path: "/setting",
    title: "系统设置",
    icon: SettingOutlined,
    children:[] 
}
]
export default menus;