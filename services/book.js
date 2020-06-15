const Book = require('../models/Book')
const db = require('../db')
const _ = require('lodash')
const { reject } = require('lodash')

function exists(book) {
    const { title, author, publisher } = book
    const sql = `select * from book where title='${title}' and author='${author}' and publisher='${publisher}'`
    return db.queryOne(sql)
}

async function removeBook(book) {
    if (book) {
        book.reset()
        if (book.fileName) {
            const removeBookSql = `delete from book where fileName='${book.fileName}'`
            const removeContentsSql = `delete from contents where fileName='${book.fileName}'`
            await db.querySql(removeBookSql)
            await db.querySql(removeContentsSql)
        }
    }
}

/**
 *创建电子书目录
 *
 * @param {*} book
 */
function insertContents(book) {
    const contents = book.getContents()
    if (contents && contents.length > 0) {
        contents.forEach(async (content) => {
            const _content = _.pick(content, [
                'fileName',
                'id',
                'href',
                'order',
                'level',
                'text',
                'label',
                'pid',
                'navId'
            ])
            // console.log("插入数据库的字段", _content)
            await db.insert(_content, 'contents')
        })
    } else {
        console.log(new Error('当前图书目录为空'))
    }
}

function insertBook(book) {
    return new Promise(async (resolve, reject) => {
        try {
            if (book instanceof Book) {  // 保证book中的属性都存在
                const result = await exists(book)
                if (result) {
                    await removeBook(book)
                    reject({ msg: '电子书已存在' })
                } else {
                    await db.insert(book.toDb(), 'book')
                    await insertContents(book)
                    resolve()
                }
            } else {
                reject(new Error('添加的图书对象不合法'))
            }
        } catch (e) {
            reject(e)
        }
    })
}

function updateBook(book) {
    return new Promise(async (resolve, reject) => {
        try {
            if (book instanceof Book) {  // 保证book中的属性都存在
                const result = await getBook(book.fileName)
                if (result) {
                    const model = book.toDb()
                    await db.update(model, 'book', `${book.fileName}`)
                    resolve()
                } else {
                }
            } else {
                reject(new Error('添加的图书对象不合法'))
            }
        } catch (e) {
            reject(e)
        }
    })
}

function getBook(fileName) {
    return new Promise(async (resolve, reject) => {
        const bookSql = `select * from book where fileName='${fileName}'`
        const contentsSql = `select * from contents where fileName='${fileName}' order by \`order\``
        const book = await db.queryOne(bookSql)
        const contents = await db.querySql(contentsSql)
        if (book) {
            book.cover = Book.genUrl(book.cover)
            book.contentsTree = Book.getContentsTree(contents)
            resolve(book)
        } else {
            reject(new Error('电子书不存在'))
        }
    })
}

async function getCategory() {
    const sql = 'select * from category order by category asc'
    const result = await db.querySql(sql)
    const categoryList = []
    result.forEach(item => {
        categoryList.push({
            label: item.categoryText,
            value: item.category,
            num: item.num
        })
    })
    return categoryList
}

async function listBook(query) {
    debug && console.log('查询条件', query)
    const {
        category,
        title,
        author,
        sort,
        page = 1,
        pageSize = 20
    } = query
    const offset = (page - 1) * pageSize    // 偏移
    let bookSql = 'select * from book'
    let where = 'where'
    category && (where = db.and(where, 'categoryText', category))
    title && (where = db.andLike(where, 'title', title))
    author && (where = db.andLike(where, 'author', author))
    if (where !== 'where') {
        bookSql += ` ${where}`
    }
    if (sort) {
        const symbol = sort[0]
        const column = sort.slice(1, sort.length)
        const order = symbol === '+' ? 'asc' : 'desc'
        bookSql += ` order by \`${column}\` ${order}`
    }
    let countSql = `select count(*) as count from book`
    if (where !== 'where') {
        countSql += ` ${where}`
    }
    const count = await db.querySql(countSql)
    console.log('count', count)
    bookSql += ` limit ${pageSize} offset ${offset}`
    const list = await db.querySql(bookSql)
    list.forEach(book => book.cover = Book.genUrl(book.cover))
    return { list, count: count[0].count, page, pageSize }
}

function deleteBook(fileName) {
    return new Promise(async (resolve, reject) => {
        let book = await getBook(fileName)
        if (book) {
            const bookObj = new Book(null, book)
            const sql = `delete from book where fileName='${fileName}'`
            db.querySql(sql).then(() => {
                bookObj.reset()
                resolve()
            })
        } else {
            reject(new Error('电子书不存在'))
        }
    })
}

module.exports = {
    insertBook,
    getBook,
    updateBook,
    getCategory,
    listBook,
    deleteBook
}