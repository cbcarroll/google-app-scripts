/**
 * Retuns the USD price of any Cryptocurrency using coingecko.com API
 *
 * @param {symbol} The Cryptocurrency you want the price of
 * @param {property} The Property you're looking for. This function currently supports "Price" and "MarketCap"
 * @return USD price or market cap
 * @customfunction
 */

function CoinGecko(symbol, property, page) {
  var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page='+page+'&sparkline=false'; //Documentation at ---> https://www.coingecko.com/api/documentations/v3#/coins/get_coins_markets
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
    return json.find(x => x.symbol === symbol.toLowerCase()).current_price;
  }
  else if (property === 'MarketCap') {
    return json.find(x => x.symbol === symbol.toLowerCase()).market_cap;
  }
}

