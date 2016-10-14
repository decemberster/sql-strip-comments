'use strict';

const debug = require('debug')('sql-strip-comments');

// Удаление комментариев
// Комментарии могут быть однострочными: от "--" и до конца строки,
// или многострочными: от "/*" до "*/".
// Символы комментариев внутри строковых констрант не учитываются.
// Вложенные комментарии не поддерживаются
// https://larrysteinle.com/2011/02/09/use-regular-expressions-to-clean-sql-statements/

function removeComments(sql) {
    sql = sql.replace(/("(""|[^"])*")|('(''|[^'])*')|(--[^\n\r]*)|(\/\*[\w\W]*?(?=\*\/)\*\/)/gm, (match) => {
            if (
        (match[0] === '"' && match[match.length-1] === '"')
        || (match[0] === "'" && match[match.length-1] === "'")
) return match;

    debug('comment removed: {\n%s\n}', match);
    return '';
});

    return sql;
}

function minifySQL(sql) {
    // Удалить все табуляции и переносы строк
    sql = sql.replace(/("(""|[^"])*")|('(''|[^'])*')|([\t\r\n])/gm, (match) => {
            if (
        (match[0] === '"' && match[match.length-1] === '"')
        || (match[0] === "'" && match[match.length-1] === "'")
) return match;

    return ' ';
});

    // Сократить все дублирующиеся пробелы
    sql = sql.replace(/("(""|[^"])*")|('(''|[^'])*')|([ ]{2,})/gm, (match) => {
            if (
        (match[0] === '"' && match[match.length-1] === '"')
        || (match[0] === "'" && match[match.length-1] === "'")
) return match;

    return ' ';
});

    return sql.trim();
}

module.exports = function(sql) {
    return minifySQL( removeComments(sql) )
};
