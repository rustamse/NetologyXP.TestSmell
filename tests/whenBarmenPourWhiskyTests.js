import assert from 'assert'
import {pour, free as freeBarmen} from '../src/barmen'
import {drink, sober, goToBar, getMyCar, getTotallyDrunked, isDrunked} from '../src/me'
import {download} from '../src/imageDownloader'
import fs from 'fs'
import {expect} from 'chai'
import username from 'username'


suite('bar tests', function () {

    setup(function (done) {
        sober();
        var car = getMyCar();
        goToBar(car);
        freeBarmen();
        this.whisky = "Jack Daniels";
        done();
    });

    suite('when barmen pour whisky', function () {

        suite('i ask 50 grams', function () {
            test('I get 50 grams of whisky', function (done) {
                var iAskVolume = 50;

                var volumeInGlass = pour(this.whisky, iAskVolume);

                assert.equal(iAskVolume, volumeInGlass);

                done();
            });
        });

        suite('i ask non positive grams', function () {
            test('Barmen said that volume of whisky is invalid', function (done) {
                var iAskVolume = -10;

                expect(() => pour(this.whisky, iAskVolume)).to.throw(/Invalid volume of whisky/);

                done();
            });
        });

        suite('i ask more than 200 grams', function () {
            test('Barmen said there is no such glass', function (done) {
                var iAskVolume = 500;
                var whisky = 1;

                expect(() => pour(whisky, iAskVolume)).to.throw(/There is no such glass/);

                done();
            })
        });
    });

    suite('when I drink whisky', function () {

        suite('I drink 50 grams', function () {

            var volumeInGlass = 50;

            test('I am not drunked', function (done) {

                drink(volumeInGlass);

                assert.equal(false, isDrunked());

                done();
            });

            test('I totally drunked 50 grams', function (done) {

                drink(volumeInGlass);

                assert.equal(50, getTotallyDrunked());

                done();
            });
        });

        suite('I drink 2 times by 50 grams', function () {
            test('I totally drunked 100 grams', function (done) {
                var volumeInGlass = 50;

                drink(volumeInGlass);
                drink(volumeInGlass);

                assert.equal(50 + 50, getTotallyDrunked());

                done();
            });
        });

        suite('I drink more than 150 grams', function () {
            test('I am drunked', function (done) {
                var volumeInGlass = 200;

                drink(volumeInGlass);

                assert.equal(true, isDrunked());

                done();
            });
        });
    });

    teardown(function () {
    })
});