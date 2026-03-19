window.onload = function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);
    document.getElementById('date').value = today;
};

const descriptions = {
    "Economy": "💼 <strong>Economy:</strong> 15kg baggage, standard seat, and complimentary water.",
    "Premium Economy": "✨ <strong>Premium Economy:</strong> 20kg baggage, priority boarding, and extra legroom.",
    "Business": "👔 <strong>Business Class:</strong> Lounge access and gourmet hot meals.",
    "First Class": "👑 <strong>First Class:</strong> Private suite and chauffeur service."
};

function updateClassDetails() {
    const travelClass = document.getElementById('travelClass').value;
    document.getElementById('classDescBox').innerHTML = descriptions[travelClass];
}

document.getElementById('flightForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const tClass = document.getElementById('travelClass').value;
  const passengers = document.getElementById('passengers').value;
  const phone = document.getElementById('phone').value;

  if (from === to) {
    alert("📍 Origin and Destination cannot be the same city!");
    return;
  }

  const btn = document.getElementById('searchBtn');
  btn.innerText = "Searching...";
  
  setTimeout(() => {
    btn.innerText = "Find Domestic Flights";
    let multiplier = (tClass === "First Class") ? 6 : (tClass === "Business") ? 3.4 : (tClass === "Premium Economy") ? 1.7 : 1;
    const finalFare = Math.floor((Math.random() * 1500 + 3200) * multiplier * passengers);

    document.getElementById('flightCards').innerHTML = `
      <div class="flight-card">
        <div>
          <strong style="color: #003580;">SkyHigh Domestic SH-90${Math.floor(Math.random()*9)}</strong><br>
          <span>${from} ✈️ ${to}</span>
        </div>
        <div style="text-align: right;">
          <div class="price-tag">₹${finalFare}</div>
          <button onclick="confirmBooking('${from}', '${to}', '${tClass}', ${finalFare}, '${phone}')" style="padding: 8px 15px; width: auto; font-size: 0.8rem;">Book Now</button>
        </div>
      </div>
    `;
  }, 600);
});

function confirmBooking(f, t, c, p, ph) {
    const section = document.getElementById('summarySection');
    section.style.display = 'block';
    const pnr = Math.random().toString(36).substring(2, 8).toUpperCase();
    document.getElementById('summary').innerHTML = `
        <div style="background: #e9f7ef; border: 1px solid #2ecc71; padding: 20px; border-radius: 8px;">
            <p style="color: #27ae60; font-weight: bold; margin-top:0;">Booking Confirmed! ✅</p>
            <p><strong>Route:</strong> ${f} to ${t}</p>
            <p><strong>PNR:</strong> ${pnr} | <strong>Paid:</strong> ₹${p}</p>
            <hr style="border:0; border-top:1px solid #c6f6d5; margin:15px 0;">
            <p style="font-size: 0.85rem; color: #555;">Sent via SMS to <strong>+91 ${ph}</strong></p>
        </div>
    `;
    section.scrollIntoView({ behavior: 'smooth' });
}