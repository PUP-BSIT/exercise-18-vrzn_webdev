const api = "https://projectvrzn.online/api/odrunia_back_end.php";

function createCar() {
  const brand = document.querySelector("#brand").value;
  const model = document.querySelector("#model").value;
  const year = document.querySelector("#year").value;
  const transmission = document.querySelector("#transmission").value;
  const fuel = document.querySelector("#fuel").value;

  const formData = new URLSearchParams();
  formData.append("action", "create");
  formData.append("brand", brand);
  formData.append("model", model);
  formData.append("year", year);
  formData.append("transmission", transmission);
  formData.append("fuel", fuel);

  fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getCars();
    })
    .catch((error) => console.error("Error:", error));
}

function deleteCar(carId) {
  const formData = new URLSearchParams();
  formData.append("action", "delete");
  formData.append("carId", carId);

  fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getCars();
    })
    .catch((error) => console.error("Error:", error));
}

function updateCar(carId, updatedCarDetails) {
  const formData = new URLSearchParams();
  formData.append("action", "update");
  formData.append("carId", carId);
  formData.append("brand", updatedCarDetails.brand);
  formData.append("model", updatedCarDetails.model);
  formData.append("year", updatedCarDetails.year);
  formData.append("transmission", updatedCarDetails.transmission);
  formData.append("fuel", updatedCarDetails.fuel);

  fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getCars();
    })
    .catch((error) => console.error("Error:", error));
}

function getCars() {
  fetch(api, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      displayCars(data);
    })
    .catch((error) => console.error("Error:", error));
}

function displayCars(cars) {
  const tableBody = document.querySelector("#car_table");
  tableBody.innerHTML = "";

  cars.forEach((car) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = car.ID;

    const brandCell = document.createElement("td");
    brandCell.textContent = car.brand;

    const modelCell = document.createElement("td");
    modelCell.textContent = car.model;

    const yearCell = document.createElement("td");
    yearCell.textContent = car.year_made;

    const engineCell = document.createElement("td");
    engineCell.textContent = car.transmission_type;

    const fuelCell = document.createElement("td");
    fuelCell.textContent = car.fuel_type;

    const actionsCell = document.createElement("td");

    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.className = "update-button"; //
    updateBtn.onclick = function () {
      const updatedCarDetails = {
        brand: car.brand,
        model: car.model,
        year: car.year_made,
        transmission: car.transmission_type,
        fuel: car.fuel_type,
      };

      updatedCarDetails.brand = prompt("Enter updated brand:", car.brand);
      updatedCarDetails.model = prompt("Enter updated model:", car.model);
      updatedCarDetails.year = prompt("Enter updated year:", car.year_made);
      updatedCarDetails.transmission = prompt(
        "Enter updated transmission type:",
        car.transmission_type
      );
      updatedCarDetails.fuel = prompt(
        "Enter updated fuel type:",
        car.fuel_type
      );

      if (
        updatedCarDetails.brand &&
        updatedCarDetails.model &&
        updatedCarDetails.year &&
        updatedCarDetails.transmission &&
        updatedCarDetails.fuel
      ) {
        updateCar(car.ID, updatedCarDetails);
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-button"; //
    deleteBtn.onclick = function () {
      deleteCar(car.ID);
    };

    actionsCell.appendChild(updateBtn);
    actionsCell.appendChild(deleteBtn);

    row.appendChild(idCell);
    row.appendChild(brandCell);
    row.appendChild(modelCell);
    row.appendChild(yearCell);
    row.appendChild(engineCell);
    row.appendChild(fuelCell);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  getCars();
});
