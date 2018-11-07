Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.handleGoodsListInfo = function(o) {
    for (var i = o || [], t = [], e = 0; e < i.length; e++) i[e].goodsDto.publishTime && (i[e].goodsDto.publishTime = formatMsgTime(i[e].goodsDto.publishTime)), 
    2 == i[e].goodsDto.isPintuan && (i[e].goodsDto.reducePrice = parseFloat((i[e].goodsDto.price - i[e].goodsDto.pintuanPrice) / 100), 
    i[e].goodsDto.originalPrice = i[e].goodsDto.price, i[e].goodsDto.price = i[e].goodsDto.pintuanPrice), 
    2 == i[e].goodsDto.isBargain && (i[e].goodsDto.originalPrice = i[e].goodsDto.price, 
    i[e].goodsDto.price = i[e].goodsDto.bargainMinPrice), i[e].goodsDto.price = parseFloat(i[e].goodsDto.price / 100), 
    i[e].goodsDto.isFreePrice = Number(i[e].goodsDto.price), i[e].goodsDto.price = i[e].goodsDto.price.toString().split("."), 
    i[e].goodsDto.price1 = i[e].goodsDto.price[0], i[e].goodsDto.price2 = i[e].goodsDto.price[1] ? "." + i[e].goodsDto.price[1] : "", 
    (i[e].goodsDto.originalPrice || 0 != i[e].goodsDto.originalPrice) && (i[e].goodsDto.originalPrice = parseFloat(i[e].goodsDto.originalPrice / 100)), 
    t.push(i[e].goodsDto);
    return t;
};