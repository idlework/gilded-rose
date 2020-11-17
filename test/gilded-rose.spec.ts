import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
    // Lucky Charm: https://www.wowhead.com/item=5373/lucky-charm
    it('should have a Lucky Charm', () => {
        const gildedRose = new GildedRose([new Item('Lucky Charm', 1, 1)]);
        const { name } = gildedRose.updateQuality()[0];
        expect(name).to.equal('Lucky Charm');
    });
});

describe('Generic goods', () => {
    const gildedRose = new GildedRose([new Item('Lucky Charm', 2, 4 )]);

    it('should degrade quality', () => {
        const { sellIn, quality } = gildedRose.updateQuality()[0];
        expect(sellIn).to.equal(1);
        expect(quality).to.equal(3);
    });
     
    it('should degrade quality twice as fast after sell by date has passed', () => {
        const { sellIn, quality } = gildedRose.updateQuality()[0];
        expect(sellIn).to.equal(0);
        expect(quality).to.equal(1);
    });

    it('should not degrade quality below 0', () => {
        const { quality } = gildedRose.updateQuality()[0];
        expect(quality).to.equal(0);
    });
    
    it('should not degrade sell in below 0', () => {
        const { sellIn } = gildedRose.updateQuality()[0];
        expect(sellIn).to.equal(0);
    });
})

describe('Aged Brie', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 49)]);

    it('should increase quality', () => {
        const { quality } = gildedRose.updateQuality()[0];
        expect(quality).to.equal(50);
    });
    
    it('should not increase quality above 50', () => {
        const { quality } = gildedRose.updateQuality()[0];
        expect(quality).to.equal(50);
    });
})

describe('Sulfuras, Hand of Ragnaros', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);

    it('should never degrade quality', () => {
        const { quality } = gildedRose.updateQuality()[0];
        expect(quality).to.equal(80);
    });
    
    it('should never has to be sold', () => {
        const { sellIn } = gildedRose.updateQuality()[0];
        expect(sellIn).to.equal(0);
    });
})

describe('Backstage passes', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 1)]);

    it('should increase quality by 1 when there are 11 days or more', () => {
        const { quality } = gildedRose.updateQuality()[0];
        expect(quality).to.equal(2);
    });

    it('should increase quality by 2 when there are 10 days or less', () => {
        const { quality } = gildedRose.updateQuality()[0];
        expect(quality).to.equal(4);
    });
    
    it('should increase quality by 3 when there are 5 days or less', () => {
        gildedRose.items[0].sellIn = 5
        const { quality } = gildedRose.updateQuality()[0];
        expect(quality).to.equal(7);
    });

    it('should drop quality to 0 after the concert', () => {
        gildedRose.items[0].sellIn = 0
        const { quality } = gildedRose.updateQuality()[0];
        expect(quality).to.equal(0);
    });
})

describe('Conjurned goods', () => {
    const gildedRose = new GildedRose([new Item('Conjured Fresh Water', 2, 10)]);

    it('should degrade quality twice as fast as normal items', () => {
        const { quality } = gildedRose.updateQuality()[0];
        expect(quality).to.equal(8);
    });
     
    it('should degrade quality twice as fast after sell by date has passed', () => {
        const { sellIn, quality } = gildedRose.updateQuality()[0];
        expect(quality).to.equal(4);
    });
})