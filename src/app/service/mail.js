const { ServiceError } = require('../errors/model/service.error');
const { Service } = require('./service');

class MailService extends Service{

    // Not Implement!!!
    static async sendEmail( email, subject, data, placeholder ) {}

}

module.exports = { MailService };