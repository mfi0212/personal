document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const routineInput = document.getElementById('routineInput');

    // Add routine when button is clicked
    addButton.addEventListener('click', () => {
        const routine = routineInput.value.trim();

        if (routine) {
            const routines = JSON.parse(localStorage.getItem('userRoutines')) || [];
            routines.push({ routine }); // Store only the routine text
            localStorage.setItem('userRoutines', JSON.stringify(routines));

            routineInput.value = ''; // Clear input
            updateRoutineList();
        }
    });

    // Allow adding routine by pressing Enter key
    routineInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addButton.click();
        }
    });

    // Create and append Check In button
    const checkInButton = document.createElement('button');
    checkInButton.textContent = 'Check In';
    checkInButton.classList.add('btn-add'); // Reuse btn-add styling
    checkInButton.style.marginTop = '15px'; // Add some spacing
    checkInButton.style.display = 'block'; // Ensure it takes full width
    checkInButton.style.marginLeft = 'auto';
    checkInButton.style.marginRight = 'auto';
    checkInButton.onclick = () => {
        window.location.href = 'checkin.html'; // Navigate to checkin page
    };
    document.querySelector('.daily-routine-section').appendChild(checkInButton);

    // Initialize routine list
    initializeRoutineTracker();
});

function updateRoutineList() {
    const routines = JSON.parse(localStorage.getItem('userRoutines')) || [];
    const routineList = document.getElementById('routineList');
    routineList.innerHTML = ''; // Clear previous routines

    routines.forEach((item, index) => {
        const routineItem = document.createElement('div');
        routineItem.classList.add('routine-item');

        routineItem.innerHTML = `
            <span>${item.routine}</span>
            <button class="btn-remove" onclick="removeRoutine(${index})">X</button>
        `;

        routineList.appendChild(routineItem);
    });
}

function removeRoutine(index) {
    const routines = JSON.parse(localStorage.getItem('userRoutines')) || [];
    routines.splice(index, 1); // Remove the routine at the given index
    localStorage.setItem('userRoutines', JSON.stringify(routines));
    updateRoutineList(); // Refresh the routine list
}

function initializeRoutineTracker() {
    updateRoutineList();
}
