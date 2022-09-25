const todaysDate = document.querySelector('.today');
todaysDate.value = '09/24/2022';
let pastDue = 0;
let dueToday = 0;
let future = 0;

document.querySelector('.count').addEventListener('click', () => {
    const input = document.querySelector('.content').value;
    const dates = input.match(/\d+[/]\d+[/]\d+/g).sort((a, b) => Date.parse(a) - Date.parse(b));
    let counts = {};
    const todayParsed = Date.parse(todaysDate.value);
    dates.forEach(date => {
        const parsed = Date.parse(date);
        if (parsed == todayParsed) dueToday++;
        else if (todayParsed > parsed) pastDue++;
        else if (todayParsed < parsed) future++;
    });

    console.log('Past Due: ' + pastDue + '\n' + 'Today: ' + dueToday + '\n' + 'Future: ' + future);
    console.log(Date.parse('08/26/2022') > Date.parse('09/24/2022'))
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