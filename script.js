let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let leadFromLocalstorage = JSON.parse(localStorage.getItem("myLeads"));
// const tabs = [{ url: "https://www.linkedin.com/in/per-harald-borgen/" }];

const render = (leads) => {
  let listItems = "";

  myLeads.forEach(function (leads) {
    listItems += `<a href="${leads}" target ="_blank">
        <li>${leads}</li>
                  </a>`;
  });

  ulEl.innerHTML = listItems;
};

// checks if we have saved data to the local storage before
if (leadFromLocalstorage != null) {
  myLeads = leadFromLocalstorage;
  // if you want it to show, call the function that shows the leads
  render(myLeads);
}

// 2. Listen for clicks on tabBtn.
tabBtn.addEventListener("click", function () {
  // to save the current http website you are on

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  // clear out input field evrytime we hit enter or save btn
  inputEl.value = "";

  // save myleads array to loacl stotage so we can sve all the links we put in the input field
  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  // 2. Call the renderLeads() function
  render(myLeads);

  // To verify that it works:
  // console.log(localStorage.getItem("myLeads"));
});

inputEl.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    inputBtn.click();
  }
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

// function generateSentence(desc, arr) {
//   let baseString = `The ${arr.length} ${desc} are `;
//   arr.forEach(function (arrz) {
//     return (baseString += arrz + "");
//   });
//   return baseString;
// }
// console.log(generateSentence("Largest countries", ["China", "India", "USA"]));
