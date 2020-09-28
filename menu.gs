//Function that adds a menu dropdown to g-sheets where you can force run your custom function described below
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Functions')
      .addItem('Refresh CMC Crypto Values','CoinMarketCapAPI')
      .addItem('Refresh CMC API Usage Status','CryptoCreditStatus')
      .addItem('Refresh CryptoCompare Data','CryptoCompare')
      .addItem('Refresh CoinGecko Data','CoinGecko')
      .addToUi();
}
