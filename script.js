let input, pastDue, dueToday, future, noInHand, updateReq, awaitingPickup;

const stores = {
    'WEST PALM BEACH': { number: 550 },
    'BOYNTON BEACH': { number: 808 },
    'WELLINGTON': { number: 1168 },
    'BOCA RATON': { number: 554},
    'MARGATE': { number: 1424},
    'CORAL SPRINGS': { number: 1136},
    'SAWGRASS': { number: 551},
    'FORT LAUDERDALE': { number: 543},
    'DAVIE': 1258,
    'PEMBROKE PINES': { number: 559},
    'AVENTURA': { number: 558},
    'MIAMI BEACH': { number: 1498},
    'HIALEAH': { number: 555},
    'DORAL': { number: 1502},
    'PINECREST': { number: 1503},
    'DADELAND': { number: 557},
    'WEST KENDALL': { number: 552},
    'TROPICAIRE': { number: 553},
    'FORT MYERS': { number: 431}
}

let storesInTable = [];

document.addEventListener('keypress', e => {
    if (e.key == 'Enter') {
        e.preventDefault();
        document.querySelector('.count').click();
    }
})

document.querySelector('.count').addEventListener('click', () => {
    count();
    getStore();
    createRow();
    getDuplicates();
    clipForBackroom();

})

function getStore() {
    const store = document.querySelector('.store');
    store.textContent = '';
    if (!input.includes('|') || !input.includes(' FL')) return;
    let match = input.slice(input.indexOf('|') + 2, input.indexOf(' FL'));
    store.textContent = match;
}

function getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = (today.getMonth() + 1).toString().padStart(2, '0');
    let dd = (today.getDate()).toString().padStart(2, '0');
    const date = mm + '/' + dd + '/' + yyyy;
    document.querySelector('.todays-date')
        .textContent = date;
    return date;
}

function count() {
    const todaysDate = getDate();
    pastDue = 0;
    dueToday = 0;
    future = 0;
    input = document.querySelector('.content').value;
    noInHand = (input.match(/In-Hand\sDate\:\sUnpack/g) || []).length;
    updateReq = (input.match(/Shipment\sUpdate\sRequired/g) || []).length;
    let dates = (input.match(/\d+[/]\d+[/]\d+/g) || [])
        .sort((a, b) => Date.parse(a) - Date.parse(b));
    let counts = {};
    const todayParsed = Date.parse(todaysDate);
    dates.forEach(date => {
        const parsed = Date.parse(date);
        if (parsed == todayParsed) dueToday++;
        else if (todayParsed > parsed) pastDue++;
        else if (todayParsed < parsed) future++;
    });
    let arr = [['Past Due: ', pastDue], ['Today: ', dueToday], ['Future: ', future], 
        ['No In-Hand Date: ', noInHand], ['Update Required: ', updateReq]];
    document.querySelectorAll('.packages div').forEach((count, i) => {
        count.textContent = arr[i][0] + arr[i][1];
    })
}

function getDuplicates() {
    let orders = (input.match(/Order\s[#]\:\s(BBY01[-])?\d+/g) || [])
        .map(e => e.substr(e.indexOf(':') + 2));
    let counts = {};
    orders.forEach(order => counts[order] = counts[order] + 1 || 1);
    let duplicates = Object.keys(counts).filter(e => counts[e] > 1);
    if (duplicates.length) {
        duplicates = duplicates.map(e => [e, counts[e]]);
        createTable(duplicates);
    }

}

function createTable(duplicates) {
    const container = document.querySelector('.duplicates-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const table = document.querySelector('.duplicates-template').cloneNode(true);
    table.classList.remove('duplicates-template')
    table.id = 'duplicates-table';
    duplicates.forEach(e => {
        const row = document.createElement('tr');
        e.forEach(dup => {
            const cell = document.createElement('td');
            cell.textContent = dup;
            row.appendChild(cell);
        })
        table.appendChild(row);
    })
    container.appendChild(table);
}

function clipForBackroom() {
    if (/^Staging\sLocation.+In[-]Hand\sDate\:\s(\d+[/]\d+[/]\d+)?$/.test(input)) {
        return;
    }
    input = input.slice(input.indexOf('Staging Location'), input.lastIndexOf('Unpack') - 1);
    navigator.clipboard.writeText(input);
}

function createRow() {
    const city = document.querySelector('.store').textContent;
    if (!city) return;
    let store = stores[city].number;

    stores[city].awaitingPickup = [pastDue, dueToday, future, noInHand, updateReq]
        .reduce((a, b) => a + b);
    stores[city].pastDue = pastDue;
    stores[city].today = dueToday;
    stores[city].future = future;
    stores[city].noInHand = noInHand;
    stores[city].updateReq = updateReq;
    
    const row = document.createElement('tr');
    if (storesInTable.includes(store)) {
        document.getElementById(store).remove();
    }
    row.id = store;
    const fields = [
        store, city, stores[city].awaitingPickup, pastDue, 
        dueToday, future, noInHand, updateReq
    ]
    fields.forEach(e => {
        const cell = document.createElement('td');
        cell.textContent = e;
        row.appendChild(cell);
    })
    document.getElementById('counts-table').appendChild(row);
    storesInTable.push(store);
    console.log(stores[city])
}

/* Welcome Michael Ferrell | BOCA RATON FL In-Hand Date: 09/25/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/29/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/25/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/24/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/26/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/25/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/24/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/24/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/24/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/21/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/20/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/25/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409 

*/