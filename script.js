let input, pastDue, dueToday, future;

document.addEventListener('keypress', e => {
    if (e.key == 'Enter') {
        e.preventDefault();
        document.querySelector('.count').click();
    }
})

document.querySelector('.count').addEventListener('click', () => {
    count();
    getStore();
    getDuplicates();

})

function getStore() {
    let match = (input.match(/Welcome.+FL/)[0] || '');
    document.querySelector('.store')
        .textContent = 
            match.slice(match.indexOf('|') + 2, 
            match.indexOf(' FL'));
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
    let noInHand = (input.match(/In-Hand\sDate\:\sUnpack/g) || []).length;
    let updateReq = (input.match(/Shipment\sUpdate\sRequired/g) || []).length;
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
    

    console.log('Past Due: ' + pastDue + '\n' 
    + 'Today: ' + dueToday + '\n' 
    + 'Future: ' + future + "\n" 
    + 'No In-Hand Date: ' + noInHand + '\n'
    + 'Update Required: ' + updateReq);
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