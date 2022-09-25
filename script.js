document.querySelector('.count').addEventListener('click', () => {
    const input = document.querySelector('.content').value;
    const dates = input.match(/\d+[/]\d+[/]\d+/g);
    let counts = {};
    dates.sort((a, b) => a - b).forEach(date => counts[date] = counts[date] + 1 || 1);

    console.log(counts);
    console.log('10/25/2021' > '09/24/2022')
})

/* In-Hand Date: 09/25/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/29/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/25/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/26/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/26/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/25/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/24/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/25/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/22/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/21/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/20/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409
In-Hand Date: 09/25/2022 asfsflkja asdlfkjasdflkjas alkdfj 23409823409 */