<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="书名"
        style="width: 200px"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @blur="handleFilter"
        @clear="handleFilter"
      />
      <el-input
        v-model="listQuery.author"
        placeholder="作者"
        style="width: 200px"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @blur="handleFilter"
        @clear="handleFilter"
      />
      <el-select
        v-model="listQuery.category"
        placeholder="分类"
        clearable
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in categoryList"
          :key="item.value"
          :label="item.label + '(' + item.num + ')'"
          :value="item.label"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 10px"
        @click="handleFilter"
      >查询</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        style="margin-left: 5px"
        @click="handleCreate"
      >新增</el-button>
      <el-checkbox
        v-model="showCover"
        class="filter-item"
        style="margin-left: 5px"
        @change="changeShowCover"
      >
        显示封面
      </el-checkbox>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :default-sort="defaultSort"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      />
      <el-table-column
        label="书名"
        prop="bookName"
        align="center"
        width="150"
      >
        <template slot-scope="{row:{titleWrapper}}">
          <span v-html="titleWrapper" />
        </template>
      </el-table-column>
      <el-table-column
        label="作者"
        prop="author"
        align="center"
        width="150"
      >
        <template slot-scope="{row:{authorWrapper}}">
          <span v-html="authorWrapper" />
        </template>
      </el-table-column>
      <el-table-column label="出版社" prop="publisher" width="150" align="center" />
      <el-table-column label="分类" prop="categoryText" width="100" align="center" />
      <el-table-column label="语言" prop="language" align="center" />
      <el-table-column v-if="showCover" label="封面">
        <template slot-scope="{row:{cover}}">
          <a :href="cover" target="_blank">
            <img :src="cover" style="width:120px;height:180px">
          </a>
        </template>
      </el-table-column>
      <el-table-column label="文件名" prop="fileName" width="100" align="center" />
      <el-table-column label="文件路径" prop="filePath" width="100" align="center">
        <template slot-scope="{row:{filePath}}">
          <span>{{ filePath | valueFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="封面路径" prop="coverPath" width="100" align="center">
        <template slot-scope="{row:{coverPath}}">
          <span>{{ coverPath | valueFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="解压路径" prop="unzipPath" width="100" align="center">
        <template slot-scope="{row:{unzipPath}}">
          <span>{{ unzipPath | valueFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传者" prop="createUser" width="100" align="center">
        <template slot-scope="{row:{createUser}}">
          <span>{{ createUser | valueFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传时间" prop="createDt" width="100" align="center">
        <template slot-scope="{row:{createDt}}">
          <span>{{ createDt | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="120"
        align="item"
        fixed="right"
      >
        <template slot-scope="{row}">
          <el-button type="text" icon="el-icon-edit" @click="handleUpdate(row)" />
          <el-button type="text" icon="el-icon-delete" style="color:#f56c6c;" @click="handleDelete(row)" />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="refresh"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import waves from '@/directive/waves/index'
import { getCategoryList, listBook, deleteBook } from '@/api/book'
import { parseTime } from '../../utils'

export default {
  components: {
    Pagination
  },
  directives: {
    waves
  },
  filters: {
    valueFilter(value) {
      return value ? value === 'null' ? '无' : value : '无'
    },
    timeFilter(time) {
      return time ? parseTime(time, '{y}-{m}-{d} {h}:{i}') : '无'
    }
  },
  data() {
    return {
      tableKey: 0,
      listQuery: {},
      showCover: false,
      categoryList: [],
      listLoading: true,
      list: [],
      total: 0,
      defaultSort: {}
    }
  },
  created() {
    this.parseQuery()
  },
  /**
   * 解决路由更新，列表不更新的问题
   */
  beforeRouteUpdate(to, from, next) {
    // console.log('beforeRouteUpdate', to, from)
    if (to.path === from.path) {
      // 比较query对象
      const newQuery = Object.assign({}, to.query)
      const oldQuery = Object.assign({}, from.query)
      if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
        this.getList()
      }
    }
    next()
  },
  mounted() {
    this.getList()
    this.getCategoryList()
  },
  methods: {
    parseQuery() {
      const query = Object.assign({}, this.$route.query)
      let sort = '+id'
      const listQuery = {
        page: 1,
        pageSize: 20,
        sort: '+id'
      }
      if (query) {
        query.page && (query.page = +query.page)
        query.pageSize && (query.pageSize = +query.pageSize)
        query.sort && (sort = query.sort)
      }
      const sortSymbol = sort[0]
      const sortColumn = sort.slice(1, sort.length)
      this.defaultSort = {
        prop: sortColumn,
        order: sortSymbol === '+' ? 'ascending' : 'descending'
      }
      this.listQuery = { ...listQuery, ...query }
      // console.log(this.listQuery)
    },
    sortChange(data) {
      // console.log('sort change', data)
      const { prop, order } = data
      this.sortBy(prop, order)
    },
    sortBy(prop, order) {
      this.listQuery.sort = order === 'ascending' ? `+${prop}` : `-${prop}`
      this.handleFilter()
    },
    wrapperKeyword(key, value) {
      function highlight(value) {
        return `<span style="color: #1890ff">${value}</span>`
      }
      // console.log('listQuery', this.listQuery[key])
      return this.listQuery[key]
        ? value.replace(new RegExp(this.listQuery[key].toLowerCase(), 'gi'), value => highlight(value))
        : value
    },
    getList() {
      this.listLoading = true
      listBook(this.listQuery)
        .then(res => {
          const { list, count } = res.data
          this.list = list
          this.total = count
          this.listLoading = false
          this.list.forEach(book => {
            book.titleWrapper = this.wrapperKeyword('title', book.title)
            book.authorWrapper = this.wrapperKeyword('author', book.author)
          })
        })
        .catch(err => {
          console.log(err)
          this.listLoading = false
        })
    },
    getCategoryList() {
      getCategoryList().then(res => {
        this.categoryList = res.data
        // console.log(this.categoryList)
      })
    },
    refresh() {
      this.$router.push({
        path: '/book/list',
        query: this.listQuery
      })
    },
    handleFilter() {
      // console.log('handleFilter', this.listQuery)
      this.listQuery.page = 1
      this.refresh()
    },
    handleCreate() {
      this.$router.push('/book/create')
    },
    handleUpdate(row) {
      console.log('handleUpdate', row)
      this.$router.push(`/book/edit/${row.fileName}`)
    },
    handleDelete(row) {
      console.log(row)
      this.$confirm('此操作将永久删除该电子书，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBook(row.fileName)
          .then(res => {
            this.$notify({
              title: '成功',
              message: res.msg || '删除成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
      }).catch(err => {
        console.log(err)
      })
    },
    changeShowCover(value) {
      this.showCover = value
    }
  }
}
</script>
