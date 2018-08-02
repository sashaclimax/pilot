import isEmail from 'validator/lib/isEmail'

export default message => value => !isEmail(value) && message
