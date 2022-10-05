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

})

function getStore() {
    let match = (input.match(/Welcome.+FL$/)[0] || '');
    document.querySelector('.store')
        .textContent = 'Store: ' + match.substr(match.indexOf('|') + 2)
}

function getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = (today.getMonth() + 1).toString().padStart(2, '0');
    let dd = (today.getDate()).toString().padStart(2, '0');
    const date = mm + '/' + dd + '/' + yyyy;
    document.querySelector('.todays-date')
        .textContent = "Today's Date: " + date;
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
    document.querySelectorAll('.counts-container div').forEach((count, i) => {
        count.textContent = arr[i][0] + arr[i][1];
    })
    

    console.log('Past Due: ' + pastDue + '\n' 
    + 'Today: ' + dueToday + '\n' 
    + 'Future: ' + future + "\n" 
    + 'No In-Hand Date: ' + noInHand + '\n'
    + 'Update Required: ' + updateReq);
}

/* In-Hand Date: 09/25/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
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
Welcome Michael Ferrell | BOCA RATON FL
*/