
async function findVehicle(vehicleNumber) {
    const response = await fetch('./data.json');
    if (response && response.ok) {
        response.json().then(data => {
            console.log(data)
        });
    } 
    
}


document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('vehicle-search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            findVehicle('123');
        })
    }
});