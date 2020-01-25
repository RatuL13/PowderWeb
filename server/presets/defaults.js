const app = require('../utils/electronShim')
const userData = app.getPath('userData')
const _ = require('lodash')
const mkdirp = require('mkdirp')
const path = require('path')
const backup = require('../utils/backup').get()

const userDataFolders = [
    'torrentFiles'
]

const fs = require('fs')

userDataFolders.forEach(folder => {
    mkdirp(path.join(userData, folder), () => {})
})

const settings = app.settings()

// defaults
const map = {
    addressbook: {},
    acebook: {},
    acenamebook: {},
    sopbook: {},
    locbook: {},
    ytdlbook: {},
    fastresumebook: {},
    uploaded: {},
    users: {},
    history: {},
}

module.exports = {
    set: () => {

        const defaults = Object.assign({}, map)

        // overwrite defaults if backup available
        if (backup)
            _.forEach(defaults, (el, ij) => {
                if (backup.hasOwnProperty(ij))
                    defaults[ij] = backup[ij]
            })

        _.forEach(defaults, (el, ij) => {
            if (!settings.has(ij))
                settings.set(ij, el)
        })

        return true
    },
    reset: () => {

        _.forEach(map, (el, ij) => {
            settings.set(ij, el)
        })

    }
}