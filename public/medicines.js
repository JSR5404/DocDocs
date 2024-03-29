const createMedicineButton = document.getElementById("create-medications");
const searchMedicineButton = document.getElementById("search-medications");
const medicineDisplay = document.getElementById("medication-data");
const alertDiv = document.getElementById("alert");

async function renderMedicine(medicine) {
  console.log(medicine);
  const html = `<div class="display-box">
  <span class="material-symbols-outlined">medication</span>
<p>Name: ${medicine[0].name}</p> 
<p>Description: ${medicine[0].description}</p>
<p>Usage: ${medicine[0].usage_type}</p>
<p>Treats: ${medicine[0].treatments}</p>
</div>`;
  medicineDisplay.replaceChildren("");
  medicineDisplay.insertAdjacentHTML("beforeend", html);
}

async function createMedicine(event) {
  // event.preventDefault();

  const medicineName = document.getElementById("medication-name").value.trim();
  const medicineDescription = document
    .getElementById("medication-description")
    .value.trim();
  const medicineUsage = document.getElementById("usage-type").value.trim();
  const medicineTreatments = document
    .getElementById("treatment-name")
    .value.trim();

  const newMedicine = {
    name: medicineName,
    description: medicineDescription,
    usage_type: medicineUsage,
    treatments: medicineTreatments,
  };

  console.log(newMedicine);

  const response = await fetch("/api/medications", {
    body: JSON.stringify(newMedicine),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.ok) {
    console.log("Nice!");
  } else {
    console.log("Fetch Failed");
  }
}

async function searchMedicine(event) {
  // event.preventDefault();

  const name = document.getElementById("medication-search").value.trim();

  if (!name) alertDiv.innerText = "Please type in a name";

  const response = await fetch(`/api/medications/${name}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    const message = response.status;
    throw new Error(message);
  }
  const medicine = await response.json();
  alertDiv.innerText = "";

  renderMedicine(medicine);
}

createMedicineButton.addEventListener("click", createMedicine);
searchMedicineButton.addEventListener("click", searchMedicine);
