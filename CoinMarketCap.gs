/**
 * Retuns the USD price of any Cryptocurrency using the CoinMarketCap API
 *
 * @param {symbol} The Cryptocurrency you're interested in
 * @param {property} The property of the Cryptocurrency you're interested in: "Price", "Market Cap", "Max Supply", "Total Supply"
 * @return USD property of the input Cryptocurrency
 * @customfunction
 */

function CryptoPrice(symbol,property) {
  var APIcallsymbols = ['BTC','ETH','ETC','LINK','NEO','ONT','SNX','LRC','BNT','SXP','BAND','KAVA','FET','ENG','AST','GAS','GEO','SIB','USDC'] //added this so it only makes the API call for these symbols since previously it was hitting the API with symbols that weren't in my sheet.  I htink this is a caching issue but not sure
  //var url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol='+APIcallsymbols;
  //var url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=2000'
  var requestOptions = {
    method: 'GET',
    muteHttpExceptions: true,
    headers: {
    //'X-CMC_PRO_API_KEY': '89fa067b-9764-405b-80ba-21c643bc9bbd', //api key for cbcarroll@gmail.com at CoinMarketCap.com
      'X-CMC_PRO_API_KEY': '8c7d8fda-c714-46f3-930f-70f1a3c48295', //api key for cbcarroll+crypto@gmail.com at CoinMarketCap.com
      'Accepts': 'application/json',
      'Accept-Encoding': 'deflate, gzip'
    },
    json: true,
    gzip: true
  }
  var response = UrlFetchApp.fetch(url,requestOptions); //Make the call to the CoinMarketCap API
  Logger.log(response.getResponseCode());
  
  if (response.getResponseCode() === 429) {
    Utilities.sleep(1000);
    response = UrlFetchApp.fetch(url,requestOptions); //Make the call to the CoinMarketCap API
  }
  else {
    var text = response.getContentText(); //Convert response to text
    var json = JSON.parse(text); //Convert text to JSON objects
    
    //Returns coin price
    if (property === 'Price' || property === 'price') {
      return json.data[symbol].quote.USD.price;
    }
    //Returns market cap
    else if (property === 'MarketCap' || property === 'Market Cap' || property === 'marketcap' || property === 'market cap' || property === 'marketCap') {
      return json.data[symbol].quote.USD.market_cap;
    }
    //Returns max supply
    else if (property === 'MaxSupply' || property === 'Max Supply' || property === 'maxsupply' || property === 'max supply' || property === 'maxSupply') {
      return json.data[symbol].quote.USD.max_supply;  
    }
    //Returns total supply
    else if (property === 'TotalSupply' || property === 'Total Supply' || property === 'totalsupply' || property === 'total supply' || property === 'totalSupply') {
      return json.data[symbol].quote.USD.total_supply;
    }
  }
}

/**
 * Retuns the CoinMarketCap API call credit status
 *
 * @return Current credit status of CoinMarketCap API credits
 * @param The paramter you're looking to retreive: "Daily Percentage", "Daily Total", "Monthly Percentage", "Monthly Total"
 * @customfunction
 */

function CryptoCreditStatus(paramater) {
  var url = 'https://pro-api.coinmarketcap.com/v1/key/info';

  var requestOptions = {
    method: 'GET',
    headers: {
      'X-CMC_PRO_API_KEY': '89fa067b-9764-405b-80ba-21c643bc9bbd' //api key for cbcarroll@gmail.com at CoinMarketCap.com
    },
    json: true,
    gzip: true
  }
  
  var response = UrlFetchApp.fetch(url,requestOptions);
  var text = response.getContentText();
  var json = JSON.parse(text);
  
  //Returns percentage of daily cap used
  if (paramater === 'Daily Percentage' || paramater === 'DailyPercentage' || paramater === 'dailypercentage' || paramater === 'daily percentage' || paramater === 'dailyPercentage') {
    return json.data.usage.current_day.credits_used / json.data.plan.credit_limit_daily;
  }
  //Returns aggregate total of daily API credit cap used
  else if (paramater === 'Daily Total' || paramater === 'DailyTotal' || paramater === 'dailytotal' || paramater === 'daily total' || paramater === 'dailyTotal') {
    return json.data.usage.current_day.credits_used;
  }
  //Returns percentage of monthly API credit cap used
  else if (paramater === 'Monthly Percentage' || paramater === 'MonthlyPercentage' || paramater === 'monthlypercentage' || paramater === 'monthly percentage' || paramater === 'monthlyPercentage') {
    return json.data.usage.current_month.credits_used / json.data.plan.credit_limit_monthly;
  }
  //Returns aggregate total of monthly API credit cap used
  else if (paramater === 'Monthly Total' || paramater === 'MonthlyTotal' || paramater === 'monthlytotal' || paramater === 'monthly total' || paramater === 'monthlyTotal') {
    return json.data.usage.current_month.credits_used;
  }
}
