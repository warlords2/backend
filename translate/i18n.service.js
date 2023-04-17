const i18n = require('i18n');
let path = require('path');

let directory = process.env.DIR_LOCALES || path.join(__dirname, 'locales');

i18n.configure({
    locales: ['en'],
    defaultLocale: 'en',
    extension: '.json',
    retryInDefaultLocale: true,
    objectNotation: true,
    register : global,
    directory
})

module.exports = {
    "en": ( phrase, ...data ) => {
        return i18n.__({  phrase, locale: 'en' }, data);
    },
    "pt": ( phrase, ...data ) => {
        return i18n.__({  phrase, locale: 'pt' }, data);
    }
}


