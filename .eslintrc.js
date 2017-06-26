module.exports = {
   extends: ['frost-standard'],
   globals: {
       capture: false
   },
   "rules": {
     "ocd/sort-import-declarations": [
    2,
    {
      "localPrefixes": [
        "../",
        "./",
        "dummy/",
        "ember-prop-types"
      ]
    }
  ]
}
 }
