const state = {
    crew: [
        { id: "AV-P102", name: "Capt. Arjun S.", status: "READY" },
        { id: "AV-F409", name: "Priya Nair", status: "READY" },
        { id: "AV-C882", name: "Rohan Varma", status: "BUSY" },
        { id: "AV-C901", name: "Sanya Iyer", status: "READY" }
    ],
    flights: [
        { id: "AV-502", route: "DEL ➔ BOM", gate: "B12", progress: 45, status: "EN-ROUTE" },
        { id: "AV-301", route: "BLR ➔ MAA", gate: "A04", progress: 10, status: "BOARDING" },
        { id: "AV-992", route: "BOM ➔ DXB", gate: "C09", progress: 0, status: "DELAYED" }
    ]
};

function renderCrew() {
    document.getElementById('crew-body').innerHTML = state.crew.map(c => `
        <tr onclick="updateLog('Accessing Personnel: ${c.name}')" style="cursor:pointer">
            <td style="color:var(--accent)">${c.id}</td>
            <td>${c.name}</td>
            <td style="color:${c.status === 'READY' ? 'var(--success)' : 'var(--warning)'}">${c.status}</td>
        </tr>
    `).join('');
}

function renderFlights() {
    document.getElementById('flight-grid').innerHTML = state.flights.map(f => `
        <div class="card" onclick="flightAction('${f.id}')">
            <div style="display:flex; justify-content:space-between">
                <span class="callsign">${f.id}</span>
                <span style="font-size:11px; color:#8b949e">GATE_${f.gate}</span>
            </div>
            <div style="margin:10px 0; font-weight:bold">${f.route}</div>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${f.progress}%"></div>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:11px">
                <span style="color:#8b949e">ALT_TRACKING: ON</span>
                <span class="${f.status === 'DELAYED' ? 'danger-blink' : ''}" 
                      style="color:${f.status === 'DELAYED' ? 'var(--danger)' : 'var(--accent)'}">${f.status}</span>
            </div>
        </div>
    `).join('');
}

function updateLog(msg) {
    document.getElementById('log-text').innerText = `CMD_EXE: ${msg} | AUTH_GRANTED...`;
}

function flightAction(id) {
    const flight = state.flights.find(f => f.id === id);
    updateLog(`Querying Telemetry for ${id}`);
    
    if(flight.status === "DELAYED") {
        flight.status = "BOARDING";
        updateLog(`Status Override: ${id} cleared for boarding`);
    } else {
        alert(`FLIGHT_DATA_${id}\nSector: ${flight.route}\nFuel: Optimal\nWeather: Clear`);
    }
    renderFlights();
}

function init() {
    renderCrew();
    renderFlights();
    
    // Live Clock
    setInterval(() => {
        document.getElementById('clock').innerText = new Date().toLocaleTimeString();
    }, 1000);

    // Auto-Progress Simulation
    setInterval(() => {
        state.flights.forEach(f => {
            if (f.status === "EN-ROUTE" && f.progress < 100) f.progress += 2;
            if (f.progress >= 100) { f.status = "ARRIVED"; f.progress = 100; }
        });
        renderFlights();
    }, 4000);
}

init();