export default function pincodeVerification(pincode, setResult) {
    var location = fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    .then(res => res.json())
    .then(
        (result) => {
            if(result[0].Status == "404" || result[0].Status == "Error") {
                var result = {"Error": "Invalid Pincode"}
            } else {
                var result = {
                    "District": result[0].PostOffice[0].District,
                    "State": result[0].PostOffice[0].State
                }
                // console.log(result[0].Status)
            }
            setResult(result)
        },
        (error) => {
            var result = {"Error": "Invalid Pincode"}
            setResult(result)
        }
    )
}