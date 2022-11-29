let passDiv = document.querySelector('#passwordInput');
let passInput = document.querySelector('#password');
let showPass = document.querySelector('#showpass');
let login = document.querySelector('#login');
let main = document.querySelector('main');
let table = document.querySelector('#pointsTable');
let add = document.querySelector('#add');
let addDiv = document.querySelector('#addDiv')
let points = {
    gained: document.querySelector('#gained'),
    lost: document.querySelector('#lost'),
    all: document.querySelector('#all'),
};
let pointsVal = {
    gained: 0,
    lost: 0,
    all: 0
}
let addPoints = document.querySelector('#submit');
let reason = document.querySelector('#reason');
let point = document.querySelector('#points');
let plusminus = document.querySelector('#plusminus')

let allPoints = [{
    gained: 0,
    lost: 0
}];
getStoredData();

login.addEventListener('click', () => {
    if (passInput.value == 'leandro2008') return passDiv.style.display = 'none', main.style.display = 'block';
    alert('Ne, nicht richtig');
    passInput.value = '';
});

showPass.addEventListener('click', () => {
    if (passInput.type == 'password') return showPass.innerHTML = '<span style="font-size: 20px" class="material-symbols-outlined">visibility_off</span > ', passInput.type = 'text';
    showPass.innerHTML = '<span style="font-size: 20px" class="material-symbols-outlined">visibility</span > ', passInput.type = 'password';
});

add.addEventListener('click', () => {
    addDiv.style.display = 'block';
});

addPoints.addEventListener('click', () => {
    $color = 'green';
    $reason = reason.value;
    $givenpoints = parseInt(point.value);
    if (plusminus.value == 'minus') {
        allPoints[allPoints.length - 1].lost = $givenpoints;
        $givenpoints = $givenpoints / -1;
        $color = 'red';
    } else {
        allPoints[allPoints.length - 1].gained = $givenpoints;
    }
    allPoints.unshift({
        reason: $reason,
        points: $givenpoints,
        color: $color
    });
    addDiv.style.display = 'none';
    reason.value = '';
    point.value = ''
    loadTable();
    addPointsForCounting();
    cache();
});

function loadTable() {
    table.innerHTML = `<tr>
        <th> Grund</th>
            <th>Punkte</th>
            </tr > `
    for (let i = 0; i < allPoints.length - 1; i++) {
        table.innerHTML += `
        <tr>
                <td>
                    <input type="text" class="reasonHeaderTD" value="${allPoints[i].reason}">
                </td>
                <td>
                    <input type="number" class="numberTD" value="${allPoints[i].points}">
                </td>
            </tr>
        `
    }
}

function addPointsForCounting() {
    if (allPoints[0].points < 0) {
        pointsVal.lost -= allPoints[0].points;
        points.lost.innerHTML = `Verlorene Punkte: ${pointsVal.lost}`
    } else {
        pointsVal.gained += allPoints[0].points;
        points.gained.innerHTML = `Verdiente Punkte: ${pointsVal.gained}`
    }
    all = allPoints[allPoints.length - 1].gained - allPoints[allPoints.length - 1].lost;
    points.all.innerHTML = `Punkte insgesamt: ${all}`
}

function cache() {
    localStorage.setItem('pointsVal', JSON.stringify(pointsVal));
    localStorage.setItem('allPoints', JSON.stringify(allPoints));
}

function getStoredData() {
    pointsVal = JSON.parse(localStorage.getItem("pointsVal"));
    allPoints = JSON.parse(localStorage.getItem("allPoints"));
    loadTable();
    addPointsForCounting();
}