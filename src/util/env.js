exports.isCITest = process.env.CI === 'yes';
exports.isDev = process.env.DEV === 'yes';
exports.configDir = process.env.CONFIG || '../../config/AppConfig';
