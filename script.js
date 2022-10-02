const todaysDate = document.querySelector('.today');
let pastDue, dueToday, future;

document.querySelector('.count').addEventListener('click', () => {
    pastDue = 0;
    dueToday = 0;
    future = 0;
    const input = document.querySelector('.content').value;
    let noInHand = (input.match(/In-Hand\sDate\:\sUnpack/g) || []).length;
    let dates = (input.match(/\d+[/]\d+[/]\d+/g) || [])
        .sort((a, b) => Date.parse(a) - Date.parse(b));
    let counts = {};
    const todayParsed = Date.parse(todaysDate.value);
    dates.forEach(date => {
        const parsed = Date.parse(date);
        if (parsed == todayParsed) dueToday++;
        else if (todayParsed > parsed) pastDue++;
        else if (todayParsed < parsed) future++;
    });
    
    

    console.log('Past Due: ' + pastDue + '\n' + 'Today: ' + dueToday + '\n' + 'Future: ' + future + "\n" + 'No In-Hand Date: ' + noInHand);
})

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
In-Hand Date: 09/25/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409 */