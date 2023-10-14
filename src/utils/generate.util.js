const fs = require('fs');
const path = require('path');

const generateUtils = {
  randomString: (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }

    return result;
  },
  randomFilename: (originalname) => {
    const extension = originalname.split('.').pop()
    const uniqueSuffix = `${Date.now()}${Math.round(Math.random() * 1E9)}`

    return `${uniqueSuffix}.${extension}`
  }
}

module.exports = generateUtils