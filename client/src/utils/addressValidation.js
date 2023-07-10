export function addressValidation(args) {
  fetch("https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyDSUiY4jXZTrr3I1lYuikW54okCCCgcXyY", {
    method: "POST",
    body: JSON.stringify({
      address: {
        regionCode: "US",
        addressLines: [],
        locality: "",
        administrativeArea: "",
        postalCode: ""
      },
      enableUspsCass: true
    })
  });
};