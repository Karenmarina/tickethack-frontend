// Get the list of trips' result and display it
document.querySelector("#btn-search").addEventListener("click", function () {
  // retrieve search values into an objet
  const departure = document.querySelector("#trip-departure").value;
  const arrival = document.querySelector("#trip-arrival").value;
  const date = document.querySelector("#trip-date").value;
  //   console.log({ departure, arrival, date });

  //fetch list of results with input values in body
  fetch("http://localhost:3000/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ departure, arrival, date }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.allTrips);
      if (data.result) {
        // add trip results in HTML
        document.querySelector("#homepage-train").remove();

        for (let i = 0; i < data.allTrips.length; i++) {
          //   console.log(data.allTrips[1]);
          //   console.log(data.allTrips[0][i].departure);
          const date = moment(data.allTrips[i].date).format("HH:MM");
          // console.log(formattedTime);
          document.querySelector("#tripResults").innerHTML += `
          <div class="tripContainer">
            <p><span id="departure">${data.allTrips[i].departure}</span>><span id="arrival">${data.allTrips[i].arrival}</span>
            </p>
            <p id="date">${date}</p>
            <p id="price">${data.allTrips[i].price}€</p>
            </div>
            <button type="button" id="btn-book">Book</button>`;
        }
      } else {
        document.querySelector("#tripResults").innerHTML = `
        <img src="./images/notfound.png" id="train-logo" alt="" />
            <p>No trip found</p>`;
      }
      // click on Book button
      console.log(document.querySelectorAll("#btn-book"));
      for (let i = 0; i < document.querySelectorAll("#btn-book").length; i++) {
        document
          .querySelectorAll("#btn-book")
          [i].addEventListener("click", function () {
            const departure = data.allTrips[i].departure;
            const arrival = data.allTrips[i].arrival;

            const price = data.allTrips[i].price;
            console.log({ departure, arrival, date, price });

            fetch("http://localhost:3000/cart", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                departure,
                arrival,
                date,
                price,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                if (data.result) {
                  window.location.href = "cart.html";
                }
              });
          });
      }
    });
});

// document.querySelector("#btn-search").addEventListener("click", function () {
//   // const tripToBook = this.parentNode.children.textContent;
//   console.log("click detected");

//   fetch("http://localhost:3000/cart", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify("click detected"),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.result) {
//         window.location.assign = "cart.html";
//       }
//     });
// });

// add a trip to the cart on-click Book
// CODE PAS PROPRE A REPRENDRE !!!
