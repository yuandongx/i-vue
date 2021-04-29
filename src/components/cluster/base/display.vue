<template>
  <a-table
    :row-selection="rowSelections"
    :data-source="data"
    :columns="columns"
    :row-key="recoder => recoder.id"
    :loading="loading"
  >
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
          <template #icon>
            <SearchOutlined />
          </template>
          查找
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="handleReset(clearFilters)"
        >
          重置
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
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            class="highlight"
            :key="i"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-else>
        {{ text }}
      </template>
    </template>
    <template #statusTags="{ text }">
      <span>
        <a-tag :color="tagColor(text)">{{ tagMsg(text) }}</a-tag>
      </span>
    </template>
    <template #moreOperations="{ record }">
      <Tooltip title="修改">
        <EditTwoTone @click="modify(record)" />
      </Tooltip>
      <divide type="vertical" />
      <Tooltip title="删除">
        <DeleteTwoTone @click="deleteHosts(record)" />
      </Tooltip>
      <divide type="vertical" />
      <Tooltip
        title="终端交互"
        @click="openConsole(record)"
      >
        <InteractionTwoTone />
      </Tooltip>
    </template>
  </a-table>
</template>

<script>
import { createVNode } from "vue";
import { SearchOutlined, DeleteTwoTone, EditTwoTone, InteractionTwoTone, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import {Divider, Modal, Tooltip, Table, Button, Input, Tag, message} from "ant-design-vue";
const data = [];
const colors = ["green", "default", "red", "warning"];
const tagmsgs = ["验证成功", "未验证", "主机不可达", "认证失败"];
export default {
  props: {
    platform: {
      type: String,
      default: () => "linux"
    }
  },
  components: {
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Input.name]: Input,
    [Table.name]: Table,
    [Modal.name]: Modal,
    SearchOutlined,
    DeleteTwoTone,
    EditTwoTone,
    InteractionTwoTone,
    divide: Divider,
    Tooltip,
  },
  data() {
    return {
      data,
      loading: false,
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      selectIds: [],
      rowSelections: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(1, selectedRowKeys);
          console.log(11, selectedRows);
          this.selectIds = selectedRowKeys.length === selectedRows.length ? selectedRows.map(item=> item.id):[]
        },
        onSelect: (record, selected) => {
          if (selected && !this.selectIds.includes(record.id)) {
              this.selectIds.push(record.id);
          } else if(!selected){
            this.selectIds = this.selectIds.filter(item => item != record.id);
          }
        },
        onSelectAll: (selected, selectedRows) => {
          let selections = [];
          if (selected) {
            selectedRows.forEach((item)=>{
              selections.push(item.id);
            });
            this.selectIds = selections;
          }
        },
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
          slots:{customRender: "statusTags"},
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
    tagColor: (text)=>{
      if (text < colors.length){
        return colors[text];
      }
      return "default";
    },
    tagMsg: (text) => {
      if (text < tagmsgs.length){
        return tagmsgs[text];
      }
      return tagmsgs[1];
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
    delOnOK: function(ids){
      const data = ids.map(id => ({id}));
      // 此处需要转JSON，不然不会携带 Content-Type
      this.http.delete("/api/cluster", { headers: { "Content-Type": "application/json" }, data: JSON.stringify(data) }).then(({ data }) => {
        message.success(data);
      }).catch(()=>{
        message.error("删除失败。");
      }).finally(()=>{
        this.fetch();
      });
      Modal.destroyAll();
    },
    delOnCancel: function(){
      Modal.destroyAll();
    },
    modify: function(param){
      this.$emit("update", param);
    },
    openConsole: function(record){
      // let { href } = this.$router.resolve({path: "ssh", query: {id: record.id}});
      window.open(`/ssh/${record.id}`, "_blank");
    },
    deleteHosts: function(host={}){
      if (host.length == {} && this.selectIds.length == 0){
        message.warning("未选中任何主机");
        return;
      }

      let msg = "是否确认删除选该主机信息？";
      let willDeletes = [];
      if (host.id !== undefined){
        willDeletes = [host.id];
      } else {
        msg = "是否确认删除选中的 " + this.selectIds.length + " 个主机信息？";
        willDeletes = this.selectIds;
      }
      Modal.confirm({
        title: "确认删除",
        content: msg,
        okText: "确定",
        cancelText: "取消",
        icon: createVNode(ExclamationCircleOutlined),
        onOk: () => this.delOnOK(willDeletes),
        onCancel: this.delOnCancel,
      });
    },
    fetch(params={}){
      this.loading = true;
      this.http.get("/api/cluster", params).then(({data})=>{
        this.data = data;
        console.log(data);
      // let names = [];
      // data.forEach((item)=>{
      //     if(!names.includes(item.hostgroup)){
      //       names.push(item.hostgroup);
      //     }
      //   });
      //   this.columns[1].filters = names.map((item)=>({text:item, value:item}));
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
.menustyle{
  border: 0em;
  height: 10em;
}
</style>
