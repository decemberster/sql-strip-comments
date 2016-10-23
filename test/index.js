'use strict';

var expect = require('chai').expect;

var strip = require('../');

describe('Все тесты', ()=>{
    it('Убирает однострочный комментарий', ()=>{
        let sql = 'SELECT * FROM customers; -- test comments';
        let r = strip(sql);

        expect(r).to.equal('SELECT * FROM customers;');
    });

    it('Убирает многострочный комментарий', ()=>{
        let sql = 'SELECT * FROM customers; /* -- test comments */ ';
        let r = strip(sql);

        expect(r).to.equal('SELECT * FROM customers;');
    });

    it('Не убирает комментарии в строковых литералах', ()=>{
        let sql = 'SELECT "комментарии бывают однострочными (-- текст комментария \n) и многострочными (/* текст комментария */)" FROM customers; /* -- test comments */ ';
        let r = strip(sql);

        expect(r).to.equal('SELECT "комментарии бывают однострочными (-- текст комментария \n) и многострочными (/* текст комментария */)" FROM customers;');
    });

    it('Правильно работает с кавычками внутри кавычек', ()=>{
        let sql = 'SELECT "комментарии бывают однострочными (-- текст комментария \n) и многострочными (/* ""текст комментария"" */)" FROM customers; /* -- test comments */ ';
        let r = strip(sql);

        expect(r).to.equal('SELECT "комментарии бывают однострочными (-- текст комментария \n) и многострочными (/* \"\"текст комментария\"\" */)" FROM customers;');

        sql = 'SELECT """строковый литерал"""; -- тест';
        r = strip(sql);

        expect(r).to.equal('SELECT """строковый литерал""";');
    });

    it('Сокращает начальные, конечные и множественные пробелы, символы конца строки и табуляции, если они не внутри строкового литерала', ()=>{
        let sql = '\n   SELECT "комментарии бывают \t однострочными (-- текст комментария \n) и многострочными (/* текст комментария */)" \n FROM customers;             /* -- test comments */ ';
        let r = strip(sql);

        expect(r).to.equal('SELECT "комментарии бывают \t однострочными (-- текст комментария \n) и многострочными (/* текст комментария */)" FROM customers;');
    });

});
