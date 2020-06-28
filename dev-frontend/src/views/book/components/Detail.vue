<template>
  <el-form ref="postForm" :model="postForm" :rules="rules">
    <sticky :sticky-top="84" :class-name="'sub-navbar'">
      <el-button v-if="!isEdit" @click="showGuide">显示帮助</el-button>
      <el-button
        v-loading="loading"
        type="success"
        style="margin-left: 10px"
        @click="submitForm"
      >{{ isEdit ? '编辑电子书' : '新增电子书' }}</el-button>
    </sticky>
    <div class="detail-container">
      <el-row>
        <warning />
        <el-col :span="24">
          <!-- 上传控件 -->
          <ebook-upload
            :file-list="fileList"
            :disabled="isEdit"
            @onSuccess="onUploadSuccess"
            @onRemove="onUploadRemove"
          />
        </el-col>
        <el-col :span="24">
          <el-form-item prop="title">
            <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
              <slot>书名</slot>
            </MDinput>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="author" label="作者：" :label-width="lableWidth">
                <el-input v-model="postForm.author" placeholder="作者" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="publisher" label="出版社：" :label-width="lableWidth">
                <el-input v-model="postForm.publisher" placeholder="出版社" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="language" label="语言：" :label-width="lableWidth">
                <el-input v-model="postForm.language" placeholder="语言" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="rootFile" label="根文件：" :label-width="lableWidth">
                <el-input v-model="postForm.rootFile" placeholder="根文件" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="filePath" label="文件路径：" :label-width="lableWidth">
                <el-input v-model="postForm.filePath" placeholder="文件路径" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="unzipPath" label="解压路径：" :label-width="lableWidth">
                <el-input v-model="postForm.unzipPath" placeholder="解压路径" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="coverPath" label="封面路径：" :label-width="lableWidth">
                <el-input v-model="postForm.coverPath" placeholder="封面路径" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="originalName" label="文件名称：" :label-width="lableWidth">
                <el-input v-model="postForm.originalName" placeholder="文件名称" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="cover" label="封面：" :label-width="lableWidth">
                <a v-if="postForm.cover" :href="postForm.cover" target="_blank">
                  <img :src="postForm.cover" alt class="preview-img" />
                </a>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="目录：" :label-width="lableWidth">
                <div v-if="contentsTree && contentsTree.length > 0" class="content-wrapper">
                  <el-tree :data="contentsTree" @node-click="onContentClick" />
                </div>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import Sticky from '@/components/Sticky'
import EbookUpload from '@/components/EbookUpload'
import MDinput from '@/components/MDinput'
import Warning from './Warning'
import { createBook, updateBook, getBook } from '@/api/book'

const fields = {
  title: '书名',
  author: '作者',
  publisher: '出版社',
  language: '语言'
}

export default {
  components: {
    Sticky,
    EbookUpload,
    MDinput,
    Warning
  },
  props: {
    isEdit: Boolean
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (!value || value.length === 0) {
        callback(new Error(fields[rule.field] + '必须填写'))
      } else {
        callback()
      }
    }

    return {
      loading: false,
      postForm: {},
      fileList: [],
      lableWidth: '120px',
      rules: {
        // 与prop对应
        title: [{ validator: validateRequire }],
        author: [{ validator: validateRequire }],
        publisher: [{ validator: validateRequire }],
        language: [{ validator: validateRequire }]
      },
      contentsTree: []
    }
  },
  created() {
    if (this.isEdit) {
      const fileName = this.$route.params.fileName
      this.getBookData(fileName)
    }
  },
  methods: {
    getBookData(fileName) {
      getBook(fileName).then(res => {
        console.log(res)
        this.setData(res.data)
      })
    },
    onContentClick(data) {
      // this.log(data)
      if (data && data.text) {
        window.open(data.text)
      }
    },
    // 更新表单数据
    setData(data) {
      const {
        title,
        author,
        publisher,
        language,
        rootFile,
        cover,
        url,
        originalName,
        contents,
        contentsTree,
        fileName,
        coverPath,
        filePath,
        unzipPath
      } = data
      this.postForm = {
        ...this.postForm,
        title,
        author,
        publisher,
        language,
        rootFile,
        cover,
        url,
        originalName,
        contents,
        contentsTree,
        fileName,
        coverPath,
        filePath,
        unzipPath
      }
      this.contentsTree = contentsTree
      this.fileList = [{ name: originalName || fileName, url }]
    },
    // 将表单数据还原为默认值
    setDefault() {
      this.fileList = []
      this.contentsTree = []
      this.$refs.postForm.resetFields() // 重置表单
    },
    onUploadSuccess(data) {
      this.log('onUploadSuccess', data)
      this.setData(data)
    },
    onUploadRemove() {
      this.setDefault()
    },
    showGuide() {
      this.log('show guide...')
    },
    submitForm() {
      const onSuccess = msg => {
        this.$notify({
          title: '操作成功',
          message: msg,
          type: 'success',
          duration: 1500
        })
        this.loading = false
      }
      if (!this.loading) {
        this.loading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            const book = { ...this.postForm } // 浅拷贝
            delete book.contentsTree
            // console.log('提交的电子书表单', this.postForm)
            if (this.isEdit) {
              // 编辑模式
              updateBook(book)
                .then(res => {
                  onSuccess(res.msg)
                })
                .catch(err => {
                  console.log(err)
                  this.loading = false
                })
            } else {
              // 创建模式
              createBook(book)
                .then(res => {
                  // console.log(res)
                  onSuccess(res.msg)
                  this.setDefault()
                })
                .catch(err => {
                  console.log(err)
                  this.loading = false
                })
            }
          } else {
            const message = fields[Object.keys(fields)[0]][0].message
            this.$message({ message, type: 'error' })
            this.loading = false
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
  padding: 40px 50px 20px;
}
.preview-img {
  width: 200px;
  height: 270px;
}
</style>
