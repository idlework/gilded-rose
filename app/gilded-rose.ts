export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality = () => this.items.map(applyRulesForItem)
}

const AGED_BRIE = 'Aged Brie'
const SULFURAS = 'Sulfuras, Hand of Ragnaros'
const BACKSTAGE_PASSES = 'Backstage passes'
const CONJURED = 'Conjured'

const applyRulesForItem = (item: Item) => {
  switch (item.name) {
    case AGED_BRIE: 
      return applyAgedBrieRules(item)
    case SULFURAS: 
      return applySulfurasRules(item)
    default:
      return item.name.includes(BACKSTAGE_PASSES)
        ? applyBackstagePassesRules(item)
        : item.name.includes(CONJURED)
          ? applyConjuredRules(item)
          : applyGenericRules(item)
  }
}

const applyAgedBrieRules = (item: Item) => increaseItemQualityBy(item, 1)

const applySulfurasRules = (item: Item) => item

const applyBackstagePassesRules = (item: Item) => {
  decreaseItemSellInBy(item, 1)

  if (isItemSellInZero(item)) {
    return decreaseItemQualityBy(item, item.quality)
  }
  
  increaseItemQualityBy(item,
    isItemSellInAbove(item, 10)
      ? 1
      : isItemSellInAbove(item, 5)
        ? 2
        : 3)

    return item
  }

const applyConjuredRules = (item: Item) => {
  decreaseItemSellInBy(item, 1)
  decreaseItemQualityBy(item, isItemSellInZero(item) ? 4 : 2)
  return item
}

const applyGenericRules = (item: Item) => {
  decreaseItemSellInBy(item, 1)
  decreaseItemQualityBy(item, isItemSellInZero(item) ? 2 : 1)
  return item
}

const isItemSellInAbove = (item: Item, treshold: number) => isAbove(item.sellIn, treshold)
const isItemSellInZero = (item: Item) => isBelow(item.sellIn, 1)

const decreaseItemSellInBy = (item: Item, step: number) => {
  item.sellIn = decrease(item.sellIn, step)
  return item
}
const decreaseItemQualityBy = (item: Item, step: number) => {
  item.quality = decrease(item.quality, step)
  return item
}
const increaseItemQualityBy = (item: Item, step: number) => {
  item.quality = increase(item.quality, step)
  return item
}

const isAbove = (a: number, b: number) => a > b
const isBelow = (a: number, b: number) => a < b
 
const MAX_QUALITY = 50
const MIN_QUALITY = 0

const increase = (value: number, increment: number) => {
  const sum = value + increment
  return isBelow(sum, MAX_QUALITY) ? sum : MAX_QUALITY
}
const decrease = (value: number, reduction: number) => {
  const sum = value - reduction
  return isAbove(sum, MIN_QUALITY) ? sum : MIN_QUALITY
}