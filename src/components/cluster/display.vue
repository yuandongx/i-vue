<template>
  <a-table :rowSelection="rowSelections" :data-source="data" :columns="columns" :rowKey="recoder => recoder.id" :loading="loading">
    <template #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div style="padding: 8px">
        <a-input
          :ref="c => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
          Reset
        </a-button>
      </div>
    </template>
    <template #filterIcon="filtered">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
      <template #customRender="{ text, column }">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" class="highlight" :key="i">
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-else>
        {{ text }}
      </template>
    </template>
    <template #moreOperations>
      <EditTwoTone />
      <divide type="vertical"/>
      <DeleteTwoTone />
    </template>
  </a-table>
</template>

<script>
import { SearchOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons-vue';
import {Divider} from "ant-design-vue";
const data = [];
export default {
  components: {
    SearchOutlined,
    DeleteTwoTone,
    EditTwoTone,
    divide: Divider,
  },
  data() {
    return {
      data,
      loading: false,
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      selectIds: [],
      rowSelections:{
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectIds = selectedRowKeys.length === selectedRows.length ? selectedRows.map(item=> item.id):[]
        },
        // onSelect: (record, selected) => {
        //   if (selected && !this.selectIds.includes()) {
        //       this.selectIds.push(record.id);
        //   } else if(!selected){
        //     this.selectIds = this.selectIds.filter(item => item != record.id);
        //   }
        // },
        // onSelectAll: (selected, selectedRows) => {
        //   let selections = [];
        //   if (selected) {
        //     selectedRows.forEach((item)=>{
        //       selections.push(item.id);
        //     });
        //     this.selectIds = selections;
        //   }
        // },
      },
      columns:  [
        {
          title: '主机名',
          dataIndex: 'hostname',
          key: 'hostname',
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.hostname
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: '主机组',
          dataIndex: 'hostgroup',
          key: 'hostgroup',
          filters: [],
          onFilter: (value, record) =>
            record.hostgroup
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
        {
          title: '主机地址',
          dataIndex: 'hostip',
          key: 'hostip',
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.hostip
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
        {
          title: '主机端口',
          dataIndex: 'port',
          key: 'port',

        },
        {
          title: '访问凭证',
          dataIndex: 'credential',
          key: 'credential',
        },
        {
          title: '描述信息',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: '主机状态',
          dataIndex: 'statuscode',
          key: 'statuscode',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          slots: {customRender: 'moreOperations'},
        },
      ],
    };
  },
  mounted(){
      this.fetch();
  },
  methods: {
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
      this.$forceUpdate();
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
    fetch(params={}){
      this.loading = true;
      this.http.get("/api/host/get", params).then(({data})=>{
        this.data = data;
        
      let names = [];
      data.forEach((item)=>{
          if(!names.includes(item.hostgroup)){
            names.push(item.hostgroup);
          }
        });
        this.columns[1].filters = names.map((item)=>({text:item, value:item}));
      }).finally(()=>{
        this.loading = false;
      });
    },
  },
};
</script>
<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
