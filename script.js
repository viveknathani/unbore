const getByID = function (id) {
    return document.getElementById(id);
}

const showResult = function (result) {
    let task = result.activity;
    task = task.charAt(0).toLowerCase() + task.slice(1);
    const primer = ["here's what we found", "all right you could do this"];
    const index = (Math.floor(Math.random() * 10)) % 2;
    getByID('start').innerText = primer[index];
    getByID('activity').innerText = task;

    if (result.participants > 1) {
        getByID('people').innerText = `this could be done amongst ${result.participants} people`;
        return;
    }

    getByID("people").innerText = 'this could be done solo';
}

const random = async function() {
    getByID("result").style.display = 'none';
    const response = await fetch('https://www.boredapi.com/api/activity/');
    const result = await response.json();
    showResult(result);
    getByID("result").style.display = 'block';
}

const getOfType = async function() {
    getByID("result").style.display = 'none';
    const type = getByID('specific').value;
    const response = await fetch(`https://www.boredapi.com/api/activity?type=${type}`);
    const result = await response.json();
    showResult(result);
    getByID("result").style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#random').addEventListener('click', random);
    document.querySelector('#specific').addEventListener('change', getOfType);
});
