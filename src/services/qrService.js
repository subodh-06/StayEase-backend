const QRCode = require('qrcode');

exports.generateCheckInQR = async (bookingId) => {
  const checkInLink = `https://stayease.com/check-in/${bookingId}`;
  return await QRCode.toDataURL(checkInLink);
};
