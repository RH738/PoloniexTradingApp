var Poloniex = require('./lib/poloniex'),
  poloniex = new Poloniex(
    // 'API_KEY',
    // 'API_SECRET'
  );
Poloniex.STRICT_SSL = false;

var orders = []

function addStopLossSellOrder(pair, stopPrice, stopLimit) {
  orders.push({
    buy_sell: "sell",
    type: "stopLoss",
    pair: pair,
    stopPrice: stopPrice,
    stopLimit: stopLimit
  })
}

function addStopLossBuyOrder(pair, stopPrice, stopLimit) {
  orders.push({
    buy_sell: "buy",
    type: "stopLoss",
    pair: pair,
    stopPrice: stopPrice,
    stopLimit: stopLimit
  })
}

function addStopLossTakeProfitOrder(pair, stopPrice, stopLimit, takePrice, takeLimit){
  orders.push({
    buy_sell: "sell",
    type: "stopLoss",
    pair: pair,
    stopPrice: stopPrice,
    stopLimit: stopLimit
  })
  orders.push({
    buy_sell: "sell",
    type: "stopLoss",
    pair: pair,
    stopPrice: stopPrice,
    stopLimit: stopLimit
  })
}

function updateOrders() {
  orders.forEach(function(order) {
    poloniex.getTicker(function(err, data) {
      if (err) {
        console.log('ERROR', err);
        return;
      }
      var lastPrice = data[order.pair].last
      console.log("update, last price = " + lastPrice);
      if (order.buy_sell === "sell") {
        if (lastPrice <= order.stopPrice){
          console.log("SELL ORDER HAS BEEN PLACES FOR PRICE", order.stopLimit);
        }
      }
      if (order.buy_sell === "buy") {
      }
    });
  })
}


addStopLossSellOrder("BTC_SC", 0.00000557, 0.00000556)
setInterval(updateOrders,1000)
