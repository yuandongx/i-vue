<template>
    <b-table
        :rowSelection="rowSelections"
        :loading="loading"
        :data-source="hosts"
        :columns="columns"
        :rowKey="recoder => recoder.id">
    </b-table>
</template>
<script>
import { Table } from "ant-design-vue";

export default {
    components: {
        "b-table": Table
    },
    mounted(){
        this.loading = true;
        this.http.get("/api/host").then(({data})=>{
            this.hosts = data;
            this.loading = false;
        })
    },
    methods: {
        selectedHost: function(){
            return this.selectedHosts;
        }
    },
    data(){
        return {
            hosts: [],
            selectedHosts: [],
            loading: false,
            rowSelections: {
                onChange: (selectedRowKeys, selectedRows) => {
                    this.selectedHosts = selectedRowKeys.length === selectedRows.length ? selectedRows.map(item=> ({id: item.id, hostname: item.hostname, hostip: item.hostip, port: item.port})):[]
                },
                onSelect: (record, selected) => {
                    if (selected && this.selectedHosts.filter(item => item.id === record.id).length == 0) {
                        this.selectedHosts.push({id: record.id, hostname: record.hostname, hostip: record.hostip, port: record.port});
                    } else if(!selected){
                        this.selectedHosts = this.selectedHosts.filter(item => item.id !== record.id);
                    }
                },
                onSelectAll: (selected, selectedRows) => {
                    let selections = [];
                    if (selected) {
                        selectedRows.forEach((item)=>{
                        selections.push({id: item.id, hostname: item.hostname, hostip: item.hostip, port: item.port});
                        });
                        this.selectedHosts = selections;
                    }
                },
            },
            columns: [
                {
                    title: '主机名',
                    dataIndex: 'hostname',
                    key: 'hostname',
                },
                {
                    title: 'IP地址',
                    dataIndex: 'hostip',
                    key: 'hostip',
                },
                {
                    title: '主机端口',
                    dataIndex: 'port',
                    key: 'port',
                },
            ]
        }
    },
}
</script>