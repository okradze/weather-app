document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const location = document.querySelector('input').value;
    const p1 = document.getElementById('error');
    const p2 = document.getElementById('forecast');

    (async () => {
        p1.textContent = 'Loading...';
        p2.textContent = '';

        const response = await fetch(`/weather?address=${location}`);

        const data = await response.json();

        if (data.error) {
            p1.textContent = data.error;
        } else {
            p1.textContent = data.location;
            p2.textContent = data.forecast;
        }
    })();
});
