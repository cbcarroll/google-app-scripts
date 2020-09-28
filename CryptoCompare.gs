/**
 * Retuns the USD price of any Cryptocurrency using cryptocompare.com API
 *
 * @param {symbol} The Cryptocurrency you want the price of
 * @param {property} The Property you're looking for. This function currently supports "Price" and "MarketCap"
 * @return USD price or market cap
 * @customfunction
 */

function CryptoCompare(symbol, property) {
  var apikey = '83bc48354c44827c782204aa2caff74cfd9b69c5e234bbdb63234682305e722a';
  var url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms='+symbol+'&tsyms=USD&api_key='+apikey; //Documentation at ---> https://min-api.cryptocompare.com/documentation
  var requestOptions = {
    method: 'GET',
    muteHttpExceptions: true,
    headers: {
      'Accepts': 'application/json'
    },
    gzip: true,
    json: true
  }
  
  var response = UrlFetchApp.fetch(url,requestOptions);
  var text = response.getContentText();
  var json = JSON.parse(text);
  Logger.log(json);
  if (property === 'Price') {
    return json['RAW'][symbol]['USD']['PRICE'];
  }
  else if (property === 'MarketCap') {
    return json['RAW'][symbol]['USD']['PRICE'] * json['RAW'][symbol]['USD']['SUPPLY'];
  }
}

