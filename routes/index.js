var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  const data = {
    otherData: 'Something Else'
  }

  req.vueOptions = {
    head: {
      title: 'Page Title',
      metas: [
        { property: 'og:title', content: 'Page Title' },
        { name: 'twitter:title', content: 'Page Title' }
      ]
    }
  }

  res.renderVue('hello.vue', data, req.vueOptions)
})

module.exports = router
