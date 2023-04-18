function toggleClass(element, className) {
    if (element && element instanceof HTMLElement && className) {
        element.classList.toggle(className);
    }
}

function createTable(table, list, fields) {
    table.innerHTML = '';

    if (
        table && table instanceof HTMLElement &&
        list && list instanceof Array && list.length &&
        fields && fields instanceof Array && fields.length && fields.every(field => typeof field === 'string')
    ) {
        list.forEach(item => {
            const tr = document.createElement('tr');

            fields.forEach(field => {
                const td = document.createElement('td');
                td.dataset.field = field;
                td.innerText = item[field] || null;

                tr.appendChild(td);
            });

            table.appendChild(tr);
        });
    }
}

function navigateTo(url, target = '_self') {
    window.open(url, target);
}